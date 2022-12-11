import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: notesData, isLoading } = trpc.useQuery(["notes.allNote"], {
    onSuccess(notes) {
      console.log(notes, 'NOTES');
    },
  });

  if (!notesData || isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>List of all notes</div>
        <Link href="/newnote">Add a note</Link>
      </main>
    </>
  );
};

export default Home;
