import { TileLayer } from "maptalks-gl";
import BaseLayerDirective from "../BaseLayerDirective/BaseLayerDirective";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "TileLayerDirective",
  standalone: false,
})
export default class TileLayerDirective extends BaseLayerDirective<TileLayer> {
  @Input({ required: true })
  UrlTemplate!: string | (() => string);
  @Input()
  TileSize: [number, number] | number = [256, 256];
  InitLayer(): TileLayer {
    return new TileLayer(this.Id, {
      urlTemplate: this.UrlTemplate,
      tileSize: this.TileSize,
    });
  }
}
