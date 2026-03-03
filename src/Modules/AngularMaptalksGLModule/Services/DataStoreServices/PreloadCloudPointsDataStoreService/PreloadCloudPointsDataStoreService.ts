import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { CloudPoints } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

@Injectable({ providedIn: "root" })
export default class PreloadCloudPointsDataStoreService extends BaseDataStoreService<
  CloudPoints[]
> {
  protected override Url: string = `api/geo/query/cloud?query={"show":true}`;
}
