import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NzIconService } from "ng-zorro-antd/icon";
import {
  StepBackwardFill,
  StepForwardFill,
  ClockCircleOutline,
} from "@ant-design/icons-angular/icons";
import { WorkMode } from "./TimeIntervalSelectorComponentTypes";

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
  @Input()
  WorkModes: WorkMode[] = [];
  @Input()
  BeginDate: Date | null = null;
  @Input()
  EndDate: Date | null = null;
  @Output()
  OnChangeBeginDate = new EventEmitter<Date | null>();
  ChangeBeginDate(Date: Date | null) {
    this.OnChangeBeginDate.emit(Date);
  }
  @Output()
  OnChnageEndDate = new EventEmitter<Date | null>();
  ChangeEndDate(Date: Date | null) {
    this.OnChnageEndDate.emit(Date);
  }
}
