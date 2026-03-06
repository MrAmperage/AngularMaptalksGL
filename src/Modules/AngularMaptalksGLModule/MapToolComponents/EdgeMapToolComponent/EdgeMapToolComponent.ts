import { Component, Inject } from "@angular/core";
import { LineStringLayer } from "maptalks-gl";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import EdgeGeometry from "./Geometries/EdgeGeometry/EdgeGeometry";
import { LayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import MapService from "../../Services/MapService/MapService";
import { EdgeMapToolOptions } from "./EdgeMapToolComponentTypes";

@Component({
  selector: "EdgeMapToolComponent",
  templateUrl: "EdgeMapToolComponent.html",
  standalone: false,
})
export default class EdgeMapToolComponent extends BaseMapToolDirective<EdgeMapToolOptions> {
  constructor(
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
  ) {
    super(MapServiceInstance);
  }
  Id: string = "EdgeMapTool";
  override Options: EdgeMapToolOptions = {
    EdgeGeometries: [],
    LineStringLayer: new LineStringLayer(
      "EdgeMapToolLineStringLayer",
      LayerConfig,
    ),
  };

  /*Отображение ребер*/
  ShowEdges() {
    this.IsLoading = true;
    this.ClearEdges();
    this.HttpService.RequestEdges()
      .then((Response) => {
        const EdgeGeometries = Response.map((Edge) => {
          return new EdgeGeometry(Edge);
        });
        this.UpdateOption({
          EdgeGeometries: EdgeGeometries,
        });
        this.Options.LineStringLayer.addGeometry(this.Options.EdgeGeometries);
      })
      .finally(() => {
        this.IsLoading = false;
      });
  }

  ClearEdges() {
    this.Options.LineStringLayer.removeGeometry(this.Options.EdgeGeometries);
    this.UpdateOption({ EdgeGeometries: [] });
  }

  override InitMapTool() {
    this.MapServiceInstance.Map.addLayer(this.Options.LineStringLayer);
  }
}
