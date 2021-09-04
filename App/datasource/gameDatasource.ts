import { AxiosResponse } from "axios";
import Game from "../models/Game";
import SavedGame from "../models/SavedGame";
import ApiDatasource from "./apiDatasource";
import PaginationMetadata from "../models/PaginationMetadata";

export const fetchGames = async () => {
  return new Promise<{ data: Game[] }>((resolve, reject) => {
    ApiDatasource.Instance.Axios.get<Game[]>("/types")
      .then((response) => {
        console.log(response.data);
        resolve({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  }).catch((error) => {
    return Error(error.message);
  });
};

export const fetchSavedBets = async (
  page: number = 1,
  filter?: Array<string>
) => {
  return new Promise<{ data: SavedGame[]; meta: PaginationMetadata }>(
    (resolve, reject) => {
      let url: string = `/bets?page=${page}`;

      if (filter && filter.length > 0) {
        url += filter.reduce(
          (acc, currentFilter) =>
            acc === "&"
              ? acc + "filter[]=" + currentFilter
              : acc + "&filter[]=" + currentFilter,
          "&"
        );
      }
      console.log(url);

      ApiDatasource.Instance.Axios.get(url)
        .then((response) => {
          console.log(response.data);
          const responseData = response.data.data.map((betsJson: any) =>
            SavedGame.fromJson(betsJson)
          );
          resolve({
            data: responseData,
            meta: PaginationMetadata.fromJson(response.data.meta),
          });
        })
        .catch((error) => {
          if (error.messages) {
            console.log(error.messages);
          } else {
            console.log(error);
          }
          reject(error);
        });
    }
  ).catch((error) => {
    return Error(error.message);
  });
};

export const saveBetsInDB = async (
  bets: SavedGame[]
): Promise<AxiosResponse | Error> => {
  return new Promise<AxiosResponse | Error>((resolve, reject) => {
    ApiDatasource.Instance.Axios.post("/bets", {
      bets: bets.map((bet) => bet.toJson()),
    })
      .then((response) => {
        console.log(response.data);
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  }).catch((error) => {
    return Error(error.message);
  });
};
