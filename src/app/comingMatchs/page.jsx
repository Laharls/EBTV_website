"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';
import { formatFrenchDateTime } from "@/utils/date/date";
import { fetchComingMatch, fetchStreamMatch, groupMatchByDate } from "@/utils/toornament/match";

const ComingMatchs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isTest, setIsTest] = useState(null);
    const [streamMatches, setStreamMatches] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const comingMatch = await fetchComingMatch();

                const matchIds = comingMatch.map((obj, index) => {
                    return {
                        match_id: obj.id,
                        index: index
                    };
                });

                const matchesByDate = await groupMatchByDate(comingMatch);

                setIsTest(matchesByDate);

                const streamMatch = await fetchStreamMatch(matchIds);

                setStreamMatches(streamMatch);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-full flex flex-col px-4 mb-8 sm:px-8 md:px-12 lg:px-20">

            {isLoading &&
                <div className="flex items-center justify-center h-full">
                    <div role="status">
                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }

            {isTest &&
                <div>
                    {Object.entries(isTest).map(([date, matches]) => (
                        <div key={date}>
                            <h2 className="text-lg font-semibold mt-4 mb-2 dark:text-white">{date}</h2>
                            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
                                {matches.map((match, matchIndex) => (
                                    <div key={matchIndex} className="md:w-5/12 xl:w-96">
                                        {streamMatches?.map((stream) => {
                                            // Find the match corresponding to the stream
                                            const correspondingMatch = matches.find(match => match.id === stream.match.match_id);

                                            // Check if a corresponding match is found and its id matches the stream's match_id
                                            if (correspondingMatch && correspondingMatch?.id === stream.match.match_id) {
                                                correspondingMatch.url = stream.result.url;
                                            }
                                        })}

                                        {match?.url &&
                                            <a href={match?.url ? match.url : ''} target="_blank" rel="noopener noreferrer" className="border flex justify-between p-2 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 rounded hover:border-blue-400">
                                                {/* Render match details */}
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <Image src={match.opponents ? match.opponents[0]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 1" width={23} height={20} />
                                                        <p className="text-sm font-medium">  {match.opponents[0].participant.name}</p>
                                                    </div>

                                                    <div className="flex gap-2 items-center">
                                                        <Image src={match.opponents ? match.opponents[1]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 2" width={23} height={20} />
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
                                                                <p className="text-sm text-center text-gray-600 dark:text-white">{formatFrenchDateTime(`${match.scheduled_datetime}`)}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                                <div className="flex justify-center items-center">
                                                    <Image src="/live.png" alt="Live Icon" width={50} height={50}></Image>
                                                </div>
                                            </a>
                                        }

                                        {!match.url &&
                                            <div key={matchIndex} href={match?.url ? match.url : ''} className="border flex justify-between p-2 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 rounded hover:border-blue-400">
                                                {/* Render match details */}
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <Image src={match.opponents ? match.opponents[0]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 1" width={23} height={20} />
                                                        <p className="text-sm font-medium">  {match.opponents[0].participant.name}</p>
                                                    </div>

                                                    <div className="flex gap-2 items-center">
                                                        <Image src={match.opponents ? match.opponents[1]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 2" width={23} height={20} />
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
                                                                <p className="text-sm text-center text-gray-600 dark:text-white">{formatFrenchDateTime(`${match.scheduled_datetime}`)}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ComingMatchs;