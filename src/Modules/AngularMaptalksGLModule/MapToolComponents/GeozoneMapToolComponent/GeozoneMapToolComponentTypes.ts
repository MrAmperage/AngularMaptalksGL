import {
  GeoJson,
  HexColor,
  Meta,
  UUIDType,
} from "../../AngularMaptalksGLModuleTypes";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";

export type GeozoneMapToolOptions = {
  IsShowName: boolean;
  IsShowCaption: boolean;
  IsShowDefault: boolean;
  IsShowActive: boolean;
  GeozoneGeometry: GeozoneGeometry[];
};

export type Geozone = {
  id: UUIDType;
  location: GeoJson;
  meta: Meta;
  organization_id: UUIDType;
  properties: GeozoneProperties;
};

export type GeozoneProperties = {
  active: boolean;
  altitude: number;
  description: string;
  external_id_1: string | null;
  external_id_2: string | null;
  holder_id: UUIDType | null;
  name: string;
  order_num: number;
  show: boolean;
  style: GeozoneStyle;
};

export type GeozoneStyle = {
  lineColor: HexColor;
  lineDasharray: [number, number];
  lineWidth: number;
  polygonFill: HexColor;
  title_properties: GeozoneTitleProperties;
  type: GeozoneType;
  work_place_ids: UUIDType;
};

export type GeozoneTitleProperties = {
  azimuth: number;
  location: GeoJson;
  show: boolean;
  style: GeozoneTitlePropertiesStyle;
};

export type GeozoneTitlePropertiesStyle = {
  textFill: HexColor;
  textName: string;
  textRotation: number;
  textSize: number;
  textWeight: number;
};
export type GeozoneType =
  | "DrillingBlock"
  | "Unload"
  | "StaticGeometry"
  | "RestrictedGeometry"
  | "TypedStaticObject"
  | "BlastBlock"
  | "DrillingBlockContour"
  | "BlastBlockContour"
  | "DrillGrid"
  | "BlastGrid"
  | "BlastUserContour"
  | "DrillingRockContour";
