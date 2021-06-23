const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    for (const name in Game.rooms) {
        console.log(`Room ${name} has ${Game.rooms[name].energyAvailable} energy`);
    }

    for(var name in Game.creeps) {
        const creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
        }
    }
}