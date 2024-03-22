'use client';
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Prealoder";

export default function Tds() {
  const tds = useGetDataByCategory(
    endpoints.games, 
    "TDS"
    );
  return (
    <main className="main">
      {tds ? <CardsListSection id="TDS" title="TDS" data={tds} /> : <Preloader />}
    </main>
  );
}
