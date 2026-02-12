/*HEX код цвета*/
export type HexColor = `#${string}`;
/*Размер в пикселях*/
export type PixelSize = `${number}px`;
/*UUID*/
export type UUIDType = { $uuid: string };
/*Тип для дат*/
export type DateType = { $date: number };

/*Позиционирование через объект*/
export type PositionObject = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
};
/*Позиционирование через строку */
export type PositionString = "top-right";

/*GeoJSON*/
export type GeoJson = {
  type: string;
  coordinates: Array<number[]>;
};
