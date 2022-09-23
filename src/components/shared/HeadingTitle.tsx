import { HeadingMedium, HeadingSmall } from "baseui/typography";
import * as React from "react";

export function HeadingTitle({ title }: { title: string }) {
  return <HeadingMedium margin="0 0 20px 0">{title}</HeadingMedium>;
}

export function HeadingModalTitle({ title }: { title: string }) {
  return <HeadingSmall margin={0}>{title}</HeadingSmall>;
}
