import { Injectable } from "@angular/core";
import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { Organization } from "../../../AngularMaptalksGLModuleTypes";

/*DataStore для организаций доступных пользователю*/
@Injectable({ providedIn: "root" })
export default class UserEnterprisesDataStoreService extends BaseDataStoreService<
  Organization[]
> {
  protected override Url = "api/enterprise/query/user_enterprise";
}
