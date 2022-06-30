import * as React from "react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { IoClose } from "react-icons/io5";
import { Block } from "baseui/block";
import { useRouter } from "next/router";

interface ActiveLinkProps {
  link: string;
  icon: React.ReactNode;
  title: string;
}

export function ActiveLink({ link, icon, title }: ActiveLinkProps) {
  const router = useRouter();
  return (
    <Block width={"100%"}>
      <Button
        onClick={() => router.push(link)}
        startEnhancer={icon}
        kind={KIND.tertiary}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              width: "100%",
              display: "flex",
              justifyContent: "start",
              color: $theme.colors.accent,
            }),
          },
        }}
      >
        {title}
      </Button>
    </Block>
  );
}

export function PassiveLink({ link, icon, title }: ActiveLinkProps) {
  const router = useRouter();
  return (
    <Block width={"100%"}>
      <Button
        onClick={() => router.push(link)}
        startEnhancer={icon}
        kind={KIND.tertiary}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              width: "100%",
              display: "flex",
              justifyContent: "start",
            }),
          },
        }}
        //   colors={"black"}
      >
        {title}
      </Button>
    </Block>
  );
}
