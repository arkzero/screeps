const helpers = require('helpers');

const roleBuilder = {
    
    /** @param {Creep} creep **/
    run: function (creep) {
        // Set building status and broadcast it 
        this.setStatus(creep);
        
        if (creep.memory.building) { // Build Structures
            this.build(creep);
        } else { // Harvest more Energy
            this.harvest(creep);
        }
    },
    
    /** @param {Creep} creep **/
    setStatus: function (creep) {
        if (creep.memory.building 
            && creep.store[RESOURCE_ENERGY] == 0) { // Ran out of energy while build
            creep.memory.building = false;
            creep.say('🔄 harvest');
        } else if (!creep.memory.building
            && creep.store.getFreeCapacity() == 0) { // Storage capacity full, return to building
	        creep.memory.building = true;
	        creep.say('🚧 build');
        }
    },
    
    /** @param {Creep} creep **/
    build: function (creep) {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            const buildResult = creep.build(targets[0]);
            
            switch (buildResult) {
                case OK: 
                    // TODO: Set Status
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(targets[0], helpers.getMovementOptions());
                    break;
            }
        }
    },
    
    /** @param {Creep} creep **/
    harvest: function (creep) {
        const sources = creep.room.find(FIND_SOURCES);
        const harvestResult = creep.harvest(sources[0]);
        switch (harvestResult) {
            case OK:
                // TODO: Set Status
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(sources[0], helpers.getMovementOptions('#ffaa00'));
                break;
        }
    },
};

module.exports = roleBuilder;