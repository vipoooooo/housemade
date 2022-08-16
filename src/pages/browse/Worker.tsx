import * as React from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/Default";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { StatefulButtonGroup, MODE, SIZE, SHAPE } from "baseui/button-group";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { trpc } from "../../utils/trpc";
import WorkerBtn from "../../components/common/WorkerBtn";

export default function Worker() {
  const router = useRouter();
  const { id, skillId } = router.query;
  const subcategoryQuery = trpc.useQuery(
    ["subcategory.subcategories", { id: id as string }],
    { retry: false }
  );
  const { data, isLoading } = trpc.useQuery(
    ["worker.workers", { id: (skillId as string) || (id as string) }],
    { retry: false }
  );

  return (
    <Layout hasHeader={true}>
      <Block marginBottom={"20px"}>
        <StatefulButtonGroup
          size={SIZE.compact}
          shape={SHAPE.pill}
          mode={MODE.radio}
          initialState={{ selected: 0 }}
        >
          <Button
            onClick={() => {
              router.push(`/browse/Worker?id=${id}`);
            }}
          >
            All
          </Button>
          {subcategoryQuery.data?.subcategories.map((skill) => (
            <Button
              key={skill.id.toString()}
              onClick={() => {
                router.push(`/browse/Worker?id=${id}&skillId=${skill.id}`);
              }}
            >
              {skill.title}
            </Button>
          ))}
        </StatefulButtonGroup>
      </Block>
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 3]}
        flexGridColumnGap="scale500"
        flexGridRowGap="scale500"
      >
        {/* {workerQuery.data?.workers.map((worker) => {
          return (
            <FlexGridItem key={worker.id.toString()}>
              <WorkerCard data={worker} />
            </FlexGridItem>
          );
        })} */}
        {data?.workers.map((worker) => {
          return (
            <FlexGridItem key={worker.id.toString()}>
              <WorkerBtn
                id={worker.id}
                pfp={worker.user.image || ""}
                username={worker.user.username}
                verify={worker.verify}
                skill={worker.subcategory?.title || ""}
              />
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </Layout>
  );
}
