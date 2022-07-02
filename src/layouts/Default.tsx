import React, { useState } from "react";

import { HeadingLevel } from "baseui/heading";
import { Block } from "baseui/block";
import Navigationbar from "../components/shared/NavigationBar";

const Home: React.FC<{
  children: React.ReactNode;
  hasHeader: boolean;
}> = ({ children, hasHeader }) => {
  return (
    <HeadingLevel>
      <Block>
        <Navigationbar />
        <Block maxWidth={"1200px"} margin={"0 auto"}>
          {hasHeader && (
            <main>
              <Block padding={"20px"}>{children}</Block>
            </main>
          )}
        </Block>
      </Block>
    </HeadingLevel>
  );
};

export default Home;
