import { HeadingXSmall } from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "styletron-react";
import { Logo } from "../../constants/icon.const";

export default function FormHeader({ title }: { title: string }) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      })}
    >
      <Image src={Logo} height={30} width={30} objectFit="contain" />
      <HeadingXSmall margin={0}>{title}</HeadingXSmall>
    </div>
  );
}
