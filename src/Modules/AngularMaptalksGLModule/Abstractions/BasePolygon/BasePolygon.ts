import { Polygon } from "maptalks-gl";
import { GeoJson } from "../../AngularMaptalksGLModuleTypes";
/*Абстрактный класс для отображения полигонов */
export default abstract class BasePolygon extends Polygon {
  abstract DefaultSymbol: any;
  constructor(GeoJson: GeoJson<"Polygon">) {
    super(GeoJson.coordinates);
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }

  abstract GenerateSymbol(): any;

  abstract override getJSONType(): string;
}
