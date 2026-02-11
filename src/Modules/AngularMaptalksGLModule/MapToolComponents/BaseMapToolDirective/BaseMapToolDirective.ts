import { Directive, OnInit } from "@angular/core";
import { MapTool } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import MapService from "../../Services/MapService/MapService";

@Directive({ selector: "BaseMapToolDirective" })
export default abstract class BaseMapToolDirective<OptionsType>
  extends MapTool
  implements OnInit
{
  constructor(
    protected MapComponent: MapComponent,
    private MapService: MapService,
  ) {
    super();
  }
  abstract Id: string;
  abstract Options: OptionsType;
  Register() {
    this.MapService.RegisterPlugin<OptionsType>(this.Id, this.Options);
  }
  getEvents() {}
  AddMapTool() {
    this.addTo(this.MapComponent.Map);
  }
  /*Инициализация инструмента*/
  abstract InitMapTool(): void;
  ngOnInit(): void {
    this.Register();
    this.AddMapTool();
  }
}
