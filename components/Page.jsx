import React from "react";
import { Box } from "theme-ui";
function Page(props) {
  return (
    <Box
      css={`
        background-image: url("/icons/bg.svg");
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 50vw;
        height: inherit;
      `}
      as={"main"}
      {...props}
    >
      {props.children}
    </Box>
  );
}

export default Page;
