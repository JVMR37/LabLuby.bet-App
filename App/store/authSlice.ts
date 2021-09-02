import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import { RootState } from ".";
import {
  loginInAPI,
  registerUserInDB,
  updateUserDataInDB,
  requestPasswordChange,
  sendNewPassword,
} from "../datasource/authDatasource";

import ApiDatasource from "../datasource/apiDatasource";

export enum AuthStatus {
  Loading,
  Logged,
  Success,
  Error,
  IDLE,
}

export enum UpdateStatus {
  Loading,
  Success,
  Error,
  IDLE,
}
export interface AuthState {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userToken: string | null;

  status: AuthStatus;
  updateStatus: UpdateStatus;
}

const initialState: AuthState = {
  userId: null,
  userName: null,
  userEmail: null,
  userToken: null,

  status: AuthStatus.IDLE,
  updateStatus: UpdateStatus.IDLE,
};

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserProps {
  userId: string;
  name: string;
  email: string;
}

export interface UpdatePasswordProps {
  token: string;
  password: string;
  password_confirmation: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (props: LoginProps, thunkApi) => {
    const response = await loginInAPI(props.email, props.password);

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível fazer o Login !");
    }

    return { ...response.data };
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (props: RegisterProps, thunkApi) => {
    const response = await registerUserInDB(
      props.name,
      props.email,
      props.password
    );

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível fazer o Cadastro !");
    }

    return { ...response.data };
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (props: UpdateUserProps, thunkApi) => {
    const response = await updateUserDataInDB(
      props.userId,
      props.name,
      props.email
    );

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível fazer o Cadastro !");
    }

    return { ...response.data };
  }
);

export const sendLinkToResetPass = createAsyncThunk(
  "auth/sendLinkToResetPass",
  async (email: string, thunkApi) => {
    const response = await requestPasswordChange(email);

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível enviar o link !");
    }

    return { ...response.data };
  }
);

export const updatePassword = createAsyncThunk(
  "auth/sendLinkToResetPass",
  async (props: UpdatePasswordProps, thunkApi) => {
    const response = await sendNewPassword(
      props.token,
      props.password,
      props.password_confirmation
    );

    if (response instanceof Error) {
      return thunkApi.rejectWithValue("Não foi possível enviar o link !");
    }

    return { ...response.data };
  }
);

export const updateAuthStatusAfterTime = createAsyncThunk<
  AuthStatus,
  AuthStatus
>("auth/updateAuthStatus", async (newStatus: AuthStatus = AuthStatus.IDLE) => {
  return new Promise<AuthStatus>((resolve) => {
    setTimeout(() => resolve(newStatus), 2000);
  }).then((value) => value);
});

export const updateUpdateStatusAfterTime = createAsyncThunk<
  UpdateStatus,
  UpdateStatus
>(
  "auth/changeUpdateStatus",
  async (newStatus: UpdateStatus = UpdateStatus.IDLE) => {
    return new Promise<UpdateStatus>((resolve) => {
      setTimeout(() => resolve(newStatus), 2000);
    }).then((value) => value);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState);
      ApiDatasource.Instance.clearToken();
      state.status = AuthStatus.IDLE;
    },

    loadAuthState: (state) => {
      const authData = null; //localStorage.getItem("@tgl-app/auth");

      if (authData) {
        const authDataObject = JSON.parse(authData);
        Object.assign(state, authDataObject);

        ApiDatasource.Instance.setToken(authDataObject.userToken);
        state.status = AuthStatus.Logged;
        state.updateStatus = UpdateStatus.IDLE;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      ApiDatasource.Instance.setToken(action.payload.auth.userToken!);
    });

    builder.addCase(login.pending, (state, action) => {
      state.status = AuthStatus.Loading;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.status = AuthStatus.Error;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload;

      if (user) {
        state.userId = user.id;
        state.userName = user.name;
        state.userEmail = user.email;
        state.userToken = user.token!;

        state.status = AuthStatus.Logged;
      }
    });

    builder.addCase(updateUserData.pending, (state, action) => {
      state.updateStatus = UpdateStatus.Loading;
    });

    builder.addCase(updateUserData.rejected, (state, action) => {
      state.updateStatus = UpdateStatus.Error;
    });

    builder.addCase(updateUserData.fulfilled, (state, action) => {
      const user = action.payload;

      if (user) {
        state.userName = user.name;
        state.userEmail = user.email;

        state.updateStatus = UpdateStatus.Success;
      }
    });

    builder.addCase(register.pending, (state) => {
      state.status = AuthStatus.Loading;
    });

    builder.addCase(register.rejected, (state) => {
      state.status = AuthStatus.Error;
    });

    builder.addCase(register.fulfilled, (state) => {
      state.status = AuthStatus.Success;
    });

    builder.addCase(sendLinkToResetPass.pending, (state) => {
      state.status = AuthStatus.Loading;
    });

    builder.addCase(sendLinkToResetPass.rejected, (state) => {
      state.status = AuthStatus.Error;
    });

    builder.addCase(sendLinkToResetPass.fulfilled, (state) => {
      state.status = AuthStatus.Success;
    });

    builder.addCase(updateAuthStatusAfterTime.fulfilled, (state, action) => {
      state.status = action.payload;
    });

    builder.addCase(updateUpdateStatusAfterTime.fulfilled, (state, action) => {
      state.updateStatus = action.payload;
    });
  },
});

export const selectIsLoggedInValue = (state: RootState) =>
  state.auth.status === AuthStatus.Logged;

export const selectAuthStatusValue = (state: RootState) => state.auth.status;
export const selectUpdateStatusValue = (state: RootState) =>
  state.auth.updateStatus;

export const selectUserData = (state: RootState) => {
  return {
    id: state.auth.userId,
    email: state.auth.userEmail,
    name: state.auth.userName,
  };
};

export const { logout, loadAuthState } = authSlice.actions;

export default authSlice.reducer;
