import Image from "next/image";

const ParticipantRank = ({index, divisionRank}) => {
    return (
        <div key={index} className="flex flex-col items-baseline border hover:border-blue-400 bg-white dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-900 dark:text-white bg-opacity-80 hover:bg-gray-100 ease-in-out duration-200 w-64 px-4 rounded gap-4 py-4 relative">
            {<h2 className="text-xl font-semibold"> Division {index + 1}</h2>}
            {divisionRank.map((data, divisionIndex) => (
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
                    {divisionIndex !== divisionRank.length - 1 && <hr className="absolute left-1/2 transform -translate-x-1/2 my-2 border-gray-300 w-11/12" />}
                </div>
            ))}
        </div>
    )
}

export default ParticipantRank;