import * as React from "react";
import Default from "../../layouts/Default";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import BasicInfo from "./BasicInfo";
import AppearenceSetting from "./AppearenceSetting";
import Account from "./Account";
import restricted from "../api/restricted";

// FOR RESTRICTED AUTH PURPOSE
export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

export default function Setting() {
  const [activeKey, setActiveKey] = React.useState<React.Key>("0");
  return (
    <Default hasHeader={true}>
      <HeadingTitle title="Setting" />
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(activeKey);
        }}
        activateOnFocus
      >
        <Tab key="0" title="Basic Info">
          <BasicInfo />
        </Tab>
        {/* <Tab key="1" title="Appearence">
          <AppearenceSetting />
        </Tab> */}
        <Tab key="1" title="Account">
          <Account />
        </Tab>
      </Tabs>
    </Default>
  );
}
