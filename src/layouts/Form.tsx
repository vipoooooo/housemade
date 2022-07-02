import React, { useState } from "react";

import { HeadingLevel } from "baseui/heading";
import { Block } from "baseui/block";
import FormHeader from "../components/shared/FormHeader";
import { useStyletron } from "styletron-react";

const Home: React.FC<{
  children: React.ReactNode;
  hasHeader: boolean;
  title: string;
}> = ({ children, hasHeader, title }) => {
  const [css] = useStyletron();
  return (
    <HeadingLevel>
      <div
        className={css({
          maxWidth: "414px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "40px 20px",
        })}
      >
        <FormHeader title={title} />
        {hasHeader && <main>{children}</main>}
      </div>
    </HeadingLevel>
  );
};

export default Home;
