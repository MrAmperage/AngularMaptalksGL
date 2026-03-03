import { MultiLineString } from "maptalks-gl";
import { Segement } from "../../GeozoneMapToolComponentTypes";
/*Отображение отрезков*/
export default class SegmentGeometry extends MultiLineString {
  Segement: Segement;
  constructor(Segement: Segement) {
    super(
      Segement.features.map((Feature) => {
        return Feature.geometry.coordinates;
      }),
      { id: Segement.id.$uuid },
    );

    this.Segement = Segement;
  }
  override getJSONType(): string {
    return "SegmentGeometry";
  }
}
