import type { NextPage } from "next";
import * as React from "react";
import { Block } from "baseui/block";
import Landing from "./landing";

const Home: NextPage = () => {
  return (
    <Block padding={0} margin={0}>
      <Landing />
    </Block>
  );
};

export default Home;
