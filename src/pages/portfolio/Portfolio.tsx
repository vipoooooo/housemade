import * as React from "react";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import ProfileSide from "./components/ProfileSide";
import ContentSide from "./components/ContentSide";
import restricted from "../api/restricted";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

// FOR RESTRICTED AUTH PURPOSE
export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

export default function Profile() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, isLoading } = trpc.useQuery(
    ["worker.profile", { id: session?.id as string }],
    {
      retry: false,
    }
  );
  return (
    <Layout hasHeader={true}>
      <Head>
        <title>{data?.profile.user?.username} | Housemade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Block
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
        className={css({ gap: "20px", flexWrap: "wrap" })}
      >
        {/* Profile */}
        <ProfileSide />

        {/* Content */}
        <ContentSide />
      </Block>
    </Layout>
  );
}
