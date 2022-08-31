import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useStyletron } from "baseui";
import Form from "../../layouts/Form";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { ParagraphMedium, ParagraphXSmall } from "baseui/typography";
import { StyledLink } from "baseui/link";
import { Notification, KIND } from "baseui/notification";
import { trpc } from "../../utils/trpc";
import { Select } from "baseui/select";
import { IRegisterWorker } from "../../server/router/worker/work.type";

const RegisterWorker: NextPage = () => {
  const router = useRouter();
  const [css, theme] = useStyletron();
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<IRegisterWorker>({
  //     resolver: zodResolver(loginSchema),
  //   });
  //   const [error, setError] = useState<SignInResponse["error"]>();

  //   const onSubmit = useCallback(async (data: IRegisterWorker) => {
  //     await signIn("credentials", {
  //       ...data,
  //       callbackUrl: "/browse/Browse",
  //       redirect: false,
  //     }).then((res) => {
  //       if (res?.ok) {
  //         router.push("/browse/Browse");
  //       } else {
  //         setError("Invalid credentials!");
  //       }
  //     });
  //   }, []);

  const sublist = trpc.useQuery(["subcategory.subcategorylist"], {
    retry: false,
  });

  return (
    <div>
      <Head>
        <title>Register as Worker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Form
          title="Worker Registration"
          hasForm={true}
          //   onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={css({
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            })}
          >
            <div
              className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                border: "2px solid #EEEEEE",
              })}
            >
              {/* <FormControl label="Skill">
                <Controller
                  name="subcategoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      ref={field.ref}
                      value={field.value}
                      onChange={(params) => field.onChange(params.value)}
                      options={sublist.data?.subcategorylist}
                      placeholder="Choose one skill"
                    />
                  )}
                />
              </FormControl> */}
              <Button
                type="submit"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "100%",
                    }),
                  },
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </Form>
      </main>
    </div>
  );
};

export default RegisterWorker;
