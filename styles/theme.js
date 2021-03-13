// example theme.js
import { tailwind, base } from "@theme-ui/presets";

const theme = {
  ...base,
  fonts: {
    body:
      'Vazir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "VazirM, serif",
    monospace: "VazirL, monospace",
  },
  buttons: {
    ...base.buttons,
    primary: {
      marginTop: "1em",
      background: "#25b79b",
      borderRadius: "80px",
      cursor: "pointer",
      fontFamily: "Vazir",
      ":focus": {
        borderRadius: "80px",
        outline: "none",
      },
      ":hover": {
        filter: "saturate(250%)",
      },
    },
    outline: {
      marginTop: "1em",
      background: "transparent",
      borderRadius: "80px",
      border: "3px solid #25b79b",
      cursor: "pointer",
      color: "#25b79b",
      fontFamily: "Vazir",
      ":focus": {
        borderRadius: "80px",
        outline: "none",
      },
      ":hover": {
        filter: "saturate(250%)",
      },
    },
  },
  colors: {
    ...base.colors,
    text: "#5390d9",
    background: "#ffffff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
  },
  variants: {
    ...base.variants,
    miniTile: {
      width: "100px",
      height: "auto",
      border: "1px #eee solid",
      borderRadius: "14px",
      textAlign: "center",
      cursor: "pointer",
    },
    miniTileDisable: {
      width: "100px",
      height: "auto",
      border: "1px #eee solid",
      borderRadius: "14px",
      textAlign: "center",
      position: "relative",
      "::after": {
        content: '""',
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        opacity: "0.8",
      },
    },
  },
  fontSizes: [10, 12, 14, 16, 20, 22, 24, 26, 32],
};
export default theme;
