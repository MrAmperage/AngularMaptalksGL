import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "CloseButtonComponent",
  templateUrl: "CloseButtonComponent.html",
  styleUrl: "CloseButtonComponent.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class CloseButtonComponent {}
