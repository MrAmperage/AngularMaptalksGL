import { Geometry, VectorLayer } from "maptalks-gl";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import { Directive, Input } from "@angular/core";
/*Директива для векторного слоя*/
@Directive({
  selector: "VectorLayerDirective",
})
export default class VectorLayerDirective extends BaseLayerDirective<VectorLayer> {
  /*Геометрии отображаемые на слое*/
  @Input()
  Geometries: Geometry[] = [];
  InitLayer(): VectorLayer {
    return new VectorLayer(this.Id, this.Geometries);
  }
}
