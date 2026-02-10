import { ChangeDetectionStrategy, Component } from "@angular/core";
import BaseIconComponent from "../BaseIconComponent/BaseIconComponent";

@Component({
  selector: "TripIconComponent",
  templateUrl: "TripIconComponent.svg",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TripIconComponent extends BaseIconComponent {}
