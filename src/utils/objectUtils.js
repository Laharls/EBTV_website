function groupObjectsById(array) {
    return array.reduce((grouped, obj) => {
      const { stage_id, ...rest } = obj; 
  
      if (!grouped[stage_id]) {
        grouped[stage_id] = []; 
      }
  
      grouped[stage_id].push(rest); 
      return grouped;
    }, {});
    
  }
  
  function reverseObject(object){
    const sortedKeys = Object.keys(object).sort((a, b) => parseInt(b) - parseInt(a));
    const sortedGrouped = {};
    sortedKeys.forEach(key => {
      sortedGrouped[key] = object[key];
    });
  
    return sortedGrouped;
  }

  module.exports = {
    groupObjectsById,
    reverseObject
  }