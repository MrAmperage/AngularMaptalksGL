import { Injectable } from "@angular/core";
import { GeozoneInfo } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";

/*DataStore для усеченных геозон*/
@Injectable({ providedIn: "root" })
export default class TruncatedGeozonesDataStoreService extends BaseDataStoreService<
  GeozoneInfo[]
> {
  protected override Url = "api/geo/query/geometry_info";
}
