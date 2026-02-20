import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Edge } from "../../MapToolComponents/EdgeMapToolComponent/EdgeMapToolComponentTypes";
import {
  RoadState,
  RoadStateMapToolOptions,
} from "../../MapToolComponents/RoadStateMapToolComponent/RoadStateMapToolComponentTypes";
import { PostResponse } from "../../AngularMaptalksGLModuleTypes";
import {
  Geozone,
  GeozoneType,
} from "../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

/*Класс с запросами для карты и инструментов*/
@Injectable({ providedIn: "root" })
export default class HttpService {
  constructor(private HttpClient: HttpClient) {}
  /*Запрос ребер*/
  RequestEdges() {
    return lastValueFrom(
      this.HttpClient.get<Edge[]>("api/geo/query/beacon_path"),
    );
  }
  /*Запрос состояния дорог*/
  RequestRoadState(Options: RoadStateMapToolOptions) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<RoadState[]>>(
        "api/opm/query/truck_speed_stat",
        {
          interval: {
            begin:
              Options.BeginDate !== null ? Options.BeginDate.getTime() : null,
            end: Options.EndDate !== null ? Options.EndDate.getTime() : null,
          },
          is_loaded: Options.IsLoaded,
          count_gte: Options.PassesCount,
          model_ids: Options.ModelsIds,
          object_ids: Options.TruckIds,
          resolution: Options.Resolution,
        },
      ),
    );
  }
  RequestGeozonesByOptions(
    GeometryIDs?: string[],
    GeometryType?: GeozoneType[],
    HolderId?: string,
    IsShow?: boolean,
    IsActive?: boolean,
    OrganizationId?: string,
  ) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<Geozone[]>>("api/geo/query/geometry", {
        active: IsActive,
        geometry_id: GeometryIDs,
        geometry_type: GeometryType,
        holder_id: HolderId,
        organization_id: OrganizationId,
        show: IsShow,
      }),
    );
  }
}
