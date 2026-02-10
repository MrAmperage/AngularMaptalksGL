import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MapTool, VectorLayer } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";

@Component({
  selector: "RoadStateMapToolComponent",
  templateUrl: "RoadStateMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class RoadStateMapToolComponent
  extends MapTool
  implements OnInit
{
  constructor(private MapComponent: MapComponent) {
    super();
  }
  VectorLayer!: VectorLayer;
  InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "RoadStateMapToolVectorLayer",
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
