/*Базовый тип для опций плагинов*/
export type BaseOptionsType = {
  Id: string;
};
export type OptionsApi<ApiType> = {
  Api: ApiType;
};
