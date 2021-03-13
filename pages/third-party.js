import React, { useEffect, useState, useReducer } from "react";
import Page from "../components/Page";
import { Box, Button, Flex, Heading, Select, Text, Spinner } from "theme-ui";
import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
// Interactors
async function _getCarTypes() {
  try {
    const res = await axios.get(
      "https://bimename.com/bimename/core/data/third-car-types"
    );
    return res.data.result;
  } catch (e) {}
}
async function _getCarDiscount() {
  try {
    const res = await axios.get(
      "https://bimename.com/bimename/core/data/car-third-discount"
    );
    return res.data.result;
  } catch (e) {}
}
async function _getInsCompanies() {
  try {
    const res = await axios.get(
      "https://bimename.com/bimename/core/data/companies"
    );
    return res.data.result;
  } catch (e) {}
}

// STATE

const initState = {
  carTypes: [],
  discounts: [],
  companies: [],
  step: 0,
  selectedCarType: "",
  selectedCarModel: "",
  selectedDiscount: "",
  selectedCompany: "",
};
const types = {
  setCarTypes: "setCarTypes",
  setDiscounts: "setDiscounts",
  setCompanies: "setCompanies",
  setSelectedCarModel: "setSelectedCarModel",
  setSelectedCarType: "setSelectedCarType",
  setSelectedDiscount: "setSelectedDiscount",
  setSelectedCompany: "setSelectedCompany",
  setStep: "setStep",
  setState: "setState",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case types.setStep: {
      return { ...state, step: payload };
    }
    case types.setDiscounts: {
      return { ...state, discounts: payload };
    }
    case types.setCompanies: {
      return { ...state, companies: payload };
    }
    case types.setCarTypes: {
      return { ...state, carTypes: payload };
    }
    case types.setSelectedCarType: {
      return { ...state, selectedCarType: payload };
    }
    case types.setSelectedCarModel: {
      return { ...state, selectedCarModel: payload };
    }
    case types.setSelectedDiscount: {
      return { ...state, selectedDiscount: payload };
    }
    case types.setSelectedCompany: {
      return { ...state, selectedCompany: payload };
    }
    case types.setState: {
      return { ...state, ...payload };
    }
  }
}

