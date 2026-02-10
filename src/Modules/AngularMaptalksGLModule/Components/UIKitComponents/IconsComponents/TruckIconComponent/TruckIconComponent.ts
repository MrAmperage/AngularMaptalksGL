import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseIconDirective from "../BaseIconDirective/BaseIconDirective";

@Component({
  selector: "TruckIconComponent",
  templateUrl: "TruckIconComponent.svg",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TruckIconComponent extends BaseIconDirective {}
