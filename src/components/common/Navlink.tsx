import { StyledNavigationItem } from "baseui/header-navigation";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import Link from "next/link";
import * as React from "react";

export default function Navlink({
  herf,
  title,
}: {
  herf: string;
  title: string;
}) {
  return (
    <StyledNavigationItem>
      <ParagraphMedium margin={0}>
        <Link href={herf}>{title}</Link>
      </ParagraphMedium>
    </StyledNavigationItem>
  );
}
