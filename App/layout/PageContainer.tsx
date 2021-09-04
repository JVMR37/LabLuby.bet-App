import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { appColors } from "../styles/appTheme";
const PageContainer: React.FC = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.appContent}>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  appBar: {
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  appContent: {
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 50,
    marginHorizontal: 16,
  },
});

export default PageContainer;
