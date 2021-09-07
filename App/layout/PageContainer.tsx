import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { appColors } from "../styles/appTheme";
const PageContainer: React.FC<{ needsScroll?: boolean }> = ({
  needsScroll = true,
  children,
}) => {
  return needsScroll ? (
    <ScrollView contentContainerStyle={styles.appContent}>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.appContent}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  appContent: {
    backgroundColor: appColors.background,
    paddingTop: 16,
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
});

export default PageContainer;
