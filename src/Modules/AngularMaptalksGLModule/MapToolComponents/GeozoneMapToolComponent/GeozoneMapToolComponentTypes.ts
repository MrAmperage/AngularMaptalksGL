import {
  GeoJson,
  GeoJsonType,
  HexColor,
  Meta,
  Organization,
  UUIDType,
} from "../../AngularMaptalksGLModuleTypes";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";
import LineGeometry from "./Geometries/LineGeometry/LineGeometry";
import SegmentGeometry from "./Geometries/SegmentGeometry/SegmentGeometry";
import PointGeometry from "./Geometries/PointGeometry/PointGeometry";
import CloudPointsGeometry from "./Geometries/CloudPointsGeometry/CloudPointsGeometry";
import { LineStringLayer, PointLayer, PolygonLayer } from "maptalks-gl";

export type GeozoneMapToolOptions = {
  GeozoneGeometries: GeozoneGeometry[];
  CloudPointsGeometries: CloudPointsGeometry[];
  SegmentGeometries: SegmentGeometry[];
  LineGeometries: LineGeometry[];
  PointGeometries: PointGeometry[];
  GeozonesInfo: GeozoneInfo[];
  GeoFeaturesInfo: GeoFeatureInfo[];
  TreeGeozones: NzTreeNodeOptions[];
  Organizations: Organization[];
  CheckedKeys: string[];
  SearchInput: string | null;
  IsShowName: boolean;
  IsShowCaption: boolean;
  IsShowDefault: boolean;
  IsShowOnlyActive: boolean;
  PolygonLayer: PolygonLayer;
  PointLayer: PointLayer;
  LineStringLayer: LineStringLayer;
};

export type Line = {
  id: UUIDType;
  style: LineStyle;
  features: GeoFeature<"Point", {}>[];
  properties: LineProperties;
};
export type PointStyle = {
  markerFill: HexColor;
  markerHeight: number;
  polygonFill: HexColor;
};
export type Point = {
  id: UUIDType;
  meta: Meta;
  properties: PointProperties;
  style: PointStyle;
  feature: GeoFeature<"Point", PointGeoJsonProperties>;
};
enum PointSymbolEnum {
  /*Закрашенная */
  Filled = 1,
  /*Пустая внутри */
  EmptyInside = 2,
  /*Белая внутри */
  WhiteInside = 3,
  /*Пустая с точкой внутри*/
  EmptyDotInside = 4,
  /*Белая с точкой внутри*/
  WhiteDotInside = 5,
  /*Крест*/
  Cross = 6,
  /*Знак умножить */
  MultiplySign = 7,
  /*Треугольник закрашенный */
  FilledTriangle = 8,
  /*Белый треугольник */
  WhiteTriangle = 9,
  /*Закрашенный квадрат */
  FilledSquare = 10,
  /*Белый квадрат*/
  WhiteSquare = 11,
}
export type PointGeoJsonProperties = {
  symbol: PointSymbolEnum;
  style: PointStyle;
};
export type PointProperties = { active: boolean; name: string };

export type Segement = {
  id: UUIDType;
  external_id_1: string | null;
  external_id_2: string | null;
  features: GeoFeature<"LineString", {}>[];
  meta: Meta;
  properties: SegemntProperties;
};
export type CloudPoints = {
  id: UUIDType;
  features: GeoFeature<"Point", PointGeoJsonProperties>[];
  meta: Meta;
  organization_id: UUIDType;
  properties: CloudPointsProperties;
};
export type CloudPointsProperties = {
  active: boolean;
  name: string;
};
//TODO Поменять GeoJson и GeoFeature местами
export type GeoFeature<Type extends GeoJsonType, Properties> = {
  geometry: GeoJson<Type>;
  properties: Properties;
};
export type LineStyle = { lineColor: HexColor; lineWidth: number };
export type Geozone = {
  id: UUIDType;
  location: GeoJson<"Polygon">;
  meta: Meta;
  organization_id: UUIDType;
  properties: GeozoneProperties;
  style: GeozoneStyle | null;
  title_properties: GeozoneTitleProperties | null;
  type: GeozoneType;
  work_place_ids: UUIDType;
};
export type LineProperties = {
  active: boolean;
  name: string;
};

export type SegemntProperties = {
  active: boolean;
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
};

export type GeozoneStyle = {
  lineColor: HexColor;
  lineDasharray: [number, number];
  lineWidth: number;
  polygonFill: HexColor;
};

export type GeozoneTitleProperties = {
  azimuth: number;
  location: GeoJson<"Point">;
  show: boolean;
  style: GeozoneTitlePropertiesStyle;
};

export type GeozoneTitlePropertiesStyle = {
  textFill: HexColor;
  textName: string;
  textRotation: number;
  textSize: number;
  textWeight: string;
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

export type GeoFeatureType = "dot" | "cloud" | "line" | "segment";
export type GeozoneInfo = {
  altitude: number;
  holder_id: UUIDType | null;
  id: UUIDType;
  is_active: boolean;
  is_show: boolean;
  name: string;
  organization_id: UUIDType;
  type: GeozoneType;
};

export type GeoFeatureInfo = {
  id: UUIDType;
  is_active: boolean;
  is_show: boolean;
  name: string;
  organization_id: UUIDType;
  type: GeoFeatureType;
};
