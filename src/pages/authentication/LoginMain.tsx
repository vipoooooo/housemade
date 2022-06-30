import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { HeadingMedium } from "baseui/typography";
import Layout from "../../layouts/Default";
import { Block } from "baseui/block";
import { FileUploader } from "baseui/file-uploader";

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState("");
  return (
    <div>
      <HeadingMedium>Login</HeadingMedium>
    </div>
  );
}
