import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ClearOutline } from "@ant-design/icons-angular/icons";
import { NzIconService } from "ng-zorro-antd/icon";

@Component({
  selector: "ClearButtonComponent",
  templateUrl: "ClearButtonComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class ClearButtonComponent {
  constructor(private NzIconService: NzIconService) {
    this.NzIconService.addIcon(ClearOutline);
  }
}
