import Image from "next/image";

import PreviewRank from "@/components/preview_rank";

const Homepage = async () => {
  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20">
      {/*INTRODUCTION CONTAINER */}
      <div className="flex flex-col justify-center gap-12">
        {/*INTRODUCTION TEXTE */}
        <div className="flex justify-center items-center gap-8 mt-4">
          {/*IMAGE TEXTE */}
          <Image
            src="/ebtv_logo.webp"
            alt=""
            width={75}
            height={75}
            className="sm:hidden"
            priority />

          <Image
            src="/ebtv_logo.webp"
            alt=""
            width={150}
            height={150}
            className="hidden sm:flex"
            priority />

          <div className="flex flex-col justify-center items-center gap-4">
            <p className="font-bold text-xl">Saison 2</p>
            <p className="font-bold text-xl text-center">11 divisions, 88 équipes, 520 joueurs !</p>

          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">

        </div>

        {/*SECTION PROCHAINS MATCHS A VENIR */}
        <PreviewRank></PreviewRank>

        {/*ARTICLE */}
        <div className="flex flex-col justify-center items-center gap-4">

        </div>
      </div>
    </div>
  )
};

export default Homepage;
