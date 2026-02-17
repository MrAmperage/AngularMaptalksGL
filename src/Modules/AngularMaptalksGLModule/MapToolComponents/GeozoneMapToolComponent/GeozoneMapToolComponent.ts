import { VectorLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { GeozoneMapToolOptions } from "./GeozoneMapToolComponentTypes";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject } from "@angular/core";
import { MapComponent } from "src/public-api";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";

@Component({
  selector: "GeozoneMapToolComponent",
  templateUrl: "GeozoneMapToolComponent.html",
  styleUrl: "GeozoneMapToolComponent.css",
  standalone: false,
})
export default class GeozoneMapToolComponent extends BaseMapToolDirective<GeozoneMapToolOptions> {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  override Id: string = "GeozoneMapTool";
  VectorLayer!: VectorLayer;
  override Options: GeozoneMapToolOptions = {
    IsShowName: false,
    IsShowCaption: false,
    IsShowDefault: true,
    IsShowActive: true,
    GeozoneGeometry: [],
  };

  override InitMapTool(): void {
    this.VectorLayer = new VectorLayer(
      "GeozoneMapToolVectorLayer",
      VectorLayerConfig,
    );
  }
}
