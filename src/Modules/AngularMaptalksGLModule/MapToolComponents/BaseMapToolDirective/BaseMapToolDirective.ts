import { Directive, OnInit } from "@angular/core";
import { MapTool } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";

@Directive({ selector: "BaseMapToolDirective" })
export default abstract class BaseMapToolDirective
  extends MapTool
  implements OnInit
{
  constructor(protected MapComponent: MapComponent) {
    super();
  }
  getEvents() {}
  AddMapTool() {
    this.addTo(this.MapComponent.Map);
  }
  /*Инициализация инструмента*/
  abstract InitMapTool(): void;
  ngOnInit(): void {
    this.AddMapTool();
  }
}
