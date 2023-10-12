import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from './styles.module.css'
import Link from "next/link";

type ConnectionStatus = {
  isConnected: boolean;
  movies: any[];
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    const res = await fetch(`${process.env.BASE_URI}/api/movies`);
    const data = await res.json();
    return {
      props: { isConnected: true, movies: data },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, movies: [] },
    };
  }
};

export default function Home({
  isConnected,
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>MFlix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isConnected && <p>connection to DB failed </p>}
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie._id} className={styles.movieCard}>
             <img className="w-20" src={movie.poster} alt={movie.title}/>
            <h2 className="text-3xl font-bold underline"><Link href={`/movie/${movie._id}`}>{movie.title}</Link></h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
