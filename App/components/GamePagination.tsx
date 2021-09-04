import React, { Fragment, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import {
  getGamePagination,
  getGameFilter,
  loadSavedBets,
} from "../store/gamesSlice";
import { Button } from "react-native-paper";
import { appColors } from "../styles/appTheme";

const GamePagination: React.FC = (props) => {
  const pagination = useAppSelector(getGamePagination);
  const filters = useAppSelector(getGameFilter);

  const dispatch = useAppDispatch();

  const goToNextPage = useCallback(async () => {
    await dispatch(loadSavedBets({ page: ++pagination!.currentPage, filters }));
  }, [dispatch, filters, pagination]);

  const goToPreviousPage = useCallback(async () => {
    await dispatch(loadSavedBets({ page: --pagination!.currentPage, filters }));
  }, [dispatch, filters, pagination]);

  async function changePage(pageNumber: number) {
    await dispatch(loadSavedBets({ page: pageNumber, filters }));
  }

  const getPaginationGroup = () => {
    if (pagination) {
      const pageLimit = 3;

      let start =
        Math.floor((pagination!.currentPage - 1) / pageLimit) * pageLimit;

      return Array.from(
        {
          length: pageLimit,
        },
        (_, i) => start + i + 1
      );
    } else {
      return [];
    }
  };

  return (
    <Fragment>
      {props.children}
      <View style={styles.paginationView}>
        <Button
          key={"prev button"}
          icon="arrow-left"
          uppercase={false}
          onPress={goToPreviousPage}
          disabled={pagination?.currentPage === pagination?.firstPage}
        >
          <Text>Prev</Text>
        </Button>

        {getPaginationGroup().map((item, index) => {
          const isCurrentPage = pagination!.currentPage === item;

          return item <= pagination!.lastPage ? (
            <Button
              key={index}
              uppercase={false}
              style={{
                borderColor: isCurrentPage
                  ? appColors.primary
                  : appColors.secondary,
                borderWidth: isCurrentPage ? 2 : 1,
                borderRadius: 50,
                minHeight: 45,
                minWidth: 45,
                marginHorizontal: 2,
                backgroundColor: appColors.background,
              }}
              contentStyle={{}}
              labelStyle={{
                fontWeight: isCurrentPage ? "bold" : "normal",
                color: isCurrentPage ? appColors.primary : appColors.secondary,
              }}
              onPress={changePage.bind(this, item)}
            >
              <Text>{item}</Text>
            </Button>
          ) : null;
        })}
        <Button
          key={"next button"}
          icon="arrow-right"
          uppercase={false}
          contentStyle={{
            flexDirection: "row-reverse",
          }}
          onPress={goToNextPage}
          disabled={pagination?.currentPage === pagination?.lastPage}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  paginationView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },

  paginationActionButton: {},

  paginationItemButton: {},
});

export default GamePagination;
