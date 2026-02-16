import { RoadState } from "../../RoadStateMapToolComponentTypes";
import { cellToBoundary } from "h3-js";
import GeozoneGeometry from "../../../GeozonesMapToolComponent/Geometries/GeozoneGeometry/GeozoneGeometry";

/*Еденичный полигон для отображения состояния дороги*/
export default class RoadStateGeometry extends GeozoneGeometry {
  VisabilityProcent: number = 100;
  RoadState: RoadState;
  constructor(RoadState: RoadState, VisabilityProcent: number) {
    super({ type: "Polygon", coordinates: cellToBoundary(RoadState.gh) });
    this.RoadState = RoadState;
    this.VisabilityProcent = VisabilityProcent;
  }
  /*Установка процента видимости*/
  SetVisabilityProcent(VisabilityProcent: number) {
    this.VisabilityProcent = VisabilityProcent;
    this.GenerateSymbol();
    return this;
  }
  override getJSONType(): string {
    return "RoadStateGeometry";
  }

  override GenerateSymbol() {}
}
