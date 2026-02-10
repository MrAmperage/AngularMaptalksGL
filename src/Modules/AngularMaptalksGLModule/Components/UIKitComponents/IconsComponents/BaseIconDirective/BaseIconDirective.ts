import { Directive, Input } from "@angular/core";
import { HexColor, PixelSize } from "../../../../AngularMaptalksGLModuleTypes";
@Directive({ selector: "BaseIconDirective" })
export default abstract class BaseIconDirective {
  @Input()
  Height: PixelSize = "20px";
  @Input()
  Width: PixelSize = "20px";
  @Input()
  Fill: HexColor = "#ffffff";
  @Input()
  Stroke: HexColor = "#ffffff";
}
