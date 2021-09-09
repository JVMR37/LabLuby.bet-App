import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { globalStyles } from "../styles/global.style";
import { appColors } from "../styles/appTheme";

import AuthPagesContainer from "../layout/AuthPageContainer";
import LogoComponent from "../components/LogoComponent";
import TitlePageComponent from "../components/TitlePageComponent";
import Card from "../layout/Card";
import Footer from "../layout/footer";
import useInput from "../hooks/use-input";
import {
  isNotEmptyValidator,
  emailValidator,
  passValidator,
} from "../utils/validators";
import AuthStatusMessage from "../components/AuthStatusMessage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  AuthStatus,
  register,
  selectAuthStatusValue,
  updateAuthStatusAfterTime,
} from "../store/authSlice";

const SignupPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [isObscure, setObscureValue] = useState(true);
  const authStatus = useAppSelector(selectAuthStatusValue);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmptyValidator);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailValidator);

  const {
    value: passValue,
    isValid: passIsValid,
    hasError: passHasError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPass,
  } = useInput(passValidator);

  const formIsValid = passIsValid && emailIsValid && nameIsValid;

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    const result = await dispatch(
      register({ name: nameValue, email: emailValue, password: passValue })
    );

    dispatch(updateAuthStatusAfterTime(AuthStatus.IDLE));

    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        resetName();
        resetEmail();
        resetPass();
        navigation.pop();
      }, 2000);
    }

    console.log("Submitted!");
  };

  const content = useCallback(() => {
    switch (authStatus) {
      case AuthStatus.Loading:
        return (
          <AuthStatusMessage key="Loading Message" status={authStatus}>
            Loading...
          </AuthStatusMessage>
        );
      case AuthStatus.Error:
        return (
          <AuthStatusMessage key="Error Message" status={authStatus}>
            Failed to register : (
          </AuthStatusMessage>
        );
      case AuthStatus.Success:
        return (
          <AuthStatusMessage key="Success Message" status={authStatus}>
            Successfully registered : )
          </AuthStatusMessage>
        );
      case AuthStatus.IDLE:
      default:
        return (
          <Button
            onPress={submitHandler}
            icon="arrow-right"
            disabled={!formIsValid}
            uppercase={false}
            style={{
              marginVertical: 16,
            }}
            labelStyle={{
              fontSize: 32,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            contentStyle={{
              flexDirection: "row-reverse",
            }}
          >
            <Text>Sign Up</Text>
          </Button>
        );
    }
  }, [authStatus, formIsValid])();

  return (
    <AuthPagesContainer>
      <LogoComponent />
      <TitlePageComponent title="Registration" />
      <Card>
        <TextInput
          label="Name"
          value={nameValue}
          error={nameHasError}
          onBlur={nameBlurHandler}
          mode="flat"
          style={globalStyles.textInput}
          onChangeText={nameChangeHandler}
        />

        <TextInput
          label="Email"
          value={emailValue}
          error={emailHasError}
          onBlur={emailBlurHandler}
          mode="flat"
          style={globalStyles.textInput}
          onChangeText={emailChangeHandler}
        />

        <TextInput
          label="Password"
          value={passValue}
          error={passHasError}
          onChangeText={passChangeHandler}
          onBlur={passBlurHandler}
          secureTextEntry={isObscure}
          style={globalStyles.textInput}
          right={
            <TextInput.Icon
              name={isObscure ? "eye-off-outline" : "eye-outline"}
              onPress={() => setObscureValue(!isObscure)}
            />
          }
        />

        <View
          style={{
            width: "100%",
            marginVertical: 8,
          }}
        >
          {content}
        </View>
      </Card>
      <Button
        onPress={() => navigation.pop()}
        mode="text"
        style={{
          marginVertical: 28,
        }}
        icon="arrow-left"
        uppercase={false}
        labelStyle={{
          fontSize: 32,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
        color={appColors.secondary}
      >
        <Text>Back</Text>
      </Button>
      <Footer />
    </AuthPagesContainer>
  );
};

export default SignupPage;
