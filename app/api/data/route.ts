import ArtObject from "@/public/assets/ArtObject";
import { ArtmovementsEnum } from "@/model/enums/ArtmovementsEnum";
import { NextResponse } from "next/server";

type ArtPeriodsType = {
  medieval_and_gothic: ArtmovementsEnum[];
  renaissance: ArtmovementsEnum[];
  mannerism_and_baroque: ArtmovementsEnum[];
  rococo: ArtmovementsEnum[];
  neoclassicism: ArtmovementsEnum[];
  nineteenth_century: ArtmovementsEnum[];
  modern: ArtmovementsEnum[];
  all_periods: ArtmovementsEnum[];
};

export async function GET(request: Request) {
  const ArtPeriods: ArtPeriodsType = {
    medieval_and_gothic: [ArtmovementsEnum.MEDIEVAL, ArtmovementsEnum.GOTHIC],
    renaissance: [
      ArtmovementsEnum.RENNAISSANCE,
      ArtmovementsEnum.NORTHERN_RENAISSANCE,
    ],
    mannerism_and_baroque: [
      ArtmovementsEnum.BAROQUE,
      ArtmovementsEnum.MANNERISM,
    ],
    rococo: [ArtmovementsEnum.ROCOCO],
    neoclassicism: [ArtmovementsEnum.NEOCLASSICISM],
    nineteenth_century: [
      ArtmovementsEnum.ROMANTICISM,
      ArtmovementsEnum.REALISM,
      ArtmovementsEnum.PRE_RAPHAELITE,
      ArtmovementsEnum.ACADEMICISM,
      ArtmovementsEnum.MACCHIAIOLI,
      ArtmovementsEnum.UKIYO_E,
      ArtmovementsEnum.TONALISM,
    ],
    modern: [
      ArtmovementsEnum.MODERN,
      ArtmovementsEnum.IMPRESSIONISM,
      ArtmovementsEnum.POINTILLISM,
      ArtmovementsEnum.POST_IMPRESSIONISM,
      ArtmovementsEnum.ART_NOUVEAU,
      ArtmovementsEnum.FAUVISM,
      ArtmovementsEnum.EXPRESSIONISM,
      ArtmovementsEnum.CUBISM,
      ArtmovementsEnum.SURREALISM,
      ArtmovementsEnum.ABSTRACT_ART,
      ArtmovementsEnum.SOCIAL_REALISM,
      ArtmovementsEnum.KITSCH,
    ],
    all_periods: [],
  };

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");

  if (period && period in ArtPeriods) {
    const result = ArtObject.filter((item) => {
      return ArtPeriods[period as keyof typeof ArtPeriods].includes(
        item.artmovement
      );
    });

    return NextResponse.json({
      result: result.sort(() => Math.random() - 0.5),
    });
  } else {
    return NextResponse.json(
      {
        error: "Invalid period or period not provided",
      },
      { status: 400 }
    );
  }
}
