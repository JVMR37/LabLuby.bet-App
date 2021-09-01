import React from "react";
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

const SignupPage: React.FC<{ navigation: any }> = ({ navigation }) => {
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
          onBlur={passBlurHandler}
          onChangeText={passChangeHandler}
          secureTextEntry
          style={globalStyles.textInput}
          right={<TextInput.Icon name="eye" />}
        />

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            onPress={() => console.log("pressed")}
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
            <Text>Sign Up</Text>
          </Button>
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
