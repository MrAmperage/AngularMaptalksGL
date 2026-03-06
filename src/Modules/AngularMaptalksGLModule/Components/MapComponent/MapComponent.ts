import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Coordinate, Map } from "maptalks-gl";
import MapService from "../../Services/MapService/MapService";

@Component({
  selector: "MapComponent",
  templateUrl: "MapComponent.html",
  styleUrls: ["./MapComponent.css"],
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class MapComponent implements OnInit {
  constructor(private MapService: MapService) {}
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
  @Input()
  Bearing: number | undefined = undefined;
  @Input()
  Pitch: number | undefined = undefined;
  /*Инициализация карты*/
  MapInit() {
    this.Map = new Map(this.Container.nativeElement, {
      center: this.Center,
      zoom: this.Zoom,
      bearing: this.Bearing,
      pitch: this.Pitch,
    });
    this.MapService.RegisterMap(this.Map);
  }
  ngOnInit(): void {
    this.MapInit();
  }
}
