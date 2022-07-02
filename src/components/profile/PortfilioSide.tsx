import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { HeadingMedium } from "baseui/typography";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import ProjectCard from "../common/ProjectCard";
import ProjectData from "../../constants/project.const";

export default function PortfilioSide() {
  const [css, $theme] = useStyletron();
  return (
    <Block
      width={"100%"}
      // className={css({ flex: 1, background: $theme.colors.warning })}
    >
      <HeadingMedium margin={0} marginBottom={"20px"}>
        Portfolio
      </HeadingMedium>
      {/* Spacer */}
      <Block />
      <FlexGrid
        flexGridColumnCount={[1, 1, 1, 2]}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        {ProjectData.map((proj) => {
          return (
            <FlexGridItem>
              <ProjectCard coverImg={proj.coverImg} />
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </Block>
  );
}
