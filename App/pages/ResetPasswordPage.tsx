import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import LogoComponent from "../components/LogoComponent";
import Card from "../layout/Card";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global.style";
import { Button } from "react-native-paper";
import TitlePageComponent from "../components/TitlePageComponent";
import { appColors } from "../styles/appTheme";
import Footer from "../layout/footer";
import AuthPagesContainer from "../layout/AuthPageContainer";
import useInput from "../hooks/use-input";
import { emailValidator } from "../utils/validators";
import ErrorInputText from "../components/ErrorInputText";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  AuthStatus,
  selectAuthStatusValue,
  sendLinkToResetPass,
  updateAuthStatusAfterTime,
} from "../store/authSlice";
import AuthStatusMessage from "../components/AuthStatusMessage";

const ResetPasswordPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailValidator);

  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatusValue);

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
            Failed to send link : (
          </AuthStatusMessage>
        );
      case AuthStatus.Success:
        return (
          <AuthStatusMessage key="Success Message" status={authStatus}>
            Link sent successfully :)
          </AuthStatusMessage>
        );
      case AuthStatus.IDLE:
      default:
        return (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Button
              onPress={submitHandler}
              icon="arrow-right"
              uppercase={false}
              disabled={!emailIsValid}
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
              <Text>Send Link</Text>
            </Button>
          </View>
        );
    }
  }, [authStatus, emailIsValid])();

  const submitHandler = async () => {
    if (!emailIsValid) {
      return;
    }

    const result = await dispatch(sendLinkToResetPass(emailValue));

    dispatch(updateAuthStatusAfterTime(AuthStatus.IDLE));

    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        resetEmail();
        navigation.pop();
      }, 2000);
    }

    console.log("Submitted!");

    resetEmail();
  };

  return (
    <AuthPagesContainer>
      <LogoComponent />
      <TitlePageComponent title="Reset password" />
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

        <View
          style={{
            width: "100%",
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          {content}
        </View>
      </Card>
      <View
        style={{
          justifyContent: "flex-start",
        }}
      >
        <Button
          onPress={() => navigation.pop()}
          mode="text"
          style={{
            marginTop: 20,
            marginBottom: 10,
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

        <Button
          onPress={() => navigation.replace("Signup")}
          mode="text"
          style={{
            marginTop: 10,
            marginBottom: 20,
          }}
          icon="arrow-right"
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          uppercase={false}
          labelStyle={{
            fontSize: 32,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
          color={appColors.secondary}
        >
          <Text>Sign Up</Text>
        </Button>
      </View>
      <Footer />
      <StatusBar style="auto" />
    </AuthPagesContainer>
  );
};

export default ResetPasswordPage;
