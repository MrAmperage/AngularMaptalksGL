import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { Point } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

@Injectable({ providedIn: "root" })
export default class PreloadPointsDataStoreService extends BaseDataStoreService<
  Point[]
> {
  protected override Url: string = `api/geo/query/point?query={"show":true}`;
}
