import User from "../models/User";
import ApiDatasource from "./apiDatasource";

export const loginInAPI = async (email: string, password: string) => {
  return new Promise<{ data: User } | Error>(async (resolve) => {
    var apiUtils = ApiDatasource.Instance;
    apiUtils.Axios.post("/sessions", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);

        apiUtils.setToken(response.data.token);

        resolve({
          data: User.fromJSON(response!.data),
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          resolve(Error(error.response.error));
        }
      });
  });
};

export const registerUserInDB = async (
  name: string,
  email: string,
  password: string
) => {
  return new Promise<{ data: User } | Error>(async (resolve) => {
    var apiUtils = ApiDatasource.Instance;
    apiUtils.Axios.post("/users", {
      name: name,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);

        resolve({
          data: User.fromJSON(response!.data),
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          resolve(Error(error.response.error));
        }
      });
  });
};

export const updateUserDataInDB = async (
  userId: string,
  name: string,
  email: string
) => {
  return new Promise<{ data: User } | Error>(async (resolve) => {
    var apiUtils = ApiDatasource.Instance;
    apiUtils.Axios.put(`/users/${userId}`, {
      name: name,
      email: email,
    })
      .then((response) => {
        console.log(response);

        resolve({
          data: User.fromJSON(response!.data),
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          resolve(Error(error.response.error));
        }
      });
  });
};

export const requestPasswordChange = async (email: string) => {
  return new Promise<{ data: User } | Error>(async (resolve) => {
    var apiUtils = ApiDatasource.Instance;
    apiUtils.Axios.post("/passwords", {
      email: email,
      redirect_url: "http://localhost:3000/update-password",
    })
      .then((response) => {
        console.log(response);

        apiUtils.setToken(response.data.token);

        resolve({
          data: User.fromJSON(response!.data),
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          resolve(Error(error.response.error));
        }
      });
  });
};

export const sendNewPassword = async (
  token: string,
  password: string,
  password_confirmation: string
) => {
  return new Promise<{ data: User } | Error>(async (resolve) => {
    var apiUtils = ApiDatasource.Instance;

    apiUtils.Axios.put("/passwords", {
      token,
      password,
      password_confirmation,
    })
      .then((response) => {
        console.log(response);

        apiUtils.setToken(response.data.token);

        resolve({
          data: User.fromJSON(response!.data),
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          resolve(Error(error.response.error));
        }
      });
  });
};
