import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapTool } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
@Component({
  selector: "ToolbarMapToolComponent",
  templateUrl: "ToolbarMapToolComponent.html",
  styleUrl: "ToolbarMapToolComponent.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class ToolbarMapToolComponent extends MapTool {
  constructor(private MapComponent: MapComponent) {
    super();
  }
  AddMapTool() {
    this.addTo(this.MapComponent.Map);
  }
  ngOnInit(): void {
    this.AddMapTool();
  }
}
