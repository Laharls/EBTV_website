"use client"

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from 'react';

const stageId = [
  "7536642295841865728",
  "7536640081084391424",
  "7536596345101762560",
  "7536593471567388672",
  "7536584899792535552",
  "7536577779904667648",
  "7536551181308936192",
  "7536546455548297216",
  "7536542055986692096",
  "7536536195342868480",
  "7536519095150829568",
  "7536501886969577472",
]

async function previewRankingData() {

  const toornamentData = await fetch("https://anthonyurbanski.fr/api/toornament/groups", {
    method: "GET",
  });

  const dataJson = await toornamentData.json();

  const reverseToornamentData = await dataJson.reverse()

  const dataArray = [];

  for (const data of reverseToornamentData) {
    const { id, stage_id, tournament_id } = data;

    const dataRank = await fetch(`https://anthonyurbanski.fr/api/toornament/rank?tournament_ids=${tournament_id}&stage_ids=${stage_id}&group_ids=${id}`, {
      method: "GET",
    });

    const jsonData = await dataRank.json();

    dataArray.push(jsonData);
  }

  return dataArray;
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
          const response = await previewRankingData();
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
      {/* <Link href="/">Saison 2 de la Ligue EBTV Sp3</Link> */}

      {isLoading &&
        <div role="status">
          <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      }

      {!isLoading && previewRanking?.map((innerArray, index) => (
        <Link href={`/sp3/s2/${stageId[index]} `} prefetch={false} key={index}>

          <div key={index} className="flex flex-col  items-baseline border hover:border-blue-400 bg-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 w-64 px-4 rounded gap-4 py-4 relative">
            {<h2 className="text-xl font-semibold"> Division {index + 1}</h2>}
            {innerArray.map((data, innerIndex) => (
              <div key={data.id}>
                {/* Render content from each data object in the inner array */}
                <div className="w-56 flex items-center justify-between h-auto">
                  <span className="w-2 text-center">{data.position}</span>
                  <div className="ml-2">
                    <Image src={data.participant ? data.participant?.custom_fields?.logo?.icon_small : "/ebtv_logo.png"} alt="" width={25} height={25} unoptimized />
                  </div>
                  <p className="flex-grow ml-2 text-sm"> {/* Use flex-grow to expand */}
                    {data.participant?.name}
                  </p>
                  <span className="flex justify-center items-center">{data.points ? data.points : 0}</span>
                </div>
                {/* Conditionally render the line delimiter */}
                {innerIndex !== innerArray.length - 1 && <hr className="absolute left-1/2 transform -translate-x-1/2 my-2 border-gray-300 w-11/12" />}
              </div>
            ))}
          </div>
        </Link>

      ))}
    </div>
  )
}

export default PreviewRank;