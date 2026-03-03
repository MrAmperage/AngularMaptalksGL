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
    this.SelectTimeInterval = null;
    this.OnChangeBeginDate.emit(Date);
  }
  @Output()
  OnChnageEndDate = new EventEmitter<Date | null>();
  ChangeEndDate(Date: Date | null) {
    this.SelectTimeInterval = null;
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
        let BeginDate: DateTime | null = null;
        let EndDate: DateTime | null = null;
        switch (TimeInterval) {
          case "CurrentShift":
            BeginDate = CurrentDate.startOf("day").plus({
              milliseconds: CurrentShift.begin_offset.$timedelta,
            });

            EndDate = null;

            break;
          case "PreviousShift":
            const PreviousShift =
              CurrentShift.number > 1
                ? this.WorkModes[0].shifts[CurrentShift.number - 1]
                : this.WorkModes[0].shifts[this.WorkModes[0].shifts.length - 1];
            BeginDate = CurrentDate.startOf("day").plus({
              milliseconds: PreviousShift.begin_offset.$timedelta,
            });

            EndDate = CurrentDate.startOf("day").plus({
              milliseconds: PreviousShift.end_offset.$timedelta,
            });
            if (CurrentShift.number === 1) {
              BeginDate = BeginDate.minus({ days: 1 });
              EndDate = EndDate.minus({ days: 1 });
            }

            break;
          case "CurrentDay":
            BeginDate = CurrentDate.startOf("day").plus({
              milliseconds: this.WorkModes[0].shifts[0].begin_offset.$timedelta,
            });
            EndDate = null;
            break;
          case "PreviousDay":
            BeginDate = CurrentDate.startOf("day")
              .plus({
                milliseconds:
                  this.WorkModes[0].shifts[0].begin_offset.$timedelta,
              })
              .minus({ days: 1 });

            EndDate = CurrentDate.startOf("day")
              .plus({
                milliseconds:
                  this.WorkModes[0].shifts[this.WorkModes[0].shifts.length - 1]
                    .end_offset.$timedelta,
              })
              .minus({ days: 1 });

            break;
          case "In2Days":
            BeginDate = CurrentDate.startOf("day")
              .plus({
                milliseconds:
                  this.WorkModes[0].shifts[0].begin_offset.$timedelta,
              })
              .minus({ days: 1 });

            EndDate = null;
            break;
          case "In3Days":
            BeginDate = CurrentDate.startOf("day")
              .plus({
                milliseconds:
                  this.WorkModes[0].shifts[0].begin_offset.$timedelta,
              })
              .minus({ days: 2 });

            EndDate = null;
            break;
        }
        this.ChangeBeginDate(BeginDate !== null ? BeginDate.toJSDate() : null);
        this.ChangeEndDate(EndDate != null ? EndDate.toJSDate() : null);
      }
    }

    this.SelectTimeInterval = TimeInterval;
  }
}
