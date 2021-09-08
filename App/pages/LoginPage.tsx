import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LogoComponent from "../components/LogoComponent";
import Card from "../layout/Card";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global.style";
import { Button } from "react-native-paper";
import TitlePageComponent from "../components/TitlePageComponent";
import { appColors } from "../styles/appTheme";
import Footer from "../layout/footer";
import AuthPagesContainer from "../layout/AuthPageContainer";
import { emailValidator, passValidator } from "../utils/validators";
import useInput from "../hooks/use-input";
import {
  login,
  updateAuthStatusAfterTime,
  AuthStatus,
  selectAuthStatusValue,
} from "../store/authSlice";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import ErrorInputText from "../components/ErrorInputText";
import AuthStatusMessage from "../components/AuthStatusMessage";

const LoginPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isObscure, setObscureValue] = useState(true);
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

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatusValue);

  const formIsValid = passIsValid && emailIsValid;

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
            Error when logging in : (
          </AuthStatusMessage>
        );
      case AuthStatus.IDLE:
      default:
        return (
          <Button
            onPress={submitHandler}
            disabled={!formIsValid}
            icon="arrow-right"
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
            <Text>Log In</Text>
          </Button>
        );
    }
  }, [authStatus, formIsValid])();

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    const result = await dispatch(
      login({ email: emailValue, password: passValue })
    );

    if (result.meta.requestStatus === "rejected") {
      dispatch(updateAuthStatusAfterTime(AuthStatus.IDLE));
    }
  };

  return (
    <AuthPagesContainer>
      <LogoComponent />
      <TitlePageComponent title="Authentication" />
      <Card>
        <TextInput
          label="Email"
          value={emailValue}
          error={emailHasError}
          onBlur={emailBlurHandler}
          mode="flat"
          style={globalStyles.textInput}
          onChangeText={emailChangeHandler}
        />

        {emailHasError && (
          <ErrorInputText>Please enter a valid email address.</ErrorInputText>
        )}

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

        {passHasError && (
          <ErrorInputText>Please enter a valid password.</ErrorInputText>
        )}

        <View
          style={{
            marginVertical: 8,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onPress={() => navigation.navigate("ResetPassword")}
            mode="text"
            uppercase={false}
            labelStyle={{
              fontSize: 16,
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#c1c1c1",
            }}
            color={appColors.secondary}
          >
            <Text>I forget my password</Text>
          </Button>
        </View>

        <View
          style={{
            width: "100%",
            // marginHorizontal: 16,
          }}
        >
          {content}
        </View>
      </Card>
      <Button
        onPress={() => navigation.navigate("Signup")}
        mode="text"
        style={{
          marginVertical: 28,
        }}
        icon="arrow-right"
        uppercase={false}
        contentStyle={{
          flexDirection: "row-reverse",
        }}
        labelStyle={{
          fontSize: 32,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
        color={appColors.secondary}
      >
        <Text>Sign up</Text>
      </Button>
      <Footer />
      <StatusBar style="auto" />
    </AuthPagesContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
});

export default LoginPage;
