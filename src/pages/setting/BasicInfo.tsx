import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import * as React from "react";
import { useState } from "react";
import { Button, KIND, SIZE } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser, userSchema } from "../../server/router/user/user.type";
import { Select } from "baseui/select";
import { trpc } from "../../utils/trpc";
import { Textarea } from "baseui/textarea";
import restricted from "../api/restricted";
import { Avatar } from "baseui/avatar";

export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

export default function BasicInfo() {
  const router = useRouter();
  const [ishover, setisHover] = useState(false);
  const { data } = useSession();
  const [css, theme] = useStyletron();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });
  console.log(errors, "errr");

  const userQuery = trpc.useQuery(["user.getUser", { id: data?.id as string }]);
  // console.log(userQuery.data?.user);
  const userMutation = trpc.useMutation(["user.user"]);
  const sublist = trpc.useQuery(["subcategory.subcategorylist"], {
    retry: false,
  });
  const categoryQuery = trpc.useQuery(["category.categoriesWithSubcategory"], {
    retry: false,
  });
  console.log(categoryQuery)
  // const options = {
  //   __ungrouped: [],
  //   A: [{ id: 1, label: 'AA' }],
  //   B: [{ id: 1, label: 'BA' }, { id: 1, label: 'BB' }]
  // }

  React.useEffect(() => {
    const user = userQuery.data?.user;
    if (user) {
      setValue("id", user.id);
      setValue("role", user.role);
      setValue("username", user.username);
      setValue("email", user.email);
    }
  }, [userQuery.data?.user]);

  const [skill, setSkill] = React.useState({__ungrouped: []});
  console.log(skill)
  React.useEffect(() => {
    const categories = categoryQuery.data?.categories;
    if (categories) {
      setSkill({ __ungrouped: [], ...categoryQuery.data?.categories  })
    }
  }, [categoryQuery.data]);

  // React.useEffect(() => {
  //   if (categoryQuery.data) {
  //     // setValue("subcategoryId", {});
  //   }
  // }, [categoryQuery.data]);

  const onSubmit = React.useCallback(
    async (data: IUser) => {
      try {
        console.log(data, "jjk");
        if (data.role === "worker" && !data.subcategoryId?.length) {
          setError("subcategoryId", {});
          return;
        }
        const result = await userMutation.mutateAsync(data);
        console.log("result", result);
      } catch (err) {
        console.log(err);
      }
    },
    [data]
  );
  // const [error, setError] = useState<SignInResponse["error"]>();

  if (userQuery.isLoading) {
    return <>Loading ...</>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <Avatar name="" size="200px" src={userQuery.data.user.image} />
            </Block>
          )}
          <Block
            className={css({
              position: "absolute",
            })}
          >
            <Controller
              name="pfp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FileUploader
                  {...field}
                  accept={".png, .jpg, .jpeg"}
                  onDrop={(acceptedFiles, rejectedFiles) => {
                    // handle file upload...
                    field.onChange(acceptedFiles[0]);
                    // console.log(acceptedFiles, rejectedFiles, "jj");
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
                      options={skill}
                      onChange={(params) => field.onChange(params.value)}
                      isLoading={categoryQuery.isLoading}
                      placeholder="Choose one skill"
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
          <Button type="submit" kind={KIND.primary}>
            Save Changes
          </Button>
        </Block>
      </Block>
    </form>
  );
}
