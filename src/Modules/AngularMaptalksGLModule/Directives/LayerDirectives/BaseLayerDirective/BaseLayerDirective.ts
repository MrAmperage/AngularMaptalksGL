import { Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { Layer } from "maptalks-gl";
import MapComponent from "../../../Components/MapComponent/MapComponent";

/*Базовый родительский слой для наследования другими слоями*/
@Directive({
  selector: "BaseLayerDirective",
})
export default abstract class BaseLayerDirective<LayerClass extends Layer>
  implements OnInit, OnDestroy
{
  constructor(protected MapComponent: MapComponent) {}
  /*Id слоя*/
  @Input({ required: true })
  Id!: string;
  /*Объект слоя*/
  protected Layer!: LayerClass;
  /*Переопределить в каждом дочернем слое*/
  abstract InitLayer(): LayerClass;
  /*Добавление слоя на карту*/
  AddLayer() {
    this.MapComponent.Map.addLayer(this.Layer);
  }
  /*Удаление слоя с карты*/
  RemoveLayer() {
    this.MapComponent.Map.removeLayer(this.Layer);
  }

  ngOnInit(): void {
    this.Layer = this.InitLayer();
    this.AddLayer();
  }
  ngOnDestroy(): void {
    this.RemoveLayer();
  }
}
