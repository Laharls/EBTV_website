import { Fragment } from 'react';
import { formatFrenchDateTime } from '@/utils/date/date';
import Image from "next/image";

const SeasonMatchPlanning = ({divisionRound, hasVod}) => {
    return (
        <div>
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
                                                        <Image src={match.opponents ? match.opponents[0]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 1" width={23} height={20} />
                                                        <p className="text-sm font-medium">  {match.opponents[0].participant.name}</p>
                                                    </div>

                                                    <div className="flex gap-2 items-center">
                                                        <Image src={match.opponents ? match.opponents[1]?.participant.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe 2" width={23} height={20} />
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
    )
}

export default SeasonMatchPlanning;