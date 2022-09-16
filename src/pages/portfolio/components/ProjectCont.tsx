import { Block } from "baseui/block";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { ParagraphSmall } from "baseui/typography";
import Image from "next/image";
import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/router";
import { AspectRatioBox, AspectRatioBoxBody } from "baseui/aspect-ratio-box";
import { StyleObject } from "styletron-standard";
import { HeadingTitle } from "../../../components/shared/HeadingTitle";
import { Button, KIND, SIZE } from "baseui/button";
import AddProjectModal from "./AddProjectModal";
import { useSession } from "next-auth/react";
import { trpc } from "../../../utils/trpc";
import { ProjectSkeleton } from "../../../components/common/Skeleton";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { IdeleteProject } from "../../../server/router/project/project.type";
import { toaster } from "baseui/toast";
import { Toaster } from "../../../components/common/Toaster";

export default function ProjectCont() {
  const [css] = useStyletron();
  const router = useRouter();
  const utils = trpc.useContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [projectId, setProjectId] = React.useState("");
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(
    ["project.projects", { id: session?.id as string }],
    {
      retry: false,
    }
  );
  const {
    mutateAsync,
    error,
    isLoading: deleteLoading,
  } = trpc.useMutation(["project.deleteProject"]);

  const onDelete = async (data: IdeleteProject) => {
    try {
      const result = await mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["project.projects"]);
        },
      });
    } catch (err) {
      toaster.warning("Unable to delete your project", {});
      console.log(err);
    }
  };

  return (
    <>
      <Block>
        {isLoading ? (
          <Block>
            <Block
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
              width={"100%"}
            >
              <HeadingTitle title="Project" />
              <Button
                onClick={() => setIsOpen(true)}
                kind={KIND.primary}
                size={SIZE.compact}
              >
                Add project
              </Button>
            </Block>
            {/* Spacer */}
            <Block />
            <FlexGrid
              flexGridColumnCount={[1, 2, 3, 2]}
              flexGridColumnGap={["0px", "10px", "10px", "20px"]}
              flexGridRowGap={["30px"]}
            >
              <FlexGridItem>
                <ProjectSkeleton />
              </FlexGridItem>
              <FlexGridItem>
                <ProjectSkeleton />
              </FlexGridItem>
            </FlexGrid>
          </Block>
        ) : (
          <Block>
            <Toaster />
            <Block
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"start"}
              width={"100%"}
            >
              <HeadingTitle title="Project" />
              <Button
                onClick={() => setIsOpen(true)}
                kind={KIND.primary}
                size={SIZE.compact}
              >
                Add project
              </Button>
            </Block>
            {/* Spacer */}
            <Block />
            <FlexGrid
              flexGridColumnCount={[1, 2, 3, 2]}
              flexGridColumnGap={["0px", "10px", "10px", "20px"]}
              flexGridRowGap={["30px"]}
            >
              {data?.projects.map((project) => (
                <FlexGridItem key={project.id.toString()}>
                  <AspectRatioBox aspectRatio={16 / 9}>
                    <AspectRatioBoxBody
                      onClick={() => {
                        router.push(`/browse/Project?id=${project.id}`);
                      }}
                      display={"flex"}
                      flexDirection={"column"}
                      width={"100%"}
                      className={css(imageContainer)}
                      overrides={{
                        Block: {
                          style: {
                            cursor: "pointer",
                          },
                        },
                      }}
                    >
                      <Image
                        alt={project?.title}
                        src={
                          project.imageURL || "https://via.placeholder.com/150"
                        }
                        objectFit={"cover"}
                        priority
                        layout="fill"
                        className={css(image)}
                      />
                    </AspectRatioBoxBody>
                  </AspectRatioBox>
                  <Block
                    display={"flex"}
                    justifyContent={"space-between"}
                    // alignItems={"center"}
                    margin={"10px 0 0 0"}
                  >
                    <ParagraphSmall margin={"0"}>
                      {project?.title}
                    </ParagraphSmall>
                    <Block display={"flex"} alignItems={"center"}>
                      <Button
                        onClick={() => {
                          setIsOpen(true);
                          setProjectId(project.id);
                        }}
                        size={SIZE.mini}
                        kind={KIND.tertiary}
                      >
                        <IoPencilOutline size={20} cursor={"pointer"} />
                      </Button>
                      <Button
                        onClick={() => onDelete({ id: project.id })}
                        disabled={deleteLoading}
                        size={SIZE.mini}
                        kind={KIND.tertiary}
                      >
                        <IoTrashOutline size={20} cursor={"pointer"} />
                      </Button>
                    </Block>
                  </Block>
                </FlexGridItem>
              ))}
            </FlexGrid>
          </Block>
        )}
      </Block>
      <AddProjectModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        projectId={projectId}
      />
    </>
  );
}

const imageContainer: StyleObject = {
  width: "100%",
  ">div": {
    position: "unset",
  },
};

const image: StyleObject = {
  objectFit: "contain",
  width: "100% !important",
  position: "relative",
  height: "unset !important",
};
