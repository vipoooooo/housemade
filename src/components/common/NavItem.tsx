import { StyledNavigationItem } from "baseui/header-navigation";
import { ParagraphMedium } from "baseui/typography";
import Link from "next/link";
import * as React from "react";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useRouter } from "next/router";
import { useStyletron } from "baseui";

// NAVLINK__________
export function Navlink({
  herf,
  title,
  active,
}: {
  herf: string;
  title: string;
  active?: boolean;
}) {
  const [css, theme] = useStyletron();
  return (
    <StyledNavigationItem>
      <ParagraphMedium
        margin={0}
        color={active ? theme.colors.accent : theme.colors.primary}
      >
        <Link href={herf} prefetch={true}>
          {title}
        </Link>
      </ParagraphMedium>
    </StyledNavigationItem>
  );
}

// NAVBTN__________
interface ActiveLinkProps {
  link: string;
  icon: React.ReactNode;
  title: string;
  active: boolean;
}

export function NavBtn({ link, icon, title, active }: ActiveLinkProps) {
  const router = useRouter();
  const [css, theme] = useStyletron();
  return (
    <Block width="100%">
      <Button
        onClick={() => router.push(link)}
        startEnhancer={icon}
        kind={KIND.tertiary}
        overrides={{
          BaseButton: {
            style: () => ({
              width: "100%",
              display: "flex",
              justifyContent: "start",
              color: active ? theme.colors.accent : theme.colors.primary,
            }),
          },
        }}
      >
        {title}
      </Button>
    </Block>
  );
}
