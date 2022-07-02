import * as React from "react";
import Layout from "../../layouts/Default";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import CategoryBtn from "../../components/common/CategoryBtn";
import { HeadingMedium } from "baseui/typography";
import Category from "../../constants/category.const";
import { Block } from "baseui/block";

export default function Browse() {
  return (
    <Layout hasHeader={true}>
      <HeadingMedium margin={0} marginBottom={"20px"}>
        Browse
      </HeadingMedium>
      <FlexGrid
        flexGridColumnCount={[2, 3, 4, 6]}
        flexGridColumnGap="scale200"
        flexGridRowGap="scale200"
      >
        {Category.map((category) => {
          return (
            <FlexGridItem>
              <CategoryBtn id={category.id} icon={category.coverImg} title={category.title} />
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </Layout>
  );
}
