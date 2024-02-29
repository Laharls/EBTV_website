'use client'

// const { useState } = require("react")

// import { useState } from 'react'

// const Foo = ({ slug }) => {
//   const [value, setValue] = useState(slug)

//   return (
//     <div>
//       <p>foo is { value }</p>
//     </div>
//   )
// }
// export default Foo

import Image from "next/image";
import { useEffect, useState } from 'react';

async function fetchingData(id) {
    const query = await fetch(`https://anthonyurbanski.fr/api/toornament/sp3/s2/division?stage_ids=${id}`, {
        method: "GET",
    });
    return query; // Return the response directly
}

const Ranking = ({ slug }) => {

    const [divisionId, setDivisionId] = useState(slug);
    const [divisionData, setDivisionData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the fetchingData function to get the data from the API route
                const response = await fetchingData(divisionId);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from API' + response);
                }

                const responseData = await response.json();

                // const responseData = await response.json();
                setDivisionData(responseData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [slug, divisionId]);

    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col justify-center items-center gap-4 overflow-x-scroll sm:overflow-x-auto"> */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center">#</th>
                            <th className="px-4 py-2 text-center">Nom</th>
                            <th className="px-4 py-2 text-center">J</th>
                            <th className="px-4 py-2 text-center">V</th>
                            <th className="px-4 py-2 text-center">D</th>
                            <th className="px-4 py-2 text-center">M+</th>
                            <th className="px-4 py-2 text-center">M-</th>
                            <th className="px-4 py-2 text-center">+/-</th>
                            <th className="px-4 py-2 text-center">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisionData?.map((team) => (
                            <tr key={team.id}>
                                <td className="border px-4 py-2 text-center">{team.position}</td>
                                <td className="border py-2 flex gap-4 justify-center items-center"> <div className="mr-2"> <Image src={team.participant ? team.participant?.custom_fields.logo?.icon_small : ""} alt="" width={25} height={25} /> </div> <div className="w-40">{team.participant?.name}</div> </td>
                                <td className="border px-4 py-2 text-center">{team.properties.played}</td>
                                <td className="border px-4 py-2 text-center">{team.properties.wins}</td>
                                <td className="border px-4 py-2 text-center">{team.properties.losses}</td>
                                <td className="border px-4 py-2 text-center">{team.properties.score_for}</td>
                                <td className="border px-4 py-2 text-center">{team.properties.score_against}</td>
                                <td className="border px-4 py-2 text-center">{team.properties.score_difference}</td>
                                <td className="border px-4 py-2 text-center">{team.points === null ? "0" : team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


             <div className="flex flex-col">
                <h1>Semaine 1</h1>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="border md:w-40">
                        <p>X-One</p>
                        <p>Whirpool</p>
                    </div>
                    <div className="border md:w-40">
                        <p>X-One</p>
                        <p>Whirpool</p>
                    </div>

                    <div className="border md:w-40">
                        <p>X-One</p>
                        <p>Whirpool</p>
                    </div>

                    <div className="border md:w-40">
                        <p>X-One</p>
                        <p>Whirpool</p>
                    </div>
                </div>
            </div> 

        </div>
    )
}

export default Ranking;
