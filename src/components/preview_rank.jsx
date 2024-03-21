"use client"

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from 'react';
import { getRank } from '@/utils/toornamentUtils'
import { groupObjectsById, reverseObject } from '@/utils/objectUtils'

async function rankSeason2() {
  const div1To6 = await getRank('7345134892812820480', '7536642295841865728,7536640081084391424,7536596345101762560,7536593471567388672,7536584899792535552,7536577779904667648');
  const d7To11 = await getRank('7345134892812820480', '7536551181308936192,7536546455548297216,7536542055986692096,7536536195342868480,7536519095150829568');

  const combinedAnswer = div1To6.concat(d7To11);

  const division = groupObjectsById(combinedAnswer);

  const divisionOrdered = reverseObject(division);

  return divisionOrdered;
}

const PreviewRank = () => {
  const [previewRanking, setPreviewRanking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setIsLoading(true);
        const getPreviewDataSessionStorage = sessionStorage.getItem("previewRanking");

        if (!getPreviewDataSessionStorage) {
          const response = await rankSeason2();
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
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4">

      {isLoading &&
        <>
          {[...Array(11)].map((_, index) => (
            <div key={index} className="flex flex-col items-baseline border hover:border-blue-400 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 w-64 h-[390px] px-4 rounded gap-4 py-4 relative">
              
            </div>
          ))}
        </>
      }

      {!isLoading && Object.entries(previewRanking).map(([stageId, innerArray], index) =>
        <Link href={`/sp3/s2/${stageId} `} prefetch={false} key={index}>

          <div key={index} className="flex flex-col items-baseline border hover:border-blue-400 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 w-64 px-4 rounded gap-4 py-4 relative">
            {<h2 className="text-xl font-semibold"> Division {index + 1}</h2>}
            {innerArray.map((data, innerIndex) => (
              <div key={data.id}>
                <div className="w-56 flex items-center justify-between h-auto">
                  <span className="w-2 text-center">{data.position}</span>
                  <div className="ml-2">
                    <Image src={data.participant ? data.participant?.custom_fields?.logo?.logo_small : "/ebtv_logo.png"} alt="Logo de l'équipe" width={25} height={25} />
                  </div>
                  <p className="flex-grow ml-2 text-sm font-medium">
                    {data.participant?.name}
                  </p>
                  <span className="flex justify-center items-center font-medium">{data.points ? data.points : 0}</span>
                </div>
                {/* Conditionally render the line delimiter */}
                {innerIndex !== innerArray.length - 1 && <hr className="absolute left-1/2 transform -translate-x-1/2 my-2 border-gray-300 w-11/12" />}
              </div>
            ))}
          </div>
        </Link>
      )}
    </div>
  )
}

export default PreviewRank;