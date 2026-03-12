import { Component, Inject } from "@angular/core";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import { CoordinateMapToolOptions } from "./CoordinateMapToolComponentTypes";
@Component({
  selector: "CoordinateMapToolComponent",
  templateUrl: "CoordinateMapToolComponent.html",
  standalone: false,
})
export default class CoordinateMapToolComponent extends BaseMapToolDirective<CoordinateMapToolOptions> {
  constructor(
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
  ) {
    super(MapServiceInstance);
  }
  override Options: CoordinateMapToolOptions = {
    Id: "CoordinateMapTool",
    IsShowCenter: false,
    Latitude: null,
    Longitude: null,
    CoordinatesType: "Local",
  };
  override InitMapTool(): void {}
}
