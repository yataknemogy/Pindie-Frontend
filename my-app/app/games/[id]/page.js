'use client'
import { getNormalizedGameDataById } from "@/app/api/api-utils";
import Styles from "./game.module.css";
import { getGamesById } from "@/app/data/data-itils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Prealoder";
import {isResponseOk, checkIfUserVoted, vote} from "@/app/api/api-utils";
import { useContext } from "react";
import { AuthContext } from "@/app/context/app-context";
import { useStore } from "@/app/store/app-store";
export default function GamePage(props) {
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  const authContext = useStore();

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const game = await getNormalizedGameDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, game]); 

  const handleVote = async () => {
    const JWT = authContext.token;

    let usersIdArray = game.users.length
      ? game.users.map((user) => user.id)
    : [];
    usersIdArray.push(authContext.user.id);

    const response = await vote(
      `${endpoints.games}/${game.id}`,
      authContext.token,
      usersIdArray
    );

    if (isResponseOk(response)) {
    setGame(() => {
        return {
          ...game,
        users: [...game.users, authContext.user],
      };
    });
    setIsVoted(true);
  }
  };

  return (
    <main className="main">
      {game ? (
        <>
          <section className={Styles["game"]}>
            <iframe className={Styles["game__iframe"]} src={game.link}></iframe>
          </section>
          <section className={Styles["about"]}>
            <h2 className={Styles["about__title"]}>{game.title}</h2>
            <div className={Styles["about__content"]}>
              <p className={Styles["about__description"]}>{game.description}</p>
              <div className={Styles["about__author"]}>
                <p>
                  Автор:{" "}
                  <span className={Styles["about__accent"]}>
                    {game.developer}
                  </span>
                </p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>
                За игру уже проголосовали:{" "}
                <span className={Styles["about__accent"]}>
                  {game.users.length}
                </span>
              </p>
              <button
                onClick={handleVote}
                disabled={!authContext.isAuth || isVoted}
                className={`button ${Styles["about__vote-button"]}`}
              >
                {isVoted ? "Голос учтён" : "Голосовать"}
              </button>
            </div>
          </section>
        </>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (
        <section className={Styles["game"]}>
          <div className={Styles["error"]}>
            <h2>Ой-ой-ой</h2>
            <p>К сожалению, такой игры не существует 😢</p>
            <img src="https://media.tenor.com/UNaQFutfOF0AAAAi/banana-crying-cat.gif"></img>
            <Link className={Styles["error_link"]} href="/">
              На главную
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
