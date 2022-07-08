import * as React from "react";
import Default from "../../layouts/Default";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { Tabs, Tab, FILL } from "baseui/tabs-motion";
import ProfileSetting from "./ProfileSetting";
import AppearenceSetting from "./AppearenceSetting";

export default function Setting() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(
    '0',
  );
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
      <Tab key="0" title="Account Infomation"><ProfileSetting /></Tab>
      <Tab key="1" title="Appearence"><AppearenceSetting /></Tab>
    </Tabs>
    </Default>
  );
}
