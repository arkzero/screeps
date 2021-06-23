const helpers = require('helpers');

const roleBuilder = {
    
    /** @param {Creep} creep **/
    run: (creep) => {
        
        // Set status
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        } else if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        
        // Take Actions
        if (creep.memory.building) { // Build
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], helpers.getMovementOptions());
                }
            }
        } else { // Harvest
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], helpers.getMovementOptions('#ffaa00'));
            }
        }
    }
};

module.exports = roleBuilder;