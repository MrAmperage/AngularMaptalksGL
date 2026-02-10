import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapTool } from "maptalks-gl";
@Component({
  selector: "ToolbarMapToolComponent",
  templateUrl: "ToolbarMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarMapToolComponent extends MapTool {}
