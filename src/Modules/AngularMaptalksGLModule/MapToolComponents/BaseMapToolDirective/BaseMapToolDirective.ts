import { Directive, OnInit } from "@angular/core";
import { MapTool } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import MapService from "../../Services/MapService/MapService";
import { Paths } from "../../AngularMaptalksGLModuleTypes";

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
  onAdd(): void {
    this.InitMapTool();
  }
  getEvents() {}
  AddMapTool() {
    this.addTo(this.MapComponent.Map);
  }
  /*Парсер числовых инпутов*/
  NzNumberParser(Value: string): number | null {
    const CurrentNumber: number = new Number(Value).valueOf();
    if (Number.isNaN(CurrentNumber)) {
      return null;
    } else {
      return CurrentNumber;
    }
  }
  //TODO Дописать установку значения в объекте по адресу
  static SetValueByAdress<ObjectType>(
    Object: ObjectType,
    Adress: keyof ObjectType,
    Value: any,
  ): ObjectType {
    Object[Adress] = Value;
    return Object;
  }
  ChangeOptions(Adress: keyof OptionsType, Value: any) {
    this.Options = BaseMapToolDirective.SetValueByAdress<OptionsType>(
      this.Options,
      Adress,
      Value,
    );
  }
  static GetObjectValueByAdress<ObjectType, ReturnType>(
    Object: ObjectType,
    Address: Paths<ObjectType>,
  ): ReturnType {
    const NewObject = { ...Object };
    return Address.split(".").reduce(
      (PrevValue, CurrentValue, Index, Array): any => {
        if (Index !== Array.length) {
          if (PrevValue === null) {
            return NewObject[CurrentValue];
          } else {
            return PrevValue[CurrentValue];
          }
        } else {
          return Object[CurrentValue];
        }
      },
      null,
    );
  }
  /*Инициализация инструмента*/
  abstract InitMapTool(): void;
  ngOnInit(): void {
    this.Register();
    this.AddMapTool();
  }
}
