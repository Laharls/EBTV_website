'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Fragment } from 'react';

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

async function fetchingData(id) {
    const query = await fetch(`http://localhost:8000/api/toornament/sp3/s2/division?stage_ids=${id}`, {
        method: "GET",
    });
    return query;
}

async function getAllMatchDivision(id) {
    const query = await fetch(`http://localhost:8000/api/toornament/sp3/s2/matches?stage_ids=${id}`, {
        method: "GET",
    });

    return query;
}

async function fetchVodMatch(match_ids) {
    const query = await fetch(`http://localhost:8000/api/toornament/getVod?match_ids=${match_ids}`, {
        method: "GET",
    });

    return query;
}

function dateFormatter(date) {
    const dateTime = new Date(date);

    const formatter = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
    });

    return formatter.format(dateTime);
}

// function groupByRoundId(data) {
//     const sortedData = data.sort((a, b) => a.round_id.localeCompare(b.round_id));

//     // Group the objects by round_id
//     const groupedData = sortedData.reduce((acc, obj) => {
//         const roundId = obj.round_id;
//         if (!acc[roundId]) {
//             acc[roundId] = [];
//         }
//         acc[roundId].push(obj);
//         return acc;
//     }, {});

//     const dataArray = Object.values(groupedData);

//     // Create an object with numeric indices for each array
//     const indexedData = {};
//     dataArray.forEach((array, index) => {
//         indexedData[index + 1] = array;
//     });

//     return indexedData;
// }

