import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Coordinate, Map } from "maptalks-gl";

@Component({
  selector: "MapComponent",
  templateUrl: "MapComponent.html",
  styleUrls: ["./MapComponent.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class MapComponent implements OnInit {
  /*Контейнер для карты */
  @ViewChild("Container", { static: true })
  Container!: ElementRef<HTMLDivElement>;
  /*Объект карты */
  Map!: Map;
  /*Центр карты при инициализации*/
  @Input()
  Center: Array<number> | Coordinate = [0, 0];
  /*Зум карты при инициализации*/
  @Input()
  Zoom: number = 0;
  /*Инициализация карты*/
  MapInit() {
    this.Map = new Map(this.Container.nativeElement, {
      center: this.Center,
      zoom: this.Zoom,
    });
  }
  ngOnInit(): void {
    this.MapInit();
  }
}
