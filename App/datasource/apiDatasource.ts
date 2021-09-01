import { AxiosInstance } from "axios";

const axios = require("axios").default;

export default class ApiDatasource {
  private static _instance: ApiDatasource;

  public baseURL = "http://192.168.1.10:3333";
  public token?: string;

  private constructor() {
    axios.defaults.baseURL = this.baseURL;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public get Axios(): AxiosInstance {
    return axios;
  }

  public setToken(token: string) {
    this.token = token;
    axios.defaults.headers.common["Authorization"] = "bearer " + this.token;
  }

  public clearToken() {
    axios.defaults.headers.common["Authorization"] = null;
  }
}
