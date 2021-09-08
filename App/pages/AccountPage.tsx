import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ErrorInputText from "../components/ErrorInputText";
import UpdateStatusMessage from "../components/UpdateStatusMessage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useInput from "../hooks/use-input";
import { useMountEffect } from "../hooks/use-mount-effect";
import PageContainer from "../layout/PageContainer";
import {
  selectUpdateStatusValue,
  selectUserData,
  UpdateStatus,
  updateUpdateStatusAfterTime,
  updateUserData,
} from "../store/authSlice";
import { globalStyles } from "../styles/global.style";
import { emailValidator, isNotEmptyValidator } from "../utils/validators";

const GamePage: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
    setValue: setEmailValue,
  } = useInput(emailValidator);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
    setValue: setNameValue,
  } = useInput(isNotEmptyValidator);

  useMountEffect(() => {
    setEmailValue(userData.email!);
    setNameValue(userData.name!);
  });

  const updateStatus = useAppSelector(selectUpdateStatusValue);

  const formIsValid = emailIsValid && nameIsValid;

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    const result = await dispatch(
      updateUserData({
        userId: userData.id!,
        email: emailValue,
        name: nameValue,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(updateUpdateStatusAfterTime(UpdateStatus.IDLE));
      setTimeout(() => {
        resetName();
        resetEmail();
      }, 2000);
    }

    console.log("Submitted!");
  };

  const content = useCallback(() => {
    switch (updateStatus) {
      case UpdateStatus.Loading:
        return (
          <UpdateStatusMessage key="Loading Message" status={updateStatus}>
            Loading...
          </UpdateStatusMessage>
        );
      case UpdateStatus.Error:
        return (
          <UpdateStatusMessage key="Error Message" status={updateStatus}>
            Failed to register : (
          </UpdateStatusMessage>
        );
      case UpdateStatus.Success:
        return (
          <UpdateStatusMessage key="Success Message" status={updateStatus}>
            Successfully registered : )
          </UpdateStatusMessage>
        );
      case UpdateStatus.IDLE:
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
              <Text>Update</Text>
            </Button>
          </View>
        );
    }
  }, [updateStatus, formIsValid])();

  return (
    <PageContainer>
      <Text style={globalStyles.titlePage}>Account</Text>

      <TextInput
        label="Name"
        value={nameValue}
        error={nameHasError}
        onBlur={nameBlurHandler}
        mode="flat"
        style={globalStyles.textInput}
        onChangeText={nameChangeHandler}
      />

      {nameHasError && (
        <ErrorInputText>Please enter a valid name.</ErrorInputText>
      )}

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
    </PageContainer>
  );
};

export default GamePage;
