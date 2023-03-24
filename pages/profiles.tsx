import Head from "next/head";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Profiles() {
  const router = useRouter();
  const { data: user } = useUser();
  return (
    <>
      <Head>
        <title>Netflix</title>
      </Head>

      <main className="flex h-full items-center justify-center">
        <section className="flex flex-col animate-intro">
          <p className="text-center text-3xl text-white md:text-6xl">
            Who is watching?
          </p>

          <div className="mt-10 flex items-center justify-center gap-8">
            <button onClick={() => router.push("/")}>
              <div className="group mx-auto w-44 flex-row">
                <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
                  <img src="/images/default-blue.png" alt="Profile" />
                </div>

                <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
                  {user?.name}
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
