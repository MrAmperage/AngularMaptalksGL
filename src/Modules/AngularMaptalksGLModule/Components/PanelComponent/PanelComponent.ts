import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { control } from "maptalks-gl";
import {
  PositionObject,
  PositionString,
} from "../../AngularMaptalksGLModuleTypes";
import MapService from "../../Services/MapService/MapService";
/*Компонент  панели для карты*/
@Component({
  selector: "PanelComponent",
  templateUrl: "PanelComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class PanelComponent implements OnInit, OnDestroy {
  constructor(private MapService: MapService) {}
  @ViewChild("Panel", { static: true })
  Container!: ElementRef<HTMLDivElement>;
  Panel!: control.Panel;
  @Input()
  Position: PositionObject | PositionString = "top-right";
  @Input()
  Draggable: boolean = true;
  InitPanel() {
    this.Panel = new control.Panel({
      custom: true,
      position: this.Position,
      content: this.Container.nativeElement,
    });
    this.MapService.Map.addControl(this.Panel);
  }

  RemovePanel() {
    this.MapService.Map.removeControl(this.Panel);
  }
  ngOnInit(): void {
    this.InitPanel();
  }
  ngOnDestroy(): void {
    this.RemovePanel();
  }
}
