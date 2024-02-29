import Image from "next/image";
import Link from "next/link";

import PreviewRank from "@/components/preview_rank";

const Homepage = async () => {
  return (
    <div className="h-full flex flex-col px-4 sm:px-8 md:px-12 lg:px-20">
      {/*INTRODUCTION CONTAINER */}
      <div className="flex flex-col justify-center gap-12">
        {/*INTRODUCTION TEXTE */}
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          {/*TITRE TEXTE */}
          {/* <h1 className="font-bold text-xl underline">La ligue EBTV</h1> */}
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
          {/*DESCRIPTION TEXTE */}
          {/* <p className="font-bold text-xl text-center">
            La Ligue EBTV est la plus grande compétition francophone sur la licence Splatoon.
            Créée en septembre 2017, elle compte 14 saisons et 428 équipes y ont participé !
          </p> */}
        </div>

        {/*REDIRECTION SAISON EN COURS */}
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-xl">Saison 2</p>
        </div>

        {/*SECTION PROCHAINS MATCHS A VENIR */}
        <PreviewRank></PreviewRank>

        {/*Seed division*/}
        {/* <div className="flex flex-col justify-center items-center gap-4">

        </div> */}

        {/*ARTICLE */}
        <div className="flex flex-col justify-center items-center gap-4">
          {/* <h2 className="font-bold underline text-xl">Articles</h2>

          <div className="flex justify-center gap-4 flex-wrap mb-4">
            <Article data={{ src: '/img_article1.jpg', title: "La Ligue EBTV est de retour", containBrTag: false, url: "https://esportbros.tv/2023/12/22/la-ligue-ebtv-est-de-retour/" }} />
            <Article data={{ src: '/ranking_div.png', title: <>Fin de saison 1 de <br /> la Ligue EBTV</>, containBrTag: true, url: "https://esportbros.tv/2023/05/23/fin-de-la-saison-01-de-la-ligue-ebtv-les-classements/" }} />
            <Article data={{ src: '/start_season1.jpg', title: <>C&apos;est parti pour la <br /> première saison</>, containBrTag: true, url: "https://esportbros.tv/2023/03/06/cest-parti-pour-la-premiere-saison-de-la-ligue-ebtv-sur-splatoon-3/" }} />
            <Article data={{ src: '/annonce_sp3.jpg', title: "La Ligue EBTV est de retour", containBrTag: false, url: "https://esportbros.tv/2023/02/06/votre-splatiquette-en-ligue-ebtv/" }} />
          </div> */}
        </div>
      </div>
    </div>
  )
};

export default Homepage;
