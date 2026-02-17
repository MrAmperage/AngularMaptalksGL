import { GeometryCollection } from "maptalks-gl";
import { RoadState } from "../../../RoadStateMapToolComponentTypes";
import RoadStateGeometry from "../RoadStateGeometry";

/*Коллекция для геометрий состояния дорог*/
export default class RoadStateGeometryCollection extends GeometryCollection {
  BeginDate: Date;
  EndDate: Date | null = null;
  constructor(
    RoadStates: RoadState[],
    BeginDate: Date | null,
    EndDate: Date | null,
    VisabilityProcent: number,
  ) {
    super(
      RoadStates.map((RoadState) => {
        const RoadStateObject = new RoadStateGeometry(
          RoadState,
          VisabilityProcent,
        );
        RoadStateObject.setSymbol(RoadStateObject.GenerateSymbol());
        return RoadStateObject;
      }),
    );

    this.BeginDate = BeginDate !== null ? BeginDate : new Date();
    this.EndDate = EndDate !== null ? EndDate : new Date();
  }
}
