import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NzIconService } from "ng-zorro-antd/icon";
import {
  StepBackwardFill,
  StepForwardFill,
  ClockCircleOutline,
} from "@ant-design/icons-angular/icons";

@Component({
  selector: "TimeIntervalSelectorComponent",
  templateUrl: "TimeIntervalSelectorComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TimeIntervalSelectorComponent {
  constructor(private NzIconService: NzIconService) {
    this.NzIconService.addIcon(
      StepBackwardFill,
      StepForwardFill,
      ClockCircleOutline,
    );
  }
}
