// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { nextAuthOptions } from "./auth/[...nextauth]";

const restricted =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };

export default restricted;
