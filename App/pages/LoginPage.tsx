import { StatusBar } from "expo-status-bar";
import React from "react";
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

const LoginPage: React.FC = () => {
  const [text, setText] = React.useState("");

  return (
    <AuthPagesContainer>
      <LogoComponent />
      <TitlePageComponent title="Authentication" />
      <Card>
        <TextInput
          label="Email"
          value={text}
          onBlur={() => console.log("blur")}
          mode="flat"
          style={globalStyles.textInput}
          onChangeText={(text) => setText(text)}
        />

        <TextInput
          label="Password"
          secureTextEntry
          style={globalStyles.textInput}
          right={<TextInput.Icon name="eye" />}
        />
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
            onPress={() => console.log("pressed")}
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
            <Text>Log In</Text>
          </Button>
        </View>
      </Card>
      <Button
        onPress={() => console.log("pressed")}
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
