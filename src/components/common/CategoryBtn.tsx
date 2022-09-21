import * as React from "react";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import Image from "next/image";
import { Button, KIND } from "baseui/button";
import { useRouter } from "next/router";
import { Block } from "baseui/block";

interface ActiveLinkProps {
  id: string;
  title: string;
  icon: string;
}
export default function CategoryBtn({ id, title, icon }: ActiveLinkProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/browse/Worker?id=${id}`);
      }}
      kind={KIND.tertiary}
      overrides={{
        BaseButton: {
          style: () => ({
            width: "100%",
            aspectRatio: "1 / 1",
            display: "flex",
            flexDirection: "column",
            gap: "10%",
          }),
        },
      }}
    >
      <Block
        height={["45px", "45px", "60px", "60px"]}
        width={["45px", "45px", "60px", "60px"]}
      >
        <Image
          src={icon}
          height={"100%"}
          width={"100%"}
          objectFit={"contain"}
        />
      </Block>
      <ParagraphMedium margin={0} display={["none", "none", "block", "block"]}>
        {title}
      </ParagraphMedium>
      <ParagraphSmall margin={0} display={["block", "block", "none", "none"]}>
        {title}
      </ParagraphSmall>
    </Button>
  );
}
