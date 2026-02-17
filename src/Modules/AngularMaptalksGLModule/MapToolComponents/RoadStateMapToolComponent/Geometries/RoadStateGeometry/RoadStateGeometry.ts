import { RoadState } from "../../RoadStateMapToolComponentTypes";
import { cellToBoundary } from "h3-js";
import GeozoneGeometry from "../../../GeozonesMapToolComponent/Geometries/GeozoneGeometry/GeozoneGeometry";

/*Еденичный полигон для отображения состояния дороги*/
export default class RoadStateGeometry extends GeozoneGeometry {
  /*Дефолтный стиль для геометрии */
  static readonly Symbol = {
    lineColor: "black",
    lineWidth: 0,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  VisabilityProcent: number = 100;
  RoadState: RoadState;
  constructor(RoadState: RoadState, VisabilityProcent: number) {
    super({
      type: "Polygon",
      coordinates: cellToBoundary(RoadState.gh).map((Coordinate) => {
        return [Coordinate[1], Coordinate[0]];
      }),
    });
    this.RoadState = RoadState;
    this.VisabilityProcent = VisabilityProcent;
  }
  /*Установка процента видимости*/
  SetVisabilityProcent(VisabilityProcent: number) {
    this.VisabilityProcent = VisabilityProcent;
    this.setSymbol(this.GenerateSymbol());
    return this;
  }
  override getJSONType(): string {
    return "RoadStateGeometry";
  }

  override GenerateSymbol() {
    return Object.assign(RoadStateGeometry.Symbol, {
      polygonFill: this.RoadState.color,
      polygonOpacity: this.VisabilityProcent / 100,
    });
  }
}
