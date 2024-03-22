async function getDivisionMatches(id) {
    const query = await fetch(`http://localhost:8000/api/toornament/sp3/s2/matches?stage_ids=${id}`, {
        method: "GET",
    });

    return query;
}

async function getVodMatch(match_ids) {
    const query = await fetch(`http://localhost:8000/api/toornament/getVod?match_ids=${match_ids}`, {
        method: "GET",
    });

    return query;
}

async function fetchComingMatch() {
    const query = await fetch(`http://localhost:8000/api/toornament/comingMatches`, {
        method: "GET",
    });

    const response = await query.json()
    return response;
}

async function fetchStreamMatch(data) {
    const query = await fetch(`http://localhost:8000/api/toornament/streamMatches`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const response = await query.json()
    return response;
}

async function groupMatchByDate(comingMatch){
    const dateModule = await import('@/utils/date/date');
    const formatDate = dateModule.formatLongFrenchDate;
    const matchesByDate = {};
    comingMatch.forEach(match => {
        const date = formatDate(match.scheduled_datetime);
        if (!matchesByDate[date]) {
            matchesByDate[date] = [];
        }
        matchesByDate[date].push(match);
    });

    return matchesByDate;
}

module.exports = {
    getDivisionMatches,
    getVodMatch,
    fetchComingMatch,
    fetchStreamMatch,
    groupMatchByDate
}