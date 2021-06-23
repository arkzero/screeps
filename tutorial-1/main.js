var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}