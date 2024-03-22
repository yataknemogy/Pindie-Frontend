'use client';
import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { endpoints } from "./api/config";
import { useGetDataByCategory } from "./api/api-hooks";
import { CardsListSection } from "./components/CardListSection/CardsListSection";
import { Preloader } from "@/app/components/Preloader/Prealoder";

export default function Home() {
  const popularGame = useGetDataByCategory(
    endpoints.games,
    "popular"
  );
  const newGame = useGetDataByCategory(
    endpoints.games,
    "new"
  );
  return (
      <main className="main">
          <Banner/>
          {popularGame ? (
              <CardsListSection id="popular" type="slider" title="Популярные" data={popularGame}></CardsListSection>
          ) : (
              <Preloader/>
          )}
          {newGame ? (
              <CardsListSection id="new" type="slider" title="Новинки" data={newGame}></CardsListSection>
          ) : (
              <Preloader/>
          )}
          <Promo/>
      </main>
  );
}
