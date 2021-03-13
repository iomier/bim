import React from "react";
import { Box } from "theme-ui";
function Container(props) {
  return (
    <Box
      {...props}
      css={`
        background: linear-gradient(
          90deg,
          rgba(255, 251, 235, 1) 0%,
          rgba(255, 251, 235, 1) 34%,
          rgba(255, 255, 255, 1) 34%
        );
      `}
      sx={{
        maxWidth: "100%",
        mx: "auto",
        px: 3,
        height: "auto",
      }}
    >
      {props.children}
    </Box>
  );
}

export default Container;
