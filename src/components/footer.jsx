import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="h-full bg-black text-white flex flex-col gap-2 items-center md:flex-row md:justify-evenly sm:px-8 md:px-12 lg:px-20">
            <div className="mt-2 sm:mt-0">
                <Link href="https://esportbros.tv/">
                    <Image src="/ebtv.png" alt="" width={100} height={100} className="" />
                </Link>
            </div>

            <div className="w-4/5 md:mt-2">
                <p className="text-center">
                    CC BY-NC eSportBrosTV - 2024 (La licence Splatoon appartient à Nintendo) | <Link href="https://esportbros.tv/mentions-legales/" rel="noopener noreferrer" target="_blank" className="hover:text-blue-400 ease-in-out duration-200">Mentions légales</Link>
                </p>
                <br />
                <p className="text-center">
                    Licence Nintendo <span className="font-bold">NE24-AV5JA-N00047</span> | Nintendo ne sponsorise pas ce tournoi et n’y est pas affilié <br /> <Link href="https://www.nintendo.fr/Mentions-legales/Conditions-pour-participer-et-assister-a-des-tournois-communautaires-utilisant-des-jeux-Nintendo-pour-tous-les-participants-et-spectateurs--2468907.html" rel="noopener noreferrer" target="_blank" className="hover:text-blue-400 ease-in-out duration-200"> Conditions pour participer et assister à des tournois utilisant des jeux Nintendo</Link>
                </p>
            </div>

            <div>
                <Link href="https://www.toornament.com/">
                    <Image src="/toornament.png" alt="" width={200} height={200} className="" />
                </Link>
            </div>


        </div>

        // <footer className="h-full flex justify-center bg-black px-4 sm:px-8 md:px-12 lg:px-20">
        //     <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:justify-between md:w-full">
        //         <Link href="https://esportbros.tv/">
        //             <Image src="/ebtv.png" alt="" width={100} height={100} className="" />
        //         </Link>

        //         <p className="text-white text-sm">CC BY-NC eSportBrosTV - 2024 (La licence Splatoon appartient à Nintendo) | <Link href="https://esportbros.tv/mentions-legales/" className="hover:text-blue-400 ease-in-out duration-200">Mentions légales</Link> </p>

        //         <Link href="https://www.toornament.com/">
        //             <Image src="/toornament.png" alt="" width={200} height={200} className="" />
        //         </Link>
        //     </div>
        // </footer>
    )
}

export default Footer