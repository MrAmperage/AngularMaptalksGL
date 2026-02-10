import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "TitlePanelComponent",
  templateUrl: "TitlePanelComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TitlePanelComponent {}
