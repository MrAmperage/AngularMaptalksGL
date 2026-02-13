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
import { TimeInterval, WorkMode } from "./TimeIntervalSelectorComponentTypes";
import { DateTime, Interval } from "luxon";

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
  SelectTimeInterval: TimeInterval | null = null;
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

  ChangeSelectInterval(TimeInterval: TimeInterval) {
    if (this.WorkModes.length > 0) {
      const CurrentDate = DateTime.now().toUTC();
      const CurrentShift = this.WorkModes[0].shifts.find((Shift) => {
        const StartShift = CurrentDate.startOf("day").plus({
          milliseconds: Shift.begin_offset.$timedelta,
        });
        const EndShift = CurrentDate.startOf("day").plus({
          milliseconds: Shift.end_offset.$timedelta,
        });
        return Interval.fromDateTimes(StartShift, EndShift).contains(
          CurrentDate,
        );
      });
      if (CurrentShift !== undefined) {
        switch (TimeInterval) {
          case "CurrentShift":
            this.BeginDate = CurrentDate.startOf("day")
              .plus({
                milliseconds: CurrentShift.begin_offset.$timedelta,
              })
              .toJSDate();
            this.EndDate = CurrentDate.startOf("day")
              .plus({
                milliseconds: CurrentShift.end_offset.$timedelta,
              })
              .toJSDate();
            break;
          case "PreviousShift":
            break;
          case "CurrentDay":
            break;
          case "PreviousDay":
            break;
          case "In2Days":
            break;
          case "In3Days":
            break;
        }
      }
    }

    this.SelectTimeInterval = TimeInterval;
  }
}
