import { VectorLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { GeozoneMapToolOptions } from "./GeozoneMapToolComponentTypes";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import PreloadGeozoneDataStoreService from "../../Services/DataStoreServices/PreloadGeozoneDataStoreService/PreloadGeozoneDataStoreService";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";

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
    GeozoneGeometries: [],
  };

  override InitMapTool(): void {
    this.VectorLayer = new VectorLayer(
      "GeozoneMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
    this.PreloadGeozoneDataStoreService.Request().then((Response) => {
      const PreloadGeozones = Response.map((Geozone) => {
        return new GeozoneGeometry(Geozone);
      });
      this.ChangeOptions("GeozoneGeometries", PreloadGeozones);
      this.VectorLayer.addGeometry(this.Options.GeozoneGeometries);
    });
  }
}
