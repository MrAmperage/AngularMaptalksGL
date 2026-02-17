import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "DefaultItemComponent",
  templateUrl: "DefaultItemComponent.html",
  styleUrl: "DefaultItemComponent.css",
  standalone: false,
})
export default class DefaultItemComponent {
  @Input()
  IsChecked: boolean = false;
  @Output()
  OnChangeChecked = new EventEmitter();
  ChangeChecked() {
    this.OnChangeChecked.emit();
  }
}
