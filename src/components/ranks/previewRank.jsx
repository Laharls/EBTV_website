"use client"

import Link from "next/link";

import { useEffect, useState } from 'react';
import { rankSeason } from '@/utils/toornament/rank';
import  ParticipantRank  from '@/components/ranks/participantRank';

const PreviewRank = ({ tournamentId, divisionIds }) => {
  const [previewRanking, setPreviewRanking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const getPreviewDataSessionStorage = sessionStorage.getItem("previewRanking");

        if (!getPreviewDataSessionStorage) {
          const response = await rankSeason(tournamentId, divisionIds);
          sessionStorage.setItem("previewRanking", JSON.stringify(response));
          setPreviewRanking(response);
          setIsLoading(false);
        }
        else {
          const responseSession = sessionStorage.getItem("previewRanking");
          setPreviewRanking(JSON.parse(responseSession));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tournamentId, divisionIds]);

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 mb-12">

      {isLoading &&
        <>
          {[...Array(Object.keys(divisionIds).length)].map((_, index) => (
            <div key={index} className="flex flex-col items-baseline border hover:border-blue-400 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 w-64 h-[390px] px-4 rounded gap-4 py-4 relative"></div>
          ))}
        </>
      }

      {!isLoading && Object.entries(previewRanking).map(([_, divisionRank], index) =>
        <Link href={`/sp3/s3/division${index + 1} `} prefetch={false} key={index}>
          <ParticipantRank index={index} divisionRank={divisionRank}/>
        </Link>
      )}
    </div>
  )
}

export default PreviewRank;