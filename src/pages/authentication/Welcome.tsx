import * as React from "react";
import {
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import Form from "../../layouts/Form";
import { useStyletron } from "baseui";
import { InputOTP } from "../../components/common/Input";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Welcome() {
  const [css, theme] = useStyletron();
  const router = useRouter();
  module.exports = {
    images: {
      domains: ["assets.example.com"],
    },
  };
  return (
    <Form title="Welcome, <Username>" hasForm={true}>
      <div
        className={css({
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        })}
      >
        <div
          className={css({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
            border: "2px solid #EEEEEE",
          })}
        >
          <Image
            src="https://images.unsplash.com/photo-1580191947416-62d35a55e71d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2VsY29tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            objectFit="cover"
            height={"200px"}
            width={"100%"}
            // height={"350px"}
          />
          <Button
            onClick={() => router.push("/authentication/VerificationCode")}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "100%",
                }),
              },
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Form>
  );
}
