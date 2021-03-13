import Page from "../components/Page";
import { useForm } from "react-hook-form";
import { Flex, Box, Input, Button, Message } from "theme-ui";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/auth.context";
import InputWithError from "../components/InputWithError";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.post("/api/register", data);
    const { name, lastName } = res.data;
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("lastName", lastName);
    dispatch({ type: "user", payload: { name, lastName } });
    await router.push("/insure-select");
  };
  return (
    <Page>
      {/* Validation is done with react-hook-form built-in utilities */}
      {/* It can be refactored to use yup or other schema base validators */}
      <Flex
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        css={`
          flex-direction: column;
          height: calc(100vh - 125px);
        `}
        sx={{ width: ["100%", "50%"] }}
      >
        <Flex my={3}>
          <InputWithError
            name={"name"}
            placeholder={"نام"}
            register={register({ required: "این فیلد اجباری است." })}
            errors={errors}
            css={`
              flex: 1;
            `}
            ml={1}
          />
          <InputWithError
            name={"lastName"}
            placeholder={"نام‌خانوادگی"}
            register={register({ required: "این فیلد اجباری است." })}
            errors={errors}
            css={`
              flex: 1;
            `}
            mr={1}
          />
        </Flex>
        <InputWithError
          name={"phone"}
          placeholder={"شماره تلفن"}
          register={register({
            required: "این فیلد اجباری است.",
            // simple iran phone number regex pattern
            pattern: {
              value: /^[0][9][1][0-9]{8,8}$/,
              message: "فرمت شماره تلفن درست نیست.",
            },
          })}
          errors={errors}
          my={3}
        />
        <InputWithError
          name={"password"}
          placeholder={"رمز عبور"}
          inputProps={{ type: "password" }}
          register={register({
            required: "این فیلد اجباری است.",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,10}$/,
              message:
                "رمز عبور باید حداقل دارای یک حرف کوچک و یک حرف بزرگ لاتین و یک عدد باشد و طول آن بین ۴ الی ۱۰ باشد.",
            },
            maxLength: {
              value: 10,
              message: "حداکثر طول: ۱۰",
            },
            minLength: {
              value: 4,
              message: "حداقل طول: 4",
            },
          })}
          errors={errors}
          my={3}
        />
        <Button
          css={`
            width: 30%;
            align-self: flex-end;
            margin-top: 1em;
            background: #25b79b;
            border-radius: 80px;
            cursor: pointer;
            :focus {
              border-radius: 80px;
              outline: none;
            }
            :hover {
              filter: saturate(250%);
            }
          `}
        >
          ثبت نام
        </Button>
      </Flex>
    </Page>
  );
}
