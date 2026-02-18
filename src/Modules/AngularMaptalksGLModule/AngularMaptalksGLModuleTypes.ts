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

/*Категория модели*/
export type ModelCategory = {
  name: string;
  id: UUIDType;
};
/*Модель*/
export type Model = {
  name: string;
  id: UUIDType;
  group_id: UUIDType;
};
/*Контейнер для ответа POST запроса*/
export type PostResponse<Data> = {
  result: Data;
  ok: boolean;
  isArray: boolean;
};

/*Временной отступ*/
export type TimeOffset = { $timedelta: number };

/*Meta информация*/
export type Meta = {
  created_at: DateType;
  created_user_id: UUIDType | null;
  deleted_at: DateType | null;
  modified_at: DateType | null;
  modified_user_id: UUIDType | null;
};
