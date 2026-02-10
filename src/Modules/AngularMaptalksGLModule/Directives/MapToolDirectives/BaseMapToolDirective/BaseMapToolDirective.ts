import { Directive, OnDestroy, OnInit } from "@angular/core";
import { MapTool } from "maptalks-gl";
import MapComponent from "../../../Components/MapComponent/MapComponent";

/*Базовая родительская директива для инструментов карты*/
@Directive({
  selector: "BaseMapToolDirective",
})
export default abstract class BaseMapToolDirective<MapToolClass extends MapTool>
  implements OnInit, OnDestroy
{
  constructor(protected MapComponent: MapComponent) {}
  protected MapTool!: MapToolClass;
  /*Переопределить в каждом дочернем слое*/
  abstract InitMapTool(): MapToolClass;

  AddMapTool() {
    this.MapTool.addTo(this.MapComponent.Map);
  }
  /*Удаление слоя с карты*/
  RemoveMapTool() {
    this.MapTool.remove();
  }
  ngOnInit(): void {
    this.MapTool = this.InitMapTool();
    this.AddMapTool();
  }
  ngOnDestroy(): void {
    this.RemoveMapTool();
  }
}
