import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { WorkMode } from "../../../Components/UIKitComponents/TimeIntervalSelectorComponent/TimeIntervalSelectorComponentTypes";
import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export default class WorkModesDataStoreService extends BaseDataStoreService<
  WorkMode[]
> {
  protected Url: string = "api/enterprise/query/regime";
}
