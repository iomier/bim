import React, { useContext } from "react";
import { Box, Button, Flex, Link, Heading, Text } from "theme-ui";
import NextLink from "next/link";
import AuthContext from "../context/auth.context";
function Header() {
  const { state: user, dispatch } = useContext(AuthContext);
  console.log(user, "user");
  return (
    <Box
      as={"header"}
      sx={{
        display: "grid",
        gridGap: 3,
        gridTemplateColumns: "repeat(3, 1fr)",
        px: 3,
        py: 4,
        alignItems: "center",
      }}
    >
      <Button
        title="Toggle Menu"
        sx={{
          appearance: "none",
          width: 32,
          height: 32,
          m: 0,
          p: 1,
          color: "inherit",
          bg: "transparent",
          border: 0,
          ":focus": {
            outline: "2px solid",
          },
          ":hover": {
            color: "primary",
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentcolor"
          viewBox="0 0 24 24"
          sx={{
            display: "block",
            margin: 0,
          }}
        >
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </Button>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          as={NextLink}
          href={"/"}
          sx={{
            py: 1,
            color: "primary",
            fontWeight: "bold",
          }}
        >
          سامانه مقایسه و خرید بیمه
        </Link>
      </Flex>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {user.name && user.lastName ? (
          <Text>{`${user.name} ${user.lastName}`}</Text>
        ) : (
          <Link
            to="/blog"
            sx={{
              ml: 3,
              py: 3,
            }}
          >
            ثبت نام
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default Header;
