import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "TitlePanelComponent",
  templateUrl: "TitlePanelComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TitlePanelComponent {
  @Output()
  OnClose = new EventEmitter();
  Close() {
    this.OnClose.emit();
  }
}
