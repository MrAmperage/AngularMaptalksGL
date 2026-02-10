import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Edge } from "../../MapToolComponents/EdgeMapToolComponent/EdgeMapToolComponentTypes";

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
}
