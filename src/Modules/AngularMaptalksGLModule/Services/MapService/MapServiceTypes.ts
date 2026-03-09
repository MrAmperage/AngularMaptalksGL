import { OptionsApi } from "../../MapToolComponents/BaseMapToolDirective/BaseMapToolDirectiveTypes";
import {
  RoadStateMapToolOptions,
  RoadStateMapToolOptionsApi,
} from "../../MapToolComponents/RoadStateMapToolComponent/RoadStateMapToolComponentTypes";

export type MapToolListType = {
  RoadStateMapTool: RoadStateMapToolOptions &
    OptionsApi<RoadStateMapToolOptionsApi>;
};
