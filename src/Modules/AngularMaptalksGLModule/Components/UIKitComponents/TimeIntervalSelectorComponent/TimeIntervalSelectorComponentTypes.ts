import { TimeOffset, UUIDType } from "../../../AngularMaptalksGLModuleTypes";

/*Условие работы */
export type WorkMode = {
  created_at: Date;
  deleted_at: Date | null;
  id: UUIDType;
  name: string;
  organization_id: UUIDType;
  shifts: Shift[];
};

/*Смена*/
export type Shift = {
  begin_offset: TimeOffset;
  end_offset: TimeOffset;
  name: string;
  number: number;
};
