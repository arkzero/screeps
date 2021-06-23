const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');

const CREEP_COUNTS = {
    harvesters: 2,
    builders: 2,
    upgraders: 1,
};

function debugReport(creeps) {
    console.log('==== Report ====');
    
    console.log('___Energy___');
    for (const name in Game.rooms) {
        console.log(`Room ${name} has ${Game.rooms[name].energyAvailable} energy`);
    }
    
    console.log('___Creeps___');
    for (const type in creeps) {
        console.log(`${type}: ${creeps[type].length || 0}`);
    }
    console.log('==== END Report ====');
}

function garbageCollection () {
    // Delete Creeps from memory if they were destroyed
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function findCreepsByRole (role) {
    return _.filter(Game.creeps, (creep) => creep.memory.role == role);
}

function spawnHarvesters (harvesters) {
    if (harvesters.length < CREEP_COUNTS.harvesters 
        && !Game.spawns['Spawn1'].spawning) {
        const newName = `Harvester${Game.time}`;
        console.log(`Spawning new harvester: ${newName}`);
        Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE ], newName, {
            memory: { role: 'harvester' }
        });
    }
}

function spawnUpgraders (upgraders) {
    if (upgraders.length < CREEP_COUNTS.upgraders
        && !Game.spawns['Spawn1'].spawning) {
        const newName = `Upgrader${Game.time}`;
        console.log(`Spawning new upgrader: ${newName}`);
        Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE ], newName, {
            memory: { role: 'upgrader' }
        });
    }
}

function spawnBuilders (builders) {
    if (builders.length < CREEP_COUNTS.builders
        && !Game.spawns['Spawn1'].spawning) {
        const newName = `Builder${Game.time}`;
        console.log(`Spawning new builder: ${newName}`);
        const result = Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, MOVE ], newName, {
            memory: { role: 'builder' }
        });
    }
}

function spawnCreeps (creeps) {
    spawnHarvesters(creeps.harvesters);
    if (creeps.harvesters.length == CREEP_COUNTS.harvesters) {
        spawnUpgraders(creeps.upgraders);
        if (creeps.upgraders.length == CREEP_COUNTS.upgraders) {
            spawnBuilders(creeps.builders);
        }
    }
}

function spawningMessage() {
    if (Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}

module.exports.loop = function () {
    // Get array of Creeps based on role
    const harvesters = findCreepsByRole('harvester');
    const builders = findCreepsByRole('builder');
    const upgraders = findCreepsByRole('upgrader');
    
    // Report to console 
    if (Game.time % 10 == 0) {
        debugReport({ harvesters, builders, upgraders });
    }
    
    // Check if more creeps should be spawned
    spawnCreeps({ harvesters, builders, upgraders });
    
    // Add Message to spawn when spawning creep
    spawningMessage();
     
    // Run Creeps based on Role
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
        }
    }
};