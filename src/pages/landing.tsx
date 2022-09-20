import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Filter } from "baseui/icon";
import {
  HeadingLarge,
  HeadingMedium,
  Paragraph4,
  ParagraphLarge,
  ParagraphSmall,
} from "baseui/typography";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { CoverLanding, Logo } from "../constants/icon.const";
import { image } from "./browse/components/profile/PortfolioCont";

const Landing: NextPage = () => {
  const route = useRouter();
  const { status } = useSession();
  const [css, theme] = useStyletron();
  return (
    <main>
      <Head>
        <title>Housemade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        alt={"Landing Image"}
        src={
          "https://images.unsplash.com/photo-1509837295151-b8189b63bdba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80"
        }
        objectFit={"cover"}
        priority
        layout="fill"
        className={css(image)}
      />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          width: "100vw",
          margin: "100px auto 0 auto",
          position: "absolute",
        })}
      >
        <Image src={Logo} height={45} width={45} objectFit={"contain"} />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <HeadingLarge
            margin={0}
            className={css({
              textAlign: "center",
            })}
          >
            Find a house repairman with ease
          </HeadingLarge>
          <ParagraphLarge
            margin={0}
            className={css({
              textAlign: "center",
            })}
          >
            We help you connect with all type of repairman ever exists
          </ParagraphLarge>
        </div>
        {status === "authenticated" ? (
          <Button type="submit" onClick={() => route.push("/browse/Browse")}>
            Open App
          </Button>
        ) : (
          <div
            className={css({
              display: "flex",
            })}
          >
            <Button
              type="submit"
              kind={KIND.tertiary}
              size={SIZE.large}
              onClick={() => route.push("/authentication/Login")}
            >
              Log in
            </Button>
            <Button
              type="submit"
              size={SIZE.large}
              onClick={() => route.push("/authentication/Signup")}
            >
              Get Stated
            </Button>
          </div>
        )}
      </div>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          width: "100vw",
          margin: "100px auto 0 auto",
          bottom: 0,
          position: "absolute",
        })}
      >
        <Paragraph4>Developed by po | suor | leng</Paragraph4>
        <Paragraph4>&bull;</Paragraph4>
        <Paragraph4>beta version | v1.0.0</Paragraph4>
      </div>
      {/* </div> */}
      {/* <Block
        position={"absolute"}
        bottom={"0"}
        left={"46%"}
        className={css({
          transform: "translate(0%, -46%)",
        })}
      >
        <ParagraphSmall>Made by noname</ParagraphSmall>
      </Block> */}
    </main>
  );
};

export default Landing;
