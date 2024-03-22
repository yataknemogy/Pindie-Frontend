'use client'
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import{ Preloader } from "../components/Preloader/Prealoder";
export default function Shooter() {
  const shooters = useGetDataByCategory(
    endpoints.games,
    "shooter"
  );
  return (
    <main className="main">
      {shooters ? <CardsListSection id="shooter" title="Шутеры" data={shooters} /> : <Preloader />}
    </main>
  );
}
