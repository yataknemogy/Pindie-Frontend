'use client'
import { getGamesByCategory } from "../data/data-itils";
import { CardsListSection } from "../components/CardListSection/CardsListSection";
import { getNormalizedGameDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Prealoder";

export default  function Pixel() {
  const pixelGames = useGetDataByCategory(
    endpoints.games,
    "pixel"
  );
  return (
    <main className="main">
    {pixelGames ? <CardsListSection id="pixel" title="Пиксельные" data={pixelGames} /> : <Preloader/>}
    </main>
  );
}