function ThirdParty(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const _handleBack = () => {
    if (state.step > 0) {
      dispatch({ type: types.setStep, payload: state.step - 1 });
    } else {
      return null;
    }
  };
  const _handleForward = () => {
    // hardcoded steps length => could be refactored to length of array or a Map
    if (state.step < 2) {
      dispatch({ type: types.setStep, payload: state.step + 1 });
    } else {
      openModal();
      return null;
    }
  };
  const { step } = state;
  useEffect(() => {
    switch (step) {
      case 0: {
        return _getCarTypes()
          .then((res) => dispatch({ type: types.setCarTypes, payload: res }))
          .catch((e) => console.log(e));
      }
      case 1: {
        return _getInsCompanies()
          .then((res) => dispatch({ type: types.setCompanies, payload: res }))
          .catch((e) => console.log(e));
      }
      case 2: {
        return _getCarDiscount()
          .then((res) => dispatch({ type: types.setDiscounts, payload: res }))
          .catch((e) => console.log(e));
      }
      default: {
        return;
      }
    }
  }, [step]);
  const _renderBrands = (carModel) => {
    return state.carTypes
      .find((carType) => carType.carType === carModel)
      ?.brand.map((brand) => <option key={brand.id}>{brand.name}</option>);
  };
  const _renderSteps = (step) => {
    switch (step) {
      case 0: {
        return (
          <Step1
            currentCarType={state.selectedCarType}
            carTypes={state.carTypes}
            carModel={state.selectedCarModel}
            dispatch={dispatch}
            _renderBrands={_renderBrands}
            _handleBack={_handleBack}
            _handleForward={_handleForward}
          />
        );
      }
      case 1: {
        return (
          <Step2
            selectedCompany={state.selectedCompany}
            companies={state.companies}
            dispatch={dispatch}
            _handleBack={_handleBack}
            _handleForward={_handleForward}
          />
        );
      }
      case 2: {
        return (
          <Step3
            currentDiscount={state.selectedDiscount}
            discount={state.discounts}
            dispatch={dispatch}
            _handleBack={_handleBack}
            _handleForward={_handleForward}
            step={state.step}
          />
        );
      }
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Page>
      <Flex
        css={`
          flex-direction: column;
          height: calc(100vh - 125px);
        `}
        sx={{ width: ["100%", "50%"] }}
      >
        {_renderSteps(state.step)}
      </Flex>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <Heading>سامانه خرید و مقایسه بیمه</Heading>
        <Text my={2}>{`نوع خودرو: ${state.currentCarType}`}</Text>
        <Text my={2}>{`مدل خودرو: ${state.carModel}`}</Text>
        <Text my={2}>{`تخفیف بیمه: ${state.currentDiscount}`}</Text>
        <Text my={2}>{`بیمه کننده: ${state.selectedCompany}`}</Text>
      </Modal>
    </Page>
  );
}

export default ThirdParty;

function Step1(props) {
  const {
    _handleBack,
    _handleForward,
    carTypes,

    _renderBrands,
    dispatch,
  } = props;
  const { errors, register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    dispatch({ type: types.setState, payload: data });
    _handleForward();
  };
  let currentCarType = watch("currentCarType");
  return (
    <>
      <Heading>بیمه شخص ثالث</Heading>
      <Text>نوع و مدل خودروی خود رو انتخاب کنید</Text>
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Flex
          my={3}
          css={`
            justify-content: space-between;
          `}
        >
          <Box
            css={`
              flex: 1;
              svg {
                color: black;
                margin-left: auto;
                margin-right: -28px;
              }
            `}
          >
            <Select
              defaultValue={""}
              name={"currentCarType"}
              ref={register({ required: true })}
              sx={{ flex: 1 }}
              css={`
                font-family: Vazir;
              `}
            >
              <option hidden disabled value={""}>
                نوع خودرو
              </option>
              {carTypes.map((carType) => (
                <option key={carType.carTypeID}>{carType.carType}</option>
              ))}
            </Select>
          </Box>
          <Box
            css={`
              flex: 1;
              svg {
                color: black;
                margin-left: auto;
                margin-right: -28px;
              }
            `}
            mx={2}
          >
            <Select
              defaultValue={""}
              name={"carModel"}
              ref={register({ required: true })}
              css={`
                font-family: Vazir;
              `}
            >
              <option hidden disabled value={""}>
                مدل خودرو
              </option>
              {_renderBrands(currentCarType)}
            </Select>
          </Box>
        </Flex>
        <ButtonBar _handleBack={_handleBack} />
      </Box>
    </>
  );
}

function Step2(props) {
  const {
    selectedCompany,
    companies,
    dispatch,
    _handleBack,
    _handleForward,
  } = props;
  const { errors, register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    dispatch({ type: types.setState, payload: data });
    _handleForward();
  };
  return (
    <>
      <Heading>بیمه شخص ثالث</Heading>
      <Text>شرکت بیمه گری قبلی رو وارد کنید</Text>
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Flex
          my={3}
          css={`
            justify-content: space-between;
          `}
        >
          <Box
            css={`
              flex: 1;
              svg {
                color: black;
                margin-left: auto;
                margin-right: -28px;
              }
            `}
          >
            <Select
              defaultValue={""}
              name={"selectedCompany"}
              ref={register({ required: true })}
              sx={{ flex: 1 }}
              css={`
                font-family: Vazir;
              `}
            >
              <option hidden disabled value={""}>
                شرکت بیمه‌کننده
              </option>
              {companies.map((company) => (
                <option key={company.id}>{company.company}</option>
              ))}
            </Select>
          </Box>
        </Flex>
        <ButtonBar _handleBack={_handleBack} />
      </Box>
    </>
  );
}

function Step3(props) {
  const { discount, dispatch, _handleBack, _handleForward, step } = props;
  const { errors, register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    console.log("==> ", data);
    dispatch({ type: types.setState, payload: data });
    _handleForward();
  };
  return (
    <>
      <Heading>بیمه شخص ثالث</Heading>
      <Text>درصد تخفیف بیمه‌ی شخص ثالث و حوادث راننده را وارد کنید</Text>
      <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Flex
          my={3}
          css={`
            justify-content: space-between;
          `}
        >
          <Box
            css={`
              flex: 1;
              svg {
                color: black;
                margin-left: auto;
                margin-right: -28px;
              }
            `}
          >
            <Select
              placeholder={"نوع خودرو"}
              name={"currentDiscount"}
              ref={register({ required: true })}
              defaultValue={""}
              sx={{ flex: 1 }}
              css={`
                font-family: Vazir;
              `}
            >
              <option hidden disabled value={""}>
                درصد تخفیف
              </option>
              {discount.map((dis) => (
                <option key={dis.id}>{dis.title}</option>
              ))}
            </Select>
          </Box>
        </Flex>
        <ButtonBar _handleBack={_handleBack} step={step} />
      </Box>
    </>
  );
}

function ButtonBar(props) {
  const { _handleBack, step } = props;
  return (
    <Flex
      css={`
        justify-content: space-between;
      `}
    >
      <Button
        css={`
          width: 30%;
          align-self: flex-end;
          position: relative;
          ::before {
            content: url("/icons/arrow.svg");
            height: 10px;
            width: 10px;
            display: inline-block;
            position: absolute;
            right: 12px;
            transform: scaleX(-1);
          }
        `}
        type={"button"}
        variant={"outline"}
        onClick={_handleBack}
      >
        بازگشت
      </Button>
      <Button
        css={`
          width: 30%;
          align-self: flex-end;
          position: relative;
          ::after {
            content: url("/icons/arrow.svg");
            height: 10px;
            width: 10px;
            display: inline-block;
            vertical-align: 0%;
            position: absolute;
            left: 12px;
          }
        `}
        variant={"outline"}
      >
        {step === 2 ? "استعلام" : "ادامه"}
      </Button>
    </Flex>
  );
}
