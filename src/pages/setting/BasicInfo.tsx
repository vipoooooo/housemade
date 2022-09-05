import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import * as React from "react";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser, userSchema } from "../../server/router/user/user.type";
import { Select } from "baseui/select";
import { trpc } from "../../utils/trpc";
import { Textarea } from "baseui/textarea";
import restricted from "../api/restricted";
import { Avatar } from "baseui/avatar";
import { toaster, ToasterContainer } from "baseui/toast";
import { toBase64 } from "../../helpers/snipet";

export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

export default function BasicInfo() {
  const { data } = useSession();
  const [css] = useStyletron();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  const userQuery = trpc.useQuery(["user.getUser", { id: data?.id as string }]);
  const userMutation = trpc.useMutation(["user.user"]);
  const categoryQuery = trpc.useQuery(["category.categoriesWithSubcategory"], {
    retry: false,
  });
  const [skill, setSkill] = React.useState({ __ungrouped: [] });
  const [image, setImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = userQuery.data?.user;
    if (user) {
      setValue("id", user.id);
      setValue("role", user.role);
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("subcategoryId", {
        id: user.worker?.subcategoryId,
        label: user.worker?.subcategory?.title,
      });
      setValue("description", user.worker?.description || "");
      setValue("link", user.worker?.link || "");
      setValue("image", user.image || "");
    }
  }, [userQuery.data]);

  React.useEffect(() => {
    const categories = categoryQuery.data?.categories;
    if (categories) {
      setSkill({ __ungrouped: [], ...categoryQuery.data?.categories });
    }
  }, [categoryQuery.data]);

  const onSubmit = React.useCallback(
    async (data: IUser) => {
      try {
        if (data.role === "worker" && !data.subcategoryId) {
          setError("subcategoryId", {});
          return;
        }
        await userMutation.mutateAsync(data, {
          onSuccess: () => {
            toaster.info("Saved", {});
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [data]
  );

  if (userQuery.isLoading) {
    return <>Loading ...</>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToasterContainer
        autoHideDuration={2000}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              zIndex: 4,
            }),
          },
        }}
      />
      <Block
        display={"flex"}
        flexDirection={["column", "column", "row", "row"]}
        className={css({
          maxWidth: "700px",
          margin: "0 auto",
          gap: "20px",
        })}
      >
        <Block
          display={"flex"}
          position={"relative"}
          flexDirection={["row", "row", "column", "column"]}
          className={css({
            width: "100%",
            // gap: "20px",
          })}
        >
          {userQuery.data?.user.image && (
            <Block>
              <Avatar
                name=""
                size="200px"
                src={image ? image : userQuery.data.user.imageURL}
              />
            </Block>
          )}
          <Block
            className={css({
              position: "absolute",
            })}
          >
            <Controller
              name="imageBase64"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FileUploader
                  {...field}
                  accept={".png, .jpg, .jpeg"}
                  onDrop={async (acceptedFiles, rejectedFiles) => {
                    // handle file upload...
                    const file = acceptedFiles[0];

                    if (file) {
                      const base64 = await toBase64(file);
                      field.onChange(base64);
                      setImage(URL.createObjectURL(file));
                    }
                  }}
                  overrides={{
                    FileDragAndDrop: {
                      style: ({ $theme }) => ({
                        width: "200px",
                        height: "200px",
                        paddingTop: "75px",
                        background: "none",
                        border: "none",
                      }),
                    },
                    ContentMessage: {
                      style: ({ $theme }) => ({
                        textAlign: "center",
                        display: "none",
                      }),
                    },
                  }}
                />
              )}
            />
          </Block>
        </Block>

        <Block
          width={["100%", "100%", "calc(100% - 220px)", "calc(100% - 220px)"]}
          // width={"100%"}
          className={css({
            display: "flex",
            flexDirection: "column",
          })}
        >
          <FormControl label="Username">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  size={SIZE.compact}
                  overrides={{
                    Input: {
                      style: {
                        minWidth: "300px",
                        width: "100vw", // fill all available space up to parent max-width
                      },
                    },
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl label="Email">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} size={SIZE.compact} />}
            />
          </FormControl>
          {userQuery.data?.user.role === "worker" && (
            <>
              <FormControl
                label="Skill"
                error={errors["subcategoryId"] && <>Skill is required</>}
              >
                <Controller
                  name="subcategoryId"
                  control={control}
                  rules={{ required: userQuery.data?.user.role === "worker" }}
                  render={({ field }) => (
                    // <Select
                    //   ref={field.ref}
                    //   value={field.value}
                    //   onChange={(params) => field.onChange(params.value)}
                    //   options={sublist.data?.subcategorylist}
                    //   placeholder="Choose one skill"
                    // />
                    <Select
                      ref={field.ref}
                      value={field.value}
                      size={SIZE.compact}
                      options={skill}
                      onChange={(params) => field.onChange(params.value[0])}
                      isLoading={categoryQuery.isLoading}
                      placeholder=""
                    />
                  )}
                />
              </FormControl>
              <FormControl
                label="Description - optional"
                caption="describe what you do"
              >
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
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
              <FormControl
                label="Link - optional"
                caption="link to your personal website or website that contains your information"
                error={errors["link"] && "this link is invalid"}
              >
                <Controller
                  name="link"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input {...field} size={SIZE.compact} />
                  )}
                />
              </FormControl>
            </>
          )}
          <Button
            type="submit"
            kind={KIND.primary}
            isLoading={userMutation.isLoading}
            disabled={userMutation.isLoading}
          >
            Save Changes
          </Button>
        </Block>
      </Block>
    </form>
  );
}