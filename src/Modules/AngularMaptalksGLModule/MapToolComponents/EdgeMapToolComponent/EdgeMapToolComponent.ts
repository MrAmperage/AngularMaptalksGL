import { Component, Inject } from "@angular/core";
import { LineStringLayer } from "maptalks-gl";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import EdgeGeometry from "./Geometries/EdgeGeometry/EdgeGeometry";
import { LayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import MapService from "../../Services/MapService/MapService";

@Component({
  selector: "EdgeMapToolComponent",
  templateUrl: "EdgeMapToolComponent.html",
  standalone: false,
})
export default class EdgeMapToolComponent extends BaseMapToolDirective<undefined> {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  Id: string = "EdgeMapTool";
  Options: undefined;
  LineStringLayer!: LineStringLayer;
  EdgeGeometries: EdgeGeometry[] = [];

  /*Отображение ребер*/
  ShowEdges() {
    this.IsLoading = true;
    this.ClearEdges();
    this.HttpService.RequestEdges()
      .then((Response) => {
        this.EdgeGeometries = Response.map((Edge) => {
          return new EdgeGeometry(Edge);
        });
        this.LineStringLayer.addGeometry(this.EdgeGeometries);
      })
      .finally(() => {
        this.IsLoading = false;
      });
  }

  ClearEdges() {
    this.LineStringLayer.removeGeometry(this.EdgeGeometries);
    this.EdgeGeometries = [];
  }

  override InitMapTool() {
    this.LineStringLayer = new LineStringLayer(
      "EdgeMapToolLineStringLayer",
      LayerConfig,
    );
    this.MapComponent.Map.addLayer(this.LineStringLayer);
  }
}
