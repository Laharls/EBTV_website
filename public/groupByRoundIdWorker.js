self.onmessage = function(event) {
    const data = event.data;
  
    // Group the objects by round_id
    const groupedData = data.reduce((acc, obj) => {
      const roundId = obj.round_id;
      if (!acc[roundId]) {
        acc[roundId] = [];
      }
      acc[roundId].push(obj);
      return acc;
    }, {});
  
    const dataArray = Object.values(groupedData);
  
    // Create an object with numeric indices for each array
    const indexedData = {};
    dataArray.forEach((array, index) => {
      indexedData[index + 1] = array;
    });
  
    // Send the result back to the main thread
    self.postMessage(indexedData);
  };