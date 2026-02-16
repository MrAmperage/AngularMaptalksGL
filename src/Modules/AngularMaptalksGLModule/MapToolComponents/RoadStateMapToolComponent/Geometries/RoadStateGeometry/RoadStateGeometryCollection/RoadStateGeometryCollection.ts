import { GeometryCollection } from "maptalks-gl";
import { RoadState } from "../../../RoadStateMapToolComponentTypes";
import RoadStateGeometry from "../RoadStateGeometry";

/*Коллекция для геометрий состояния дорог*/
export default class RoadStateGeometryCollection extends GeometryCollection {
  constructor(RoadStates: RoadState[], VisabilityProcent: number) {
    super(
      RoadStates.map((RoadState) => {
        return new RoadStateGeometry(RoadState, VisabilityProcent);
      }),
    );
  }
}
