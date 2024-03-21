import Image from "next/image";

import PreviewRank from "@/components/preview_rank";

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
            <p className="font-bold text-xl dark:text-white">Saison 2</p>
            <p className="font-bold text-xl text-center dark:text-white">11 divisions, 88 équipes, 520 joueurs !</p>

          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">

        </div>

        <PreviewRank></PreviewRank>

        <div className="flex flex-col justify-center items-center gap-4">

        </div>
      </div>
    </div>
  )
};

export default Homepage;
