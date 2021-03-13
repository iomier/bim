import React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import { Box, Button, Flex, Image, Text } from "theme-ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputWithError from "../components/InputWithError";
import Link from "next/link";

InsureSelect.propTypes = {};

function InsureSelect(props) {
  return (
    <Page>
      <Flex
        css={`
          flex-direction: column;
          height: calc(100vh - 125px);
        `}
        sx={{ width: ["100%", "50%"] }}
      >
        <Flex my={3}>
          <Link href={"/third-party"}>
            <Box variant={"variants.miniTile"} mx={3} p={3}>
              <Image src={"/icons/insurance.svg"} />
              <Text
                css={`
                  font-size: 13px;
                `}
              >
                شخص ثالث
              </Text>
            </Box>
          </Link>

          <Box variant={"variants.miniTileDisable"} mx={3} p={3}>
            <Image src={"/icons/insurance.svg"} />
            <Text
              css={`
                font-size: 13px;
              `}
            >
              بدنه
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Page>
  );
}

export default InsureSelect;
