import { Polygon } from "maptalks-gl";
import { RoadState } from "../../RoadStateMapToolComponentTypes";
import { cellToBoundary } from "h3-js";

/*Еденичный полигон для отображения состояния дороги*/
export default class RoadStateGeometry extends Polygon {
  RoadState: RoadState;
  constructor(RoadState: RoadState) {
    super(cellToBoundary(RoadState.gh));
    this.RoadState = RoadState;
  }
  override getJSONType(): string {
    return "RoadStateGeometry";
  }
}
