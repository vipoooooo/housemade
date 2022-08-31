import * as React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ParagraphMedium } from "baseui/typography";
import { Textarea } from "baseui/textarea";
import { Button, KIND, SIZE } from "baseui/button";
import { StarRating } from "baseui/rating";
import { FormControl } from "baseui/form-control";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "baseui/input";
import ModalW from "../../layouts/ModalW";

export default function ReviewModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [css] = useStyletron();
  //   const utils = trpc.useContext();
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //     setValue,
  //   } = useForm<IWriteReview>({
  //     resolver: zodResolver(writeReviewSchema),
  //   });
  //   console.log("errors", errors);

  //   const { mutateAsync, error } = trpc.useMutation(["review.review"]);
  //   console.log(error, "review error");

  //   const {
  //     data: currentReview,
  //     isLoading,
  //     isFetching,
  //   } = trpc.useQuery(["review.reviews", { id: id as string }], {
  //     retry: false,
  //     select: (data) => {
  //       return data.reviews.find((review) => review.clientId === session?.id);
  //     },
  //   });

  //   React.useEffect(() => {
  //     if (currentReview) {
  //       setValue("reviewId", currentReview.id);
  //       setValue("rating", currentReview.rating);
  //       setValue("description", currentReview.description);
  //     }
  //   }, [currentReview]);

  //   const onSubmit = React.useCallback(async (data: IWriteReview) => {
  //     try {
  //       console.log(data, "data12121");
  //       const result = await mutateAsync(data, {
  //         onSuccess: () => {
  //           utils.invalidateQueries(["review.reviews"]);
  //         },
  //       });
  //       console.log(result);
  //       setIsOpen(false);
  //     } catch (err) {}
  //   }, []);

  return (
    <ModalW
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Review Submission"
      hasModal={true}
      //   onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
          })}
        >
          <FormControl>
            <Controller
              name="reviewId"
              //   control={control}
              defaultValue={""}
              render={({ field }) => (
                <Input {...field} type="hidden" ref={field.ref} />
              )}
            />
          </FormControl>
        </div>
        <Button type="submit" kind={KIND.primary}>
          Submit
        </Button>
      </div>
    </ModalW>
  );
}