const Ranking = ({ slug }) => {

    const [divisionId] = useState(slug);
    const [divisionData, setDivisionData] = useState(null);
    const [divisionRound, setDivisionRound] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hasVod, setHasVod] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchingData(divisionId);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from API' + response);
                }

                const responseData = await response.json();
                const divisionRound = await getAllMatchDivision(divisionId);


                if (!divisionRound.ok) {
                    throw new Error("Failed to fetch match data from API", response);
                }

                const responseDivisionRound = await divisionRound.json();
                const matchPotentielVod = responseDivisionRound.filter(obj => obj.status === 'completed');

                const array_match_id = matchPotentielVod.map(match => match.id).join(',');

                const vodMatch = await fetchVodMatch(array_match_id);
                const responseVodMatch = await vodMatch.json();

                setHasVod(responseVodMatch);

                // Use Web Worker for groupByRoundId function
                const worker = new Worker('/groupByRoundIdWorker.js');
                worker.postMessage(responseDivisionRound);

                worker.onmessage = function (event) {
                    setDivisionRound(event.data);
                };

                // const groupedbyRounds = await groupByRoundId(responseDivisionRound)

                await setDivisionData(responseData);

                // await setDivisionRound(groupedbyRounds);

                return () => {
                    worker.terminate();
                };

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug, divisionId]);

    function handleClickOutside(event) {
        if (event.target.closest(".dropdown") === null) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="h-full flex flex-col px-4">
            <div className="mt-4">
                <div className="sm:hidden mt-8 mb-8 relative flex justify-center">
                    <div className="dropdown relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 relative z-10"
                        >
                            Division
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute right-1/2 transform translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                                <div className="py-1">
                                    {Object.entries(stageIdMap).map(([key, divNum]) => (
                                        <Link key={key} href={`/sp3/s2/${key}`} className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600">{`D${divNum}`}</Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className="hidden sm:flex justify-center mt-8 mb-8">
                    {stageIdMap &&
                        <div className="flex items-center space-x-4">
                            {Object.entries(stageIdMap).map(([key, divNum]) => (
                                <Link key={key} href={`/sp3/s2/${key}`} className="font-bold text-2xl hover:text-blue-600 ease-in-out duration-200 dark:text-white">D{divNum}</Link>
                            ))}
                        </div>
                    }
                </div>
                <h1 className="text-5xl font-bold mb-4 dark:text-white">Division {stageIdMap[divisionId]}</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Rang
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Equipe
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    J
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    V
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    D
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    M+
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    M-
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    +/-
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Pts
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {divisionData?.map((team) => (
                                <tr key={team.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-semibold text-xl text-center text-gray-900 whitespace-nowrap dark:text-white">
                                        {team.position}
                                    </th>
                                    <td className="px-6 py-4 flex">
                                        <div className="mr-2">
                                            <Image src={team.participant ? team.participant?.custom_fields.logo?.logo_small : ""} alt="" width={25} height={25} /> </div> <div className="font-semibold text-xl">{team.participant?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.played}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.wins}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.losses}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.score_for}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.score_against}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.properties.score_difference}
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-xl">
                                        {team.points === null ? "0" : team.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-4 mt-4">
                {divisionRound &&
                    Object.values(divisionRound).map((weekData, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col mt-2 mb-2">
                            <h2 className="text-xl font-semibold mb-2 dark:text-white">Semaine {weekIndex + 1}</h2>
                            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
                                {weekData.map((match, matchIndex) => {
                                    const matchingObject = hasVod.find(item => item.match_id === match.id);

                                    const linkHref = matchingObject ? matchingObject.url : null;
                                    return (
                                        <Fragment key={matchIndex}>
                                            {linkHref !== null ? (
                                                <a href={linkHref} target="_blank" rel="noopener noreferrer" className="border flex justify-between p-2 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 rounded md:w-5/12  xl:w-96 hover:border-blue-400">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            <Image src={match.opponents ? match.opponents[0]?.participant.custom_fields.logo?.logo_small : ""} alt="" width={23} height={20} />
                                                            <p className="text-sm font-medium">  {match.opponents[0].participant.name}</p>
                                                        </div>

                                                        <div className="flex gap-2 items-center">
                                                            <Image src={match.opponents ? match.opponents[1]?.participant.custom_fields.logo?.logo_small : ""} alt="" width={23} height={20} />
                                                            <p className="text-sm font-medium">{match.opponents[1].participant.name}</p>

                                                        </div>

                                                    </div>
                                                    <div className="flex h-fit">
                                                        {match.status === "completed" &&
                                                            <div className="mr-6 flex flex-col justify-center items-center gap-2">
                                                                <p className={`${match.opponents[0].result === 'win' ? 'text-green-600' : 'text-red-600'}`}>{match.opponents[0].score}</p>
                                                                <p className={`${match.opponents[1].result === 'win' ? 'text-green-600' : 'text-red-600'}`}>{match.opponents[1].score}</p>
                                                            </div>
                                                        }

                                                        <div className="flex justify-center items-center">
                                                            <Image src="/vod.png" alt="Vod Icon" width={50} height={50}></Image>
                                                        </div>
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="border flex justify-between p-2 bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:border-gray-700 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 rounded md:w-5/12  xl:w-96 hover:border-blue-400">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex gap-2 items-center">
                                                            <Image src={match.opponents ? match.opponents[0]?.participant.custom_fields.logo?.logo_small : ""} alt="" width={23} height={20} />
                                                            <p className="text-sm font-medium">  {match.opponents[0].participant.name}</p>
                                                        </div>

                                                        <div className="flex gap-2 items-center">
                                                            <Image src={match.opponents ? match.opponents[1]?.participant.custom_fields.logo?.logo_small : ""} alt="" width={23} height={20} />
                                                            <p className="text-sm font-medium">{match.opponents[1].participant.name}</p>

                                                        </div>

                                                    </div>
                                                    <div>
                                                        {match.status === "completed" &&
                                                            <div className="mr-6 flex flex-col justify-center items-center gap-2">
                                                                <p className={`${match.opponents[0].result === 'win' ? 'text-green-600' : 'text-red-600'}`}>{match.opponents[0].score}</p>
                                                                <p className={`${match.opponents[1].result === 'win' ? 'text-green-600' : 'text-red-600'}`}>{match.opponents[1].score}</p>
                                                            </div>
                                                        }

                                                        {match.status === "pending" && match.scheduled_datetime !== null &&
                                                            <div className="h-full flex flex-col justify-center items-center mr-6">
                                                                <div className="flex flex-col justify-center items-center">
                                                                    <p className="text-sm text-center text-gray-600 dark:text-white">{dateFormatter(`${match.scheduled_datetime}`)}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Ranking;