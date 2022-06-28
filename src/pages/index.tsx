import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import * as React from 'react';
import { Block } from 'baseui/block';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  return (
    <Block padding={0} margin={0}>
      Hello World
    </Block>
  );
};

export default Home;
