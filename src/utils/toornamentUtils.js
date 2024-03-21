async function getRank(tournamentId, stageIds) {
    const rank = await fetch(`http://localhost:8000/api/toornament/v2/rank?tournament_ids=${tournamentId}&stage_ids=${stageIds}`);
    return rank.json();
  }

  module.exports = {
    getRank,
  }