import Image from "next/image";

const TableRank = ({divisionData}) => {
    return (
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
                                    <Image src={team.participant ? team.participant?.custom_fields.logo?.logo_small : ""} alt="Logo de l'équipe" width={25} height={25} /> </div> <div className="font-semibold text-xl">{team.participant?.name}</div>
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
    )
}

export default TableRank;