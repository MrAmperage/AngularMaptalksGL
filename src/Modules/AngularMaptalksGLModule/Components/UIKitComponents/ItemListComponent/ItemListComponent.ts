import { Component, ContentChild, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "ItemListComponent",
  templateUrl: "ItemListComponent.html",
  standalone: false,
})
export default class ItemListComponent {
  @Input()
  Items: any[] = [];
  @ContentChild("ItemTemplate")
  ItemTemplate!: TemplateRef<any>;
}
