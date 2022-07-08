import { useStyletron } from "baseui";
import { Input } from "baseui/input";
import { ParagraphMedium } from "baseui/typography";
import * as React from "react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { Select, Value } from "baseui/select";
import { MODE, StatefulButtonGroup } from "baseui/button-group";
import { FormControl } from "baseui/form-control";

export default function AppearenceSetting() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        // maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        // gap: "20px",
      })}
    >
      <FormControl label="Language" caption="" positive="" error="">
        <StatefulButtonGroup
          mode={MODE.radio}
          size={SIZE.compact}
          shape={SHAPE.pill}
          initialState={{ selected: 0 }}
        >
          <Button onClick={() => {}}>English</Button>
          <Button onClick={() => {}}>ខ្មែរ</Button>
          <Button onClick={() => {}}>ไทย</Button>
        </StatefulButtonGroup>
      </FormControl>
      <FormControl label="Theme" caption="" positive="" error="">
        <StatefulButtonGroup
          mode={MODE.radio}
          size={SIZE.compact}
          shape={SHAPE.pill}
          initialState={{ selected: 0 }}
        >
          <Button onClick={() => {}}>Light Mode</Button>
          <Button onClick={() => {}}>Dark Mode</Button>
        </StatefulButtonGroup>
      </FormControl>
      {/* <Button onClick={() => alert("click")} kind={KIND.primary}>
        Save Changes
      </Button> */}
    </div>
  );
}
