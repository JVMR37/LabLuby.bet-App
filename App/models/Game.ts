export default class Game {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  maxNumber: number;
  color: string;
  minCartValue: number;

  constructor(
    id: number,
    type: string,
    description: string,
    range: number,
    price: number,
    maxNumber: number,
    color: string,
    minCartValue: number
  ) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.range = range;
    this.price = price;
    this.maxNumber = maxNumber;
    this.color = color;
    this.minCartValue = minCartValue;
  }
}
