import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import * as React from "react";
import { Block } from "baseui/block";
import Browse from "./browse/Browse";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  return (
    <Block padding={0} margin={0}>
      <Browse />
    </Block>
  );
};

export default Home;
