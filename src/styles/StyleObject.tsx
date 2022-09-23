import { StyleObject } from "styletron-standard";

export type Styled = { [key: string]: StyleObject };

export const style: Styled = {
  image: {
    objectFit: "contain",
    width: "100% !important",
    position: "relative",
    height: "unset !important",
  },
  imageContainer: {
    width: "100%",
    ">div": {
      position: "unset",
    },
  },
  formWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cardWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "2px solid #EEEEEE",
  },
  footWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "10px 20px",
    border: "2px solid #EEEEEE",
  },
  settingDefaultLayout: {
    // maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    // gap: "20px",
  },
  profileDefaultLayout: { gap: "20px", flexWrap: "wrap" },
};
