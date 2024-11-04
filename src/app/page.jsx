import Image from "next/image";

import PreviewRank from "@/components/ranks/previewRank";
import { toornamentIdLeagueS3, divisionIdLeagueS3 } from '@/data/toornamentId';

const Homepage = async () => {
  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="flex flex-col justify-center gap-12">
        <div className="flex justify-center items-center gap-8 mt-4">
          <Image
            src="/ebtv_logo.png"
            alt="Logo ebtv Splatoon 3"
            width={120}
            height={120}
            priority
            unoptimized />

          <div className="flex flex-col justify-center items-center gap-4">
            <p className="font-bold text-xl dark:text-white">Saison 3</p>
            <p className="font-bold text-xl text-center dark:text-white">12 divisions, 75 équipes, 440 joueurs !</p>

          </div>
        </div>

        <PreviewRank tournamentId={toornamentIdLeagueS3} divisionIds={divisionIdLeagueS3}></PreviewRank>
      </div>
    </div>
  )
};

export default Homepage;
