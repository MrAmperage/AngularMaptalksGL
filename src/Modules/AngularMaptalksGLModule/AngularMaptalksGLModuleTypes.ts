/*HEX код цвета*/
export type HexColor = `#${string}`;
/*Размер в пикселях*/
export type PixelSize = `${number}px`;
/*UUID*/
export type UUIDType = { $uuid: string };
/*Тип для дат*/
export type DateType = { $date: number };

/*Пути объекта*/
export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${K & string}` | `${K & string}.${Paths<T[K]> & string}`;
    }[keyof T]
  : never;

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
