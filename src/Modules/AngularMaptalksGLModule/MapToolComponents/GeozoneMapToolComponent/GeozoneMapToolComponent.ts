import { VectorLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { GeozoneMapToolOptions } from "./GeozoneMapToolComponentTypes";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject, Input } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import PreloadGeozonesDataStoreService from "../../Services/DataStoreServices/PreloadGeozonesDataStoreService/PreloadGeozonesDataStoreService";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";
import TruncatedGeozonesDataStoreService from "../../Services/DataStoreServices/TruncatedGeozonesDataStoreService/TruncatedGeozonesDataStoreService";

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
    private PreloadGeozonesDataStoreService: PreloadGeozonesDataStoreService,
    private TruncatedGeozonesDataStoreService: TruncatedGeozonesDataStoreService,
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  @Input()
  IsLoadingPreloadGeozones: boolean = false;
  override Id: string = "GeozoneMapTool";
  VectorLayer!: VectorLayer;
  override Options: GeozoneMapToolOptions = {
    IsShowName: false,
    IsShowCaption: false,
    IsShowDefault: true,
    IsShowActive: true,
    GeozoneGeometries: [],
    GeozonesInfo: [],
  };

  override InitMapTool(): void {
    this.VectorLayer = new VectorLayer(
      "GeozoneMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
    if (this.IsLoadingPreloadGeozones) {
      this.PreloadGeozonesDataStoreService.Request().then((Response) => {
        const PreloadGeozones = Response.map((Geozone) => {
          return new GeozoneGeometry(Geozone);
        });
        this.ChangeOptions("GeozoneGeometries", PreloadGeozones);
        this.VectorLayer.addGeometry(this.Options.GeozoneGeometries);
      });
    }
    this.TruncatedGeozonesDataStoreService.Request().then((Response) => {
      this.ChangeOptions("GeozonesInfo", Response);
    });
  }
}
