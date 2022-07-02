import * as React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import Layout from "../../layouts/Default";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium } from "baseui/typography";
import WorkerCard from "../../components/common/WorkerCard";
import { StatefulButtonGroup, MODE, SIZE, SHAPE } from "baseui/button-group";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { IWorker, workers } from "../../constants/worker.const";
import categories from "../../constants/category.const";
import { skills } from "../../constants/skill.const";

export default function Worker() {
  const router = useRouter();
  const { id, skillId } = router.query;

  const cotegoryData = categories.find((categ) => categ.id.toString() === id);

  const skillsData = skills.filter(
    (skill) => skill.categoryId.toString() === id
  );

  const [workerData, setWorkerData] = React.useState<IWorker[]>([]);

  React.useEffect(() => {
    if (id) {
      const result = workers.filter((item) => {
        if (
          skillId &&
          item.skillId.toString() === skillId &&
          item.categoryId.toString() === id
        )
          return item;
        if (!skillId &&item.categoryId.toString() === id) return item;
      });
      setWorkerData(result)
    }
  }, [id, skillId]);

  console.log(workerData);

  return (
    <Layout hasHeader={true}>
      <HeadingMedium margin={0} marginBottom={"20px"}>
      <Link href="/browse/Browse">
          Browse &gt;
        </Link> {cotegoryData?.title}
      </HeadingMedium>
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
          {skillsData.map((skill) => (
            <Button
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
        {workerData.map((worker) => {
          return (
            <FlexGridItem>
              {/* {worker.occupation === "Civil Engineer" ? <WorkerCard data={worker} /> : <></>} */}
              <WorkerCard data={worker} />
            </FlexGridItem>
          );
        })}
      </FlexGrid>
    </Layout>
  );
}
