'use client'
import { useGetDataByCategory } from "../api/api-hooks";
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Prealoder";
export default function Runner() {
  const runners =  useGetDataByCategory(
    endpoints.games,
    "runner"
  );
  return (
    <main className="main">
      {runners ? <CardsListSection id="runner" title="Ранеры" data={runners} /> : <Preloader />}
    </main>
  );
}
