function groupObjectsById(array) {
  return array.reduce((grouped, obj) => {
    const { stage_id, ...rest } = obj;
    grouped[stage_id] = grouped[stage_id] || [];
    grouped[stage_id].push(rest);
    return grouped;
  }, {});
}

function groupByRoundId(data) {
  const sortedData = data.sort((a, b) => a.round_id.localeCompare(b.round_id));

  // Group the objects by round_id
  const groupedData = sortedData.reduce((acc, obj) => {
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

  return indexedData;
}

function reverseObject(object) {
  const sortedKeys = Object.keys(object).sort((a, b) => parseInt(a) - parseInt(b));
  const sortedGrouped = {};
  for (const key of sortedKeys) {
    sortedGrouped[key] = object[key];
  }
  return sortedGrouped;
}

function splitObjectIntoChunks(object, chunkSize) {
  const keys = Object.keys(object);
  const chunks = [];

  for (let i = 0; i < keys.length; i += chunkSize) {
      const chunkKeys = keys.slice(i, i + chunkSize);
      const chunkValues = chunkKeys.map(key => object[key]);
      const formattedChunk = chunkValues.join(',');
      chunks.push(formattedChunk);
  }

  return chunks;
}

module.exports = {
  groupObjectsById,
  groupByRoundId,
  reverseObject,
  splitObjectIntoChunks
}