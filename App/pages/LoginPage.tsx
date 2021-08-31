import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LogoComponent from "../components/LogoComponent";
import Card from "../layout/Card";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../styles/global.style";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const LoginPage: React.FC = () => {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <LogoComponent />
      <Text>Autentication</Text>
      <Card>
        <TextInput
          label="Email"
          value={text}
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

        <Button>
          <Text>Log In</Text>
          <Ionicons name={"md-refresh"} size={24} />
        </Button>
      </Card>
      <Button>
        <Text>Log In</Text>
        <Ionicons name={"md-refresh"} size={24} />
      </Button>
      <Text
        style={{
          position: "absolute",
          bottom: 16,
        }}
      >
        Copyright 2020 Luby Software
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginPage;
