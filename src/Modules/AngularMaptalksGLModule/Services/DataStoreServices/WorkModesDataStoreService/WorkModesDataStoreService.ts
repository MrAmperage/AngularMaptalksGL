import BaseDataStoreService from "../BaseDataStoreService/BaseDataStoreService";
import { WorkMode } from "../../../Components/UIKitComponents/TimeIntervalSelectorComponent/TimeIntervalSelectorComponentTypes";
export default class WorkModesDataStoreService extends BaseDataStoreService<
  WorkMode[]
> {
  protected Url: string = "api/enterprise/query/regime";
}
