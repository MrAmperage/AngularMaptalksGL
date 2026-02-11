import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { VectorLayer } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";

@Component({
  selector: "RoadStateMapToolComponent",
  templateUrl: "RoadStateMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class RoadStateMapToolComponent extends BaseMapToolDirective {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
  ) {
    super(MapComponentInstance);
  }
  VectorLayer!: VectorLayer;
  override InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "RoadStateMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
  }
}
