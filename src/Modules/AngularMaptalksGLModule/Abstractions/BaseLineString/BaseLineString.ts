import { LineString } from "maptalks-gl";
import { GeoFeature, GeoJson } from "../../AngularMaptalksGLModuleTypes";
import { LineStringOptionsType } from "maptalks/dist/geometry/LineString";

/*Абстрактный класс для отрисовки линий */
export default abstract class BaseLineString extends LineString {
  constructor(
    GeoFeatures:
      | GeoJson<"Point", any>[]
      | GeoJson<"LineString", any>
      | GeoFeature<"Point">[]
      | GeoFeature<"LineString">,
    Options?: LineStringOptionsType,
  ) {
    super(BaseLineString.GetCoordinatesByGeoFeatyreType(GeoFeatures), Options);
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }

  static GetCoordinatesByGeoFeatyreType(
    GeoData:
      | GeoJson<"Point", any>[]
      | GeoJson<"LineString", any>
      | GeoFeature<"Point">[]
      | GeoFeature<"LineString">,
  ) {
    switch (true) {
      case Array.isArray(GeoData) &&
        GeoData.some((GeoObject) => {
          return "geometry" in GeoObject;
        }):
        return (GeoData as GeoJson<"Point", any>[]).map((Feature) => {
          return Feature.geometry.coordinates;
        });
      case !Array.isArray(GeoData) && !("coordinates" in GeoData):
        return (GeoData as GeoJson<"LineString", any>).geometry.coordinates;
      case Array.isArray(GeoData) &&
        GeoData.some((GeoObject) => {
          return "coordinates" in GeoObject;
        }):
        return (GeoData as GeoFeature<"Point">[]).map((GeoObject) => {
          return [GeoObject.coordinates[0], GeoObject.coordinates[1]];
        });
      case !Array.isArray(GeoData) && "coordinates" in GeoData:
        return (GeoData as GeoFeature<"LineString">).coordinates;
      default:
        return [];
    }
  }
  abstract GenerateSymbol(): any;

  abstract override getJSONType(): string;
}
