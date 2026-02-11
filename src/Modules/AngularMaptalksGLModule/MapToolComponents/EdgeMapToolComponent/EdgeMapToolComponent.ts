import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { VectorLayer } from "maptalks-gl";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import EdgeGeometry from "./Geometries/EdgeGeometry/EdgeGeometry";
import { CloseCircleFill } from "@ant-design/icons-angular/icons";
import { NzIconService } from "ng-zorro-antd/icon";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";

@Component({
  selector: "EdgeMapToolComponent",
  templateUrl: "EdgeMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class EdgeMapToolComponent extends BaseMapToolDirective {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
    private HttpService: HttpService,
    private NzIconService: NzIconService,
  ) {
    super(MapComponentInstance);
    this.NzIconService.addIcon(CloseCircleFill);
  }
  VectorLayer!: VectorLayer;
  EdgeGeometries: EdgeGeometry[] = [];
  override onAdd(): void {
    this.InitMapTool();
  }
  /*Отображение ребер*/
  ShowEdges() {
    this.ClearEdges();
    this.HttpService.RequestEdges().then((Response) => {
      this.EdgeGeometries = Response.map((Edge) => {
        return new EdgeGeometry(Edge);
      });
      this.VectorLayer.addGeometry(this.EdgeGeometries);
    });
  }

  ClearEdges() {
    this.VectorLayer.removeGeometry(this.EdgeGeometries);
    this.EdgeGeometries = [];
  }

  override InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "EdgeMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
  }
}
