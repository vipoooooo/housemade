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
      <Block maxWidth={"1200px"} margin={"0 auto"}>
        <Navigationbar />
        {hasHeader && <main>{children}</main>}
      </Block>
    </HeadingLevel>
  );
};

export default Home;
