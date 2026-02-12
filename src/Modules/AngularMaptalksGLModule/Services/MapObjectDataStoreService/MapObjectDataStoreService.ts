import { Injectable } from "@angular/core";
import { Transport } from "../../MapToolComponents/TransportMapToolComponent/TransportMapToolComponentTypes";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";

@Injectable({ providedIn: "root" })
export default class MapObjectDataStoreService extends BaseDataStoreService<
  Transport[]
> {
  protected Url: string = "api/enterprise/query/map_object";
}
