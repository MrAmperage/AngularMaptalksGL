import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { ModelCategory } from "../../../AngularMaptalksGLModuleTypes";

@Injectable({ providedIn: "root" })
export default class ModelCategoryDataStoreService extends BaseDataStoreService<
  ModelCategory[]
> {
  protected Url: string = "api/enterprise/query/model_group";
}
