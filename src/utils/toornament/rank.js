import { groupObjectsById, splitObjectIntoChunks } from '@/utils/objectUtils'

async function getDivision(id) {
  const query = await fetch(`http://localhost:8000/api/toornament/sp3/s2/division?stage_ids=${id}`, {
      method: "GET",
  });
  return query;
}

async function getRank(tournamentId, stageIds) {
  const rank = await fetch(`http://localhost:8000/api/toornament/v2/rank?tournament_ids=${tournamentId}&groups_ids=${stageIds}`, {cache: 'reload'});
  return await rank.json();
}

async function rankSeason(toornamentId, divisionIds) {
  const chunkDivisionIds = splitObjectIntoChunks(divisionIds, 6);
  const responseRank = [];

  for (const listDivisionId of chunkDivisionIds) {
    responseRank.push(await getRank(toornamentId, listDivisionId));
  }

  const mergedResponse = responseRank.reduce((acc, curr) => acc.concat(curr), []);
  const division = groupObjectsById(mergedResponse);
  return division;
}

module.exports = {
  getDivision,
  getRank,
  rankSeason,
}