"use client";
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Prealoder";
export default function New() {
  const newGames = useGetDataByCategory(endpoints.games, "new");
  return (
    <main className={"main"}>
      {newGames ? (
        <CardsListSection  id="new" title="Новинки" data={newGames} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}
