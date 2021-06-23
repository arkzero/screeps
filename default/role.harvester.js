const helpers = require('helpers');

const roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function (creep) {
        // Harvest when creep has carrying capacity 
        if (creep.store.getFreeCapacity() > 0) {
            this.harvest(creep);
        } else { // Transfer to stuctures when capacity full
            this.transfer(creep);
        }
    },
    
    /** @param {Creep} creep **/
    harvest: function (creep) {
        const sources = creep.room.find(FIND_SOURCES);
        const harvestResult = creep.harvest(sources[0]);
        
        switch (harvestResult) {
            case OK:
                // TODO: Add Harvesting Tooltip
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(sources[0], helpers.getMovementOptions('#ffaa00'));
                break;
        }
    },
    
    /** @param {Creep} creep **/
    transfer: function (creep) {
        const targetTypes = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER];
        const targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) =>  targetTypes.some(targetType => 
                targetType == structure.structureType)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        console.log('Targets', targets);
        if (targets.length > 0) {
            const transferResult = creep.transfer(targets[0], RESOURCE_ENERGY);
            console.log('Transfer REsult', transferResult);
            switch (transferResult) {
                case OK:
                    // TODO: Add Transfer Tooltip
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(targets[0], helpers.getMovementOptions());
                    break;
            }
        }
    }
};

module.exports = roleHarvester;