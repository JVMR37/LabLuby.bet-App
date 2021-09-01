import Game from "./Game";

export default class SavedGame {
  id: number;
  numbers: Array<number>;
  betType: Game;
  createdAt?: Date;
  price: number;

  constructor(
    selectedNumbers: Array<number>,
    typeGame: Game,
    price: number,
    createdAt?: Date | String,
    id?: number
  ) {
    this.id = id ? id : Date.now();

    this.numbers = selectedNumbers;
    this.betType = typeGame;
    this.price = price;

    if (createdAt) {
      this.createdAt = new Date(createdAt as string);
    }
  }

  public static fromJson(json: any): SavedGame {
    return new SavedGame(
      json.numbers,
      json.betType,
      json.price,
      new Date(json.createdAt),
      json.id
    );
  }

  public toJson(): any {
    return {
      numbers: this.numbers,
      price: this.price,
      typeId: this.betType.id,
    };
  }

  getCreatedAt(): String {
    if (this.createdAt) {
      const dd = String(this.createdAt.getUTCDate()).padStart(2, "0");
      const mm = String(this.createdAt.getUTCMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = this.createdAt.getUTCFullYear();
      return dd + "/" + mm + "/" + yyyy;
    } else {
      return "No Date To Show.";
    }
  }
}
