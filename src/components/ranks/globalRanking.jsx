'use client'

import Link from "next/link";
import { useEffect, useState } from 'react';
import { getDivision } from '@/utils/toornament/rank';
import { getDivisionMatches, getVodMatch } from '@/utils/toornament/match';
import { groupByRoundId } from "@/utils/objectUtils";

import RankingDropdown from "@/components/dropdown/rankingDropdown";
import SeasonMatchPlanning from "@/components/seasonMatchPlanning";
import TableRank from "@/components/ranks/tableRank";

const stageIdMap = {
    "7536642295841865728": "1",
    "7536640081084391424": "2",
    "7536596345101762560": "3",
    "7536593471567388672": "4",
    "7536584899792535552": "5",
    "7536577779904667648": "6",
    "7536551181308936192": "7",
    "7536546455548297216": "8",
    "7536542055986692096": "9",
    "7536536195342868480": "10",
    "7536519095150829568": "11",
};

const Ranking = ({ slug }) => {

    const [divisionId] = useState(slug);
    const [divisionData, setDivisionData] = useState(null);
    const [divisionRound, setDivisionRound] = useState(null);
    const [hasVod, setHasVod] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDivision(divisionId);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from API' + response);
                }

                const responseData = await response.json();
                const divisionRound = await getDivisionMatches(divisionId);


                if (!divisionRound.ok) {
                    throw new Error("Failed to fetch match data from API", response);
                }

                const responseDivisionRound = await divisionRound.json();
                const matchPotentielVod = responseDivisionRound.filter(obj => obj.status === 'completed');

                const array_match_id = matchPotentielVod.map(match => match.id).join(',');

                const vodMatch = await getVodMatch(array_match_id);
                const responseVodMatch = await vodMatch.json();

                setHasVod(responseVodMatch);

                const groupedbyRounds = await groupByRoundId(responseDivisionRound)

                await setDivisionData(responseData);

                await setDivisionRound(groupedbyRounds);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug, divisionId]);

    return (
        <div className="h-full flex flex-col px-4">
            <div className="mt-4">
                <div className="sm:hidden mt-8 mb-8 relative flex justify-center">
                    <RankingDropdown />
                </div>

                <div className="hidden sm:flex justify-center mt-8 mb-8">
                    {stageIdMap &&
                        <div className="flex items-center space-x-4">
                            {[...Array(11)].map((_, index) => (
                                <Link key={index} href={`/sp3/s2/division${index + 1}`} className="font-bold text-2xl hover:text-blue-600 ease-in-out duration-200 dark:text-white">D{index + 1}</Link>
                            ))}
                        </div>
                    }
                </div>
                <h1 className="text-5xl font-bold mb-4 dark:text-white">Division {stageIdMap[divisionId]}</h1>
                <TableRank divisionData={divisionData} hasVod={hasVod}/>
            </div>

            <div className="mb-4 mt-4">
                <SeasonMatchPlanning divisionRound={divisionRound} hasVod={hasVod}/>
            </div>
        </div>
    )
}

export default Ranking;