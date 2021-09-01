import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import Game from "../models/Game";
import SavedGame from "../models/SavedGame";
import {
  fetchGames,
  fetchSavedBets,
  saveBetsInDB,
} from "../datasource/gameDatasource";
import PaginationMetadata from "../models/PaginationMetadata";

export enum GameStatus {
  Loading,
  Loaded,
  Error,
  IDLE,
}

export interface GameState {
  availableGames: Array<Game>;
  selectedGame?: Game;
  selectedNumbers: Array<number>;
  status: GameStatus;
  savedGames: Array<SavedGame>;
  gamePagination?: PaginationMetadata;
  filterGame: string;
}

const initialState: GameState = {
  availableGames: [],
  selectedNumbers: [],
  savedGames: [],
  status: GameStatus.IDLE,
  filterGame: "",
};

interface FetchBetsProps {
  page: number;
  filter?: string;
}

export const loadGames = createAsyncThunk(
  "auth/loadGames",
  async (_, thunkApi) => {
    const response = await fetchGames();

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível carregar os jogos !");
    }

    return response.data;
  }
);

export const loadSavedBets = createAsyncThunk(
  "auth/loadSavedBets",
  async (props: FetchBetsProps, thunkApi) => {
    const response = await fetchSavedBets(props.page, props.filter);
    console.log(response);

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível carregar os jogos !");
    }

    return response;
  }
);

export const saveBets = createAsyncThunk(
  "auth/saveGames",
  async (bets: Array<SavedGame>, thunkApi) => {
    const response = await saveBetsInDB(bets);

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível carregar os jogos !");
    }

    return response.data;
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectGame: (state, action: PayloadAction<string>) => {
      state.selectedGame = state.availableGames.find((value) => {
        return value.type === action.payload;
      });
    },

    selectNumber: (state, action: PayloadAction<number>) => {
      if (
        action.payload &&
        state.selectedNumbers.length < state.selectedGame!.maxNumber
      ) {
        state.selectedNumbers.push(action.payload);
      } else {
      }
    },

    removeNumber: (state, action: PayloadAction<number>) => {
      const numberIndex = state.selectedNumbers.findIndex(
        (number) => number === action.payload
      );
      if (numberIndex !== -1) {
        state.selectedNumbers.splice(numberIndex, 1);
      }
    },

    clearSelectedNumbers: (state) => {
      state.selectedNumbers = [];
    },

    randomlySelectNumbers: (state) => {
      while (state.selectedNumbers.length < state.selectedGame!.maxNumber) {
        const possibleNumber = Math.ceil(
          Math.random() * state.selectedGame!.range
        );

        if (
          !state.selectedNumbers.some(
            (selectedNumber) => possibleNumber === selectedNumber
          )
        ) {
          state.selectedNumbers.push(possibleNumber);
        }
      }
    },

    selectFilter: (state, action: PayloadAction<string>) => {
      state.filterGame = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadGames.pending, (state) => {
      state.status = GameStatus.Loading;
    });

    builder.addCase(loadGames.rejected, (state) => {
      state.status = GameStatus.Error;
    });

    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.availableGames = action.payload;
      state.selectedGame = state.availableGames[0];
      state.status = GameStatus.Loaded;
    });

    builder.addCase(loadSavedBets.pending, (state) => {
      state.status = GameStatus.Loading;
    });

    builder.addCase(loadSavedBets.rejected, (state) => {
      state.status = GameStatus.Error;
    });

    builder.addCase(loadSavedBets.fulfilled, (state, action) => {
      state.savedGames = action.payload.data;
      state.gamePagination = action.payload.meta;

      state.status = GameStatus.Loaded;
    });
  },
});

export const {
  selectGame,
  selectNumber,
  clearSelectedNumbers,
  removeNumber,
  randomlySelectNumbers,
  selectFilter,
} = gameSlice.actions;
export const selectAvailableGames = (state: RootState) =>
  state.game.availableGames;
export const getSelectedNumbers = (state: RootState) =>
  state.game.selectedNumbers;

export const getGamePagination = (state: RootState) =>
  state.game.gamePagination;

export const getGameFilter = (state: RootState) => state.game.filterGame;

export const getSavedGames = (state: RootState) => state.game.savedGames;

export const getSelectedGame = (state: RootState) => state.game.selectedGame;

export default gameSlice.reducer;
