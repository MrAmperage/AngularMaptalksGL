import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Map } from "maptalks-gl";

@Component({
  selector: "MapComponent",
  templateUrl: "MapComponent.html",
  styleUrls: ["./MapComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MapComponent implements OnInit {
  @ViewChild("Container", { static: true })
  Container!: ElementRef<HTMLDivElement>;
  Map!: Map;
  /*Инициализация карты*/
  MapInit() {}
  ngOnInit(): void {
    this.MapInit();
  }
}
