import {
  DateType,
  GeoJson,
  UUIDType,
} from "../../AngularMaptalksGLModuleTypes";

/*Ребро*/
export type Edge = {
  id: UUIDType;
  from_beacon_id: UUIDType;
  organization_id: UUIDType;
  update_time: DateType;
  path: GeoJson;
};
