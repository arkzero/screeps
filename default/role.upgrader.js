const helpers = require('helpers');

const roleUpgrader = {
  
    /** @param {Creep} creep **/
    run: function (creep) {
        // Set upgrading status and brodcast it
        this.setStatus(creep);
        
        if (creep.memory.upgrading) { // Upgrade controller 
            this.upgrade(creep);
        } else { // Harvest more resources
            this.harvest(creep);
        }
    },
    
    /** @param {Creep} creep **/
    setStatus: function (creep) {
        if (creep.memory.upgrading 
            && creep.store[RESOURCE_ENERGY] == 0) { // Ran out of energy while upgrading
            creep.memory.building = false;
            creep.say('🔄 harvest');    
        } else if (!creep.memory.upgrading
            && creep.store.getFreeCapacity() == 0) { // Storage capacity full, return to upgrading
            creep.memory.building = true;
	        creep.say('🚧 build');
        }
    },
    
    /** @param {Creep} creep **/
    upgrade: function (creep) {
        const upgradeResult = creep.upgradeController(creep.room.controller);
        
        switch (upgradeResult) {
            case OK: 
                // TODO: Set Status
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(creep.room.controller, helpers.getMovementOptions());
                break;
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

module.exports = roleUpgrader;