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
import MapComponent from "../MapComponent/MapComponent";
import {
  PositionObject,
  PositionString,
} from "../../AngularMaptalksGLModuleTypes";
/*Компонент  панели для карты*/
@Component({
  selector: "PanelComponent",
  templateUrl: "PanelComponent.html",
  styleUrl: "./PanelComponent.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class PanelComponent implements OnInit, OnDestroy {
  constructor(private MapComponent: MapComponent) {}
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
    this.MapComponent.Map.addControl(this.Panel);
  }

  RemovePanel() {
    this.MapComponent.Map.removeControl(this.Panel);
  }
  ngOnInit(): void {
    this.InitPanel();
  }
  ngOnDestroy(): void {
    this.RemovePanel();
  }
}
