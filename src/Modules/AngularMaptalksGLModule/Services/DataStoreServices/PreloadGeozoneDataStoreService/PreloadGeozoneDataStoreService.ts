import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { Geozone } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

@Injectable({ providedIn: "root" })
export default class PreloadGeozoneDataStoreService extends BaseDataStoreService<
  Geozone[]
> {
  protected Url: string = `api/geo/query/geometry?query={"show":true,"active":true}`;
}
