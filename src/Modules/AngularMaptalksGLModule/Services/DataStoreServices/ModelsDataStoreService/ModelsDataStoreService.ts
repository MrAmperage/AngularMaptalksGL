import { Injectable } from "@angular/core";
import { Model } from "../../../AngularMaptalksGLModuleTypes";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";

@Injectable({ providedIn: "root" })
export default class ModelsDataStoreService extends BaseDataStoreService<
  Model[]
> {
  protected Url: string = "api/enterprise/query/model";
}
