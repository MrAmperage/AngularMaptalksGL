import { Injectable } from "@angular/core";
import { Line } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";

@Injectable({ providedIn: "root" })
export default class PreloadLinesDataStoreService extends BaseDataStoreService<
  Line[]
> {
  protected override Url: string = `api/geo/query/line?query={"show":true}`;
}
