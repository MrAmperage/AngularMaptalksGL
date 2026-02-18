import { VectorLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { Geozone, GeozoneMapToolOptions } from "./GeozoneMapToolComponentTypes";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import PreloadGeozoneDataStoreService from "../../Services/DataStoreServices/PreloadGeozoneDataStoreService/PreloadGeozoneDataStoreService";

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
    private PreloadGeozoneDataStoreService: PreloadGeozoneDataStoreService,
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
  PreloadGeozones: Geozone[] = [];

  override InitMapTool(): void {
    this.VectorLayer = new VectorLayer(
      "GeozoneMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.PreloadGeozoneDataStoreService.Request().then((Response) => {
      this.PreloadGeozones = Response;
      console.log(this.PreloadGeozones);
    });
  }
}
