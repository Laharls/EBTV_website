"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';

async function fetchingData(id) {
    const query = await fetch(`http://localhost:8000/api/toornament/sp3/s2/division?stage_ids=${id}`, {
        method: "GET",
    });
    return query; // Return the response directly
}

const stageIdMap = {
    1: "7536642295841865728",
    2: "7536640081084391424",
    3: "7536596345101762560",
    4: "7536593471567388672",
    5: "7536584899792535552",
    6: "7536577779904667648",
    7: "7536551181308936192",
    8: "7536546455548297216",
    9: "7536542055986692096",
    10: "7536536195342868480",
    11: "7536519095150829568",
};

const Cast = () => {
    const [divisionData, setDivisionData] = useState(null);
    const [divisionNumber, setDivisionNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {

                setIsLoading(true);

                const queryParams = new URLSearchParams(window.location.search);
                const divisionId = queryParams.get('division'); // value1
                setDivisionNumber(divisionId);

                // Call the fetchingData function to get the data from the API route
                const response = await fetchingData(stageIdMap[divisionId]);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from API' + response);
                }

                const responseData = await response.json();

                // const responseData = await response.json();
                setDivisionData(responseData);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen flex flex-col px-4 justify-center sm:px-8 md:px-12 lg:px-20">

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

            {!isLoading &&
                <div>
                    <h1 className="text-5xl font-semibold mb-4">Division {divisionNumber}</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:max-w-5xl">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        Rang
                                    </th>
                                    <th scope="col" className="px-6 py-7">
                                        Equipe
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        J
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        V
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        D
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        M+
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        M-
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        +/-
                                    </th>
                                    <th scope="col" className="px-6 py-7 text-center">
                                        Pts
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {divisionData?.map((team) => (
                                    <tr key={team.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 text-center font-semibold text-xl text-gray-900 whitespace-nowrap dark:text-white">
                                            {team.position}
                                        </th>
                                        <td className="px-6 py-8 flex">
                                            <div className="mr-2">
                                                <Image src={team.participant ? team.participant?.custom_fields.logo?.icon_small : ""} alt="" width={25} height={25} /> </div> <div className="w-40 lg:w-auto font-semibold text-xl">{team.participant?.name}</div>
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.played}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.wins}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.losses}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.score_for}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.score_against}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.properties.score_difference}
                                        </td>
                                        <td className="px-6 py-8 text-center font-semibold text-xl">
                                            {team.points === null ? "0" : team.points}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            }
        </div>
    );
}

export default Cast;




// {/* <div className="flex flex-col gap-4 items-center justify-center h-full">
//                     <div className="flex flex-col justify-center items-center h-full">
//                         <div className="bg-white bg-opacity-40">
//                             <table className="table-auto w-full overflow-x-auto">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-4 py-2 text-center">Rang</th>
//                                         <th className="px-4 py-2 text-center" colSpan={2}>Equipe</th>
//                                         <th className="px-4 py-2 text-center">J</th>
//                                         <th className="px-4 py-2 text-center">V</th>
//                                         <th className="px-4 py-2 text-center">D</th>
//                                         <th className="px-4 py-2 text-center">M+</th>
//                                         <th className="px-4 py-2 text-center">M-</th>
//                                         <th className="px-4 py-2 text-center">+/-</th>
//                                         <th className="px-4 py-2 text-center">Pts</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {divisionData?.map((team) => (
//                                         <tr key={team.id} className="border-b border-gray-300 border-opacity-70">
//                                             <td className="px-4 py-2 text-center">{team.position}</td>
//                                             <td className="py-2 flex gap-4 justify-center items-center"> <div> <Image src={team.participant ? team.participant?.custom_fields.logo?.icon_small : ""} alt="" width={25} height={25} /> </div> <div className="w-40 border-0 text-center">{team.participant?.name}</div> </td>
//                                             <td className="px-4 py-2 text-center">{/* Empty cell to align with the "Nom" header */}</td >
//                                             <td className="px-4 py-2 text-center">{team.properties.played}</td>
//                                             <td className="px-4 py-2 text-center">{team.properties.wins}</td>
//                                             <td className="px-4 py-2 text-center">{team.properties.losses}</td>
//                                             <td className="px-4 py-2 text-center">{team.properties.score_for}</td>
//                                             <td className="px-4 py-2 text-center">{team.properties.score_against}</td>
//                                             <td className="px-4 py-2 text-center">{team.properties.score_difference}</td>
//                                             <td className="px-4 py-2 text-center">{team.points === null ? "0" : team.points}</td>
//                                         </tr >
//                                     ))}
//                                 </tbody >
//                             </table >
//                         </div >
//                     </div >

//                 </div > * /}