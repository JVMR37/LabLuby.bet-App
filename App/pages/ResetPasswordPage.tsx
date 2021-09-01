import { StatusBar } from "expo-status-bar";
import React from "react";
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

const ResetPasswordPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailValidator);

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
            <Text>Send Link</Text>
          </Button>
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
