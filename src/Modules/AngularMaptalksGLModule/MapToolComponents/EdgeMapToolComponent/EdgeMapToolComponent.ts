import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MapTool, VectorLayer } from "maptalks-gl";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import EdgeGeometry from "./Geometries/EdgeGeometry/EdgeGeometry";
import { CloseCircleFill } from "@ant-design/icons-angular/icons";
import { NzIconService } from "ng-zorro-antd/icon";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";

@Component({
  selector: "EdgeMapToolComponent",
  templateUrl: "EdgeMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class EdgeMapToolComponent extends MapTool implements OnInit {
  constructor(
    private HttpService: HttpService,
    private MapComponent: MapComponent,
    private NzIconService: NzIconService,
  ) {
    super();
    this.NzIconService.addIcon(CloseCircleFill);
  }
  VectorLayer!: VectorLayer;
  EdgeGeometries: EdgeGeometry[] = [];
  override onAdd(): void {
    this.InitMapTool();
  }
  getEvents(): void {}
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

  InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "EdgeMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
  }
  AddMapTool() {
    this.addTo(this.MapComponent.Map);
  }
  ngOnInit(): void {
    this.AddMapTool();
  }
}
