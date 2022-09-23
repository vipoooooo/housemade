import * as React from "react";
import { useStyletron } from "baseui";
import ModalTemp from "../../layouts/ModalW";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import {
  IwriteProjectSchema,
  writeProjectSchema,
} from "../../server/router/project/project.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { hide } from "../browse/modals/ReportModal";
import { toBase64 } from "../../helpers/snipet";
import { Toaster } from "../common/Toaster";
import { toaster } from "baseui/toast";
import { style } from "../../styles/StyleObject";

export default function AddProjectModal({
  isOpen,
  setIsOpen,
  projectId,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  projectId: string;
}) {
  const utils = trpc.useContext();
  const [css] = useStyletron();
  const { data: session } = useSession();
  const [image, setImage] = React.useState<string | null>(null);

  const projectQuery = trpc.useQuery(
    ["project.project", { id: projectId as string }],
    { retry: false, enabled: Boolean(projectId) }
  );

  // Edit
  React.useEffect(() => {
    const proj = projectQuery.data?.project;
    if (proj) {
      setValue("id", proj.id);
      setValue("workerId", proj.workerId);
      setValue("image", proj.coverImg);
      setValue("title", proj.title);
      setValue("client", proj.client);
      setValue("description", proj.description);
    } else {
      setValue("image", "");
    }
  }, [projectQuery.data?.project]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IwriteProjectSchema>({
    resolver: zodResolver(writeProjectSchema),
  });

  const { mutateAsync, isLoading } = trpc.useMutation(["project.writeProject"]);

  const onSubmit = async (data: IwriteProjectSchema) => {
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          utils.invalidateQueries(["project.projects"]);
          // clear form
          reset();
          setImage(null);
        },
      });
      setIsOpen(false);
    } catch (err) {
      toaster.warning("Unable to create project", {});
    }
  };

  return (
    <>
      <Toaster />
      <ModalTemp
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={projectQuery.data ? "Edit Project" : "Add Project"}
        hasModal={true}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl overrides={hide}>
          <Controller
            name="workerId"
            control={control}
            defaultValue={session?.id as string}
            render={({ field }) => (
              <Input {...field} type="hidden" ref={field.ref} />
            )}
          />
        </FormControl>
        <FormControl label="Cover" caption="Image should not be more than 2 MB">
          <Block
            display="flex"
            position="relative"
            className={css({
              width: "100%",
              gap: "20px",
            })}
          >
            <Block height="200px" width="100%">
              <Image
                alt={"project?.title"}
                src={
                  image
                    ? image
                    : projectQuery.data?.project
                    ? projectQuery.data?.project.imageURL
                    : "https://i.pinimg.com/564x/21/db/0e/21db0e71562f026751063800ecb3e9e7.jpg"
                }
                objectFit={"cover"}
                priority
                layout="fill"
                className={css(style.image)}
              />
            </Block>
            <Block className={css({ position: "absolute" })}>
              <Controller
                name="imageBase64"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FileUploader
                    name={field.name}
                    accept={".png, .jpg, .jpeg"}
                    maxSize={1048576}
                    // maxSize={1000000}
                    onDrop={async (acceptedFiles, rejectedFiles) => {
                      // handle file upload...
                      const acpFile = acceptedFiles[0];
                      if (acpFile) {
                        const base64 = await toBase64(acpFile);
                        field.onChange(base64);
                        setImage(URL.createObjectURL(acpFile));
                      }

                      const rejFile = rejectedFiles[0];
                      if (rejFile) {
                        const size = (+rejFile.size * 0.000001).toFixed(1);
                        toaster.warning(
                          `Image exceeded size limit 2 MB receive ${size} MB`,
                          {}
                        );
                      }
                    }}
                    overrides={{
                      FileDragAndDrop: {
                        style: ({}) => ({
                          height: "200px",
                          paddingTop: "70px",
                          transform: "translate(100%, 0)",
                          background: "none",
                          border: "none",
                        }),
                      },
                      ContentMessage: {
                        style: () => ({ textAlign: "center", display: "none" }),
                      },
                    }}
                  />
                )}
              />
            </Block>
          </Block>
        </FormControl>
        <FormControl label="Title" caption="your project title">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input required {...field} ref={field.ref} size={SIZE.compact} />
            )}
          />
        </FormControl>
        <FormControl
          label="Client's name"
          caption="what is the name of the project's client?"
        >
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Input required {...field} ref={field.ref} size={SIZE.compact} />
            )}
          />
        </FormControl>
        <FormControl
          label="Description"
          caption="Description your problem in details"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                ref={field.ref}
                size={SIZE.compact}
                placeholder={""}
                overrides={{
                  Input: {
                    style: {
                      maxHeight: "300px",
                      minHeight: "100px",
                      minWidth: "300px",
                      width: "100vw", // fill all available space up to parent max-width
                      resize: "both",
                    },
                  },
                  InputContainer: {
                    style: {
                      maxWidth: "100%",
                      width: "min-content",
                    },
                  },
                }}
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          kind={KIND.primary}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {projectQuery.data ? "Save" : "Submit"}
        </Button>
        {/* </div> */}
      </ModalTemp>
    </>
  );
}
