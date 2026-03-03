import { LineString } from "maptalks-gl";
import { GeoFeature } from "../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import { GeoJsonType } from "../../AngularMaptalksGLModuleTypes";

/*Абстрактный класс для отрисовки линий */
export default abstract class BaseLineString extends LineString {
  abstract DefaultSymbol: any;
  constructor(
    GeoFeatures: GeoFeature<"Point", any>[] | GeoFeature<"LineString", any>,
  ) {
    super(BaseLineString.GetCoordinatesByGeoFeatyreType(GeoFeatures));
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }
  static GetCoordinatesByGeoFeatyreType(
    GeoFeature: GeoFeature<"Point", any>[] | GeoFeature<"LineString", any>,
  ) {
    const Type: GeoJsonType = Array.isArray(GeoFeature)
      ? "Point"
      : "LineString";
    switch (Type) {
      case "Point":
        return (GeoFeature as GeoFeature<"Point", any>[]).map((Feature) => {
          return Feature.geometry.coordinates;
        });
      case "LineString":
        return (GeoFeature as GeoFeature<"LineString", any>).geometry
          .coordinates;
    }
  }
  abstract GenerateSymbol(): any;

  abstract override getJSONType(): string;
}
