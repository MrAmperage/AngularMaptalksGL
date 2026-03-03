import { Segement } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export default class PreloadSegmentsDataStoreService extends BaseDataStoreService<
  Segement[]
> {
  protected override Url: string = `api/geo/query/segment?query={"show":true}`;
}
