import { Polygon } from "maptalks-gl";
import { GeoJson } from "src/Modules/AngularMaptalksGLModule/AngularMaptalksGLModuleTypes";

export default class GeozoneGeometry extends Polygon {
  constructor(GeoJson: GeoJson) {
    super(GeoJson.coordinates);
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }

  GenerateSymbol(): any {}

  override getJSONType(): string {
    return "GeozoneGeometry";
  }
}
