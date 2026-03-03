import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { GeoFeatureInfo } from "../../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

@Injectable({ providedIn: "root" })
export default class TruncatedGeoFeaturesDataStoreService extends BaseDataStoreService<
  GeoFeatureInfo[]
> {
  protected override Url: string = "api/geo/query/feature_info";
}
