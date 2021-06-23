const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
        }
    }
}