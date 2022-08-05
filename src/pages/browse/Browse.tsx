import * as React from "react";
import Layout from "../../layouts/Default";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import CategoryBtn from "../../components/common/CategoryBtn";
import { HeadingMedium } from "baseui/typography";
import Category from "../../mocks/category.const";
import { Block } from "baseui/block";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import restricted from "../api/restricted";

export const getServerSideProps = restricted(async ctx => {
  return { props: {} };
});

export default function Browse() {
  return (
    <Layout hasHeader={true}>
      <HeadingTitle title="Browse" />
      <FlexGrid
        flexGridColumnCount={[2, 3, 4, 6]}
        flexGridColumnGap="scale200"
        flexGridRowGap="scale200"
      >
        {Category.map((category) => {
          return (
            <FlexGridItem key={category.id.toString()}>
              <CategoryBtn
                id={category.id}
                icon={category.coverImg}
                title={category.title}
              />
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </Layout>
  );
}
