import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { HexColor, PixelSize } from "../../../../AngularMaptalksGLModuleTypes";
@Component({
  selector: "BaseIconComponent",
  template: "",
  styleUrl: "BaseIconComponent.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default abstract class BaseIconComponent {
  @Input()
  Height: PixelSize = "20px";
  @Input()
  Width: PixelSize = "20px";
  @Input()
  Fill: HexColor = "#ffffff";
  @Input()
  Stroke: HexColor = "#ffffff";
}
