'use client'
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Prealoder";
import { useGetDataByCategory } from "../api/api-hooks";


export default function Popular() {
  const popularGame = useGetDataByCategory(
    endpoints.games,
    "popular"
  );
  return (
    <main className="main">
      { popularGame ? <CardsListSection id="popular" title="Популярные" data={popularGame} /> : <Preloader />}
    </main>
  );
}
