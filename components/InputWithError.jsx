import { Box, Input, Message } from "theme-ui";

function InputWithError(props) {
  const {
    name,
    placeholder,
    register,
    errors,
    inputProps = {},
    ...rest
  } = props;
  return (
    <Box {...rest}>
      <Input
        name={name}
        placeholder={placeholder}
        ref={register}
        {...inputProps}
      />
      {errors?.[name]?.message ? (
        <Message
          css={`
            background-color: lightcoral;
            color: black;
            border-left-color: darkred;
          `}
          mt={1}
        >
          {errors?.[name]?.message}
        </Message>
      ) : null}
    </Box>
  );
}

export default InputWithError;
