import { Directive } from "@angular/core";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import { GLTFLayer } from "maptalks-gl";

@Directive({
  selector: "GLTFLayerDirective",
  standalone: false,
})
export default class GLTFLayerDirective extends BaseLayerDirective<GLTFLayer> {
  override InitLayer(): GLTFLayer {
    return new GLTFLayer(this.Id);
  }
}
