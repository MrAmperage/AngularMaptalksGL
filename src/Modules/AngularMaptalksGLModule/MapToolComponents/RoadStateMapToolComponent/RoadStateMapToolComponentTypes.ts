import { H3Index } from "h3-js";
import { HexColor } from "../../AngularMaptalksGLModuleTypes";

/*Опции инструмента*/
export type RoadStateMapToolOptions = {
  ModelCategoryIds: string[];
  ModelsIds: string[];
  TruckIds: string[];
  PassesCount: number | null;
  VisabilityProcent: number | null;
  IsLoaded: boolean;
  Resolution: number | null;
  BeginDate: Date | null;
  EndDate: Date | null;
};
/*Состояние дорог*/

export type RoadState = {
  color: HexColor;
  count: number;
  gh: H3Index;
  speed: number;
};
