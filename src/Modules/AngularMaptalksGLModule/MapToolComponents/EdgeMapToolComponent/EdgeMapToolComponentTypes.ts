import { LineStringLayer } from "maptalks-gl";
import {
  DateType,
  GeoFeature,
  UUIDType,
} from "../../AngularMaptalksGLModuleTypes";
import EdgeGeometry from "./Geometries/EdgeGeometry/EdgeGeometry";

export type EdgeMapToolOptions = {
  Id: string;
  LineStringLayer: LineStringLayer;
  EdgeGeometries: EdgeGeometry[];
};

/*Ребро*/
export type Edge = {
  id: UUIDType;
  from_beacon_id: UUIDType;
  organization_id: UUIDType;
  update_time: DateType;
  path: GeoFeature<"LineString">;
};
