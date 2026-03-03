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
  CloudPoints,
  Geozone,
  GeozoneType,
  Line,
  Point,
  Segement,
} from "../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";
import {
  TransportState,
  TransportStateTicket,
} from "../../MapToolComponents/TransportMapToolComponent/TransportMapToolComponentTypes";

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
  RequestLinesByOptions(LineIds: string[]) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<Line[]>>("api/geo/query/line", {
        id: LineIds,
      }),
    );
  }
  RequestSegmentsByOptions(SegmentIds: string[]) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<Segement[]>>("api/geo/query/segment", {
        id: SegmentIds,
      }),
    );
  }
  RequestTransportStateTicket() {
    return lastValueFrom(
      this.HttpClient.get<TransportStateTicket>("api/auth/ticket"),
    );
  }
  RequestTransportState() {
    return lastValueFrom(
      this.HttpClient.get<TransportState[]>(`/api/diag/state`),
    );
  }

  SubscribeTransportStateSource(
    Ticket: string,
    Callback: (TransportState: any) => void,
    IntervalTimer: number,
  ) {
    clearInterval(IntervalTimer);

    let EventSourceObject = new EventSource(
      `api/diag/telemetry?ticket=${Ticket}`,
    );
    EventSourceObject.addEventListener("telemetry", (Event) => {
      Callback(JSON.parse(Event.data));
    });
    EventSourceObject.onerror = (Error) => {
      clearInterval(IntervalTimer);
      IntervalTimer = setInterval(() => {
        this.RequestTransportStateTicket().then((Ticket) => {
          EventSourceObject = this.SubscribeTransportStateSource(
            Ticket.ticket,
            Callback,
            IntervalTimer,
          );
        });
      }, 5000);
    };
    EventSourceObject.onopen = () => {
      clearInterval(IntervalTimer);
    };

    return EventSourceObject;
  }
  RequestCloudsPointsByOptions(CloudPointIds: string[]) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<CloudPoints[]>>("api/geo/query/cloud", {
        id: CloudPointIds,
      }),
    );
  }
  RequestPointsByOptions(PointIds: string[]) {
    return lastValueFrom(
      this.HttpClient.post<PostResponse<Point[]>>("api/geo/query/point", {
        id: PointIds,
      }),
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
