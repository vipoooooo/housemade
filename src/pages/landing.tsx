import { Button, KIND } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Landing: NextPage = () => {
  const route = useRouter();
  const { status } = useSession();
  return (
    // <main className="flex items-center justify-center h-screen w-full">
    //   {status === "authenticated" ? (
    //     <button
    //       className="btn btn-secondary"
    //       type="submit"
    //       onClick={() => route.push("/browse/Browse")}
    //     >
    //       Open App
    //     </button>
    //   ) : (
    //     <button
    //       className="btn btn-secondary"
    //       type="submit"
    //       onClick={() => route.push("/authentication/Login")}
    //     >
    //       Login
    //     </button>
    //   )}
    // </main>
    <main>
      {status === "authenticated" ? (
        <Button type="submit" onClick={() => route.push("/browse/Browse")}>
          Open App
        </Button>
      ) : (
        <>
          <Button
            type="submit"
            kind={KIND.tertiary}
            onClick={() => route.push("/authentication/Login")}
          >
            Log in
          </Button>
          <Button
            type="submit"
            onClick={() => route.push("/authentication/Signup")}
          >
            Sign up
          </Button>
        </>
      )}
    </main>
  );
};

export default Landing;
