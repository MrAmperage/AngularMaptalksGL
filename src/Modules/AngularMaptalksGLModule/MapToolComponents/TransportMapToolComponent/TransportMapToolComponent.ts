import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapTool, VectorLayer } from "maptalks-gl";

@Component({
  selector: "TransportMapToolComponent",
  templateUrl: "TransportMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TransportMapToolComponent extends MapTool {
  VectorLayer!: VectorLayer;
  onAdd(): void {
    this.InitMapTool();
  }
  InitMapTool() {
    this.VectorLayer = new VectorLayer("TransportMapToolVectorLayer");
  }
}
