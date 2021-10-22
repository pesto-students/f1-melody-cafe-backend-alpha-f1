const _ = require('lodash');

module.exports = {
    checkMadatoryKeys: function(keys,object){
        let notFoundKeys = [];
        for(let key of keys){
            if(!_.has(object,key)){
                notFoundKeys.push(key);
            }
        }
        if(notFoundKeys.length ===0){
            return {
                valid:true,
                notFoundKeys: notFoundKeys
            }
        }
        return {
            valid:false,
            notFoundKeys: notFoundKeys
        }
    }
}