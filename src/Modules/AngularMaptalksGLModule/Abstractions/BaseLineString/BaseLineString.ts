import { LineString } from "maptalks-gl";
import { GeoJson } from "../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import { GeoFeatureType } from "../../AngularMaptalksGLModuleTypes";

/*Абстрактный класс для отрисовки линий */
export default abstract class BaseLineString extends LineString {
  abstract DefaultSymbol: any;
  constructor(
    GeoFeatures: GeoJson<"Point", any>[] | GeoJson<"LineString", any>,
  ) {
    super(BaseLineString.GetCoordinatesByGeoFeatyreType(GeoFeatures));
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }
  static GetCoordinatesByGeoFeatyreType(
    GeoFeature: GeoJson<"Point", any>[] | GeoJson<"LineString", any>,
  ) {
    const Type: GeoFeatureType = Array.isArray(GeoFeature)
      ? "Point"
      : "LineString";
    switch (Type) {
      case "Point":
        return (GeoFeature as GeoJson<"Point", any>[]).map((Feature) => {
          return Feature.geometry.coordinates;
        });
      case "LineString":
        return (GeoFeature as GeoJson<"LineString", any>).geometry.coordinates;
    }
  }
  abstract GenerateSymbol(): any;

  abstract override getJSONType(): string;
}
