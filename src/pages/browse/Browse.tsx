import * as React from "react";
import Layout from "../../layouts/Default";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import CategoryBtn from "../../components/common/CategoryBtn";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import restricted from "../api/restricted";
import { trpc } from "../../utils/trpc";
import { KIND, Notification } from "baseui/notification";
import Head from "next/head";

// FOR RESTRICTED AUTH PURPOSE
export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

export default function Browse() {
  const { data, error, isLoading } = trpc.useQuery(["category.categories"], {
    retry: false,
  });
  return (
    <Layout hasHeader={true}>
      <Head>
        <title>Browse | Housemade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingTitle title="Browse" />
      <FlexGrid
        flexGridColumnCount={[2, 3, 4, 6]}
        flexGridColumnGap="scale200"
        flexGridRowGap="scale200"
      >
        {error && (
          <Notification kind={KIND.negative}>
            {() => "404 not found"}
          </Notification>
        )}
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          data?.categories.map((category) => {
            return (
              <FlexGridItem key={category.id}>
                <CategoryBtn
                  id={category.id}
                  icon={category.coverImg}
                  title={category.title}
                />
              </FlexGridItem>
            );
          })
        )}
      </FlexGrid>
    </Layout>
  );
}
