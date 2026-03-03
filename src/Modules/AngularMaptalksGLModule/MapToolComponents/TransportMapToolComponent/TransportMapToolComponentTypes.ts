import { PointLayer } from "maptalks-gl";
import { UUIDType } from "../../AngularMaptalksGLModuleTypes";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import TransportGeometry from "./Geometries/TransportGeometry/TransportGeometry";
import { NzSelectOptionInterface } from "ng-zorro-antd/select";

export type Transport = { id: UUIDType; name: string; icon: UUIDType | null };
export type TransportMapToolOptions = {
  GroupsOptions: NzSelectOptionInterface[];
  TransportGroupType: TransportGroupType;
  SelectGeometry: TransportGeometry | null;
  PointLayer: PointLayer;
  TransportOptionsTree: NzTreeNodeOptions[];
  TransportOptionsTreeCheckedKeys: TransportOptionsTreeCheckedKey[];
  Transports: Transport[];
  TransportCheckedKeys: string[];
  TransportGeometries: TransportGeometry[];
  SearchInput: string | null;
};
export type TransportOptionsTreeCheckedKey =
  | "AllNameGroup"
  | "ObjectsName"
  | "ObjectsIcon"
  | "Course"
  | "DangerZoneRadius"
  | "Status"
  | "Division";
export type TransportStateTicket = {
  ticket: string;
};
export type TransportGroupType =
  | "All"
  | "Type"
  | "Model"
  | "ModelCategory"
  | "Type+Model"
  | "Division+Type";
export type TransportState = {
  course: number;
  delay: number;
  location: [number, number, number];
  link: number;
  object_id: string;
  speed: number;
  time: number;
  receive_time: number;
  straight_state: TransportStateStraight | null;
  archive_state: TransportStateStraight | null;
  info: TransportStateInfo;
  status: TransportStateStatus | null;
};
export type TransportStateStatus = {
  interval_type_name: string;
  is_loaded: boolean | null;
  state_name: string;
  time: number;
};
export type TransportStateInfo = { fuel?: [number | null]; weight?: number };
export type TransportStateStraight = {
  time: number;
  receive_time: number;
  location: [number, number, number];
  course: number;
  speed: number;
};
