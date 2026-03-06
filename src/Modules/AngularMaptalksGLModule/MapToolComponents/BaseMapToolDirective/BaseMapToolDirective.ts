import { Directive, OnInit } from "@angular/core";
import { MapTool, PolygonLayer, VectorLayer } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import MapService from "../../Services/MapService/MapService";
import { Paths } from "../../AngularMaptalksGLModuleTypes";
import { NzTreeNode } from "ng-zorro-antd/tree";
import { HandlerGetNodeKeyOperationType } from "./BaseMapToolDirectiveTypes";

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
    const CurrentOptions = this.MapService.PluginsConfigsMap.get(this.Id);
    if (CurrentOptions !== undefined) {
      CurrentOptions.subscribe((NewOptions) => {
        console.log("Новые опции", NewOptions);
        this.Options = NewOptions;
      });
    }
  }
  override onAdd(): void {
    this.InitMapTool();
  }
  IsLoading: boolean = false;
  override getEvents() {}
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
  UpdateOption(Option: Partial<OptionsType>) {
    this.MapService.UpdateOption(this.Id, Option);
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
  /*Отцентрироваться на геометрию */
  FitExtentByGeometryId(Id: string, VectorLayer: VectorLayer | PolygonLayer) {
    const Geometry = VectorLayer.getGeometryById(Id);
    if (Geometry !== null) {
      this.getMap().fitExtent(Geometry.getExtent());
    }
  }

  static HandlerGetNodeKey(
    Node: NzTreeNode,
    CurrentCheckedKeys: string[],
    OperationType: HandlerGetNodeKeyOperationType,
  ) {
    return Node.children.length > 0
      ? Node.children.reduce((KeyArray: string[], Node) => {
          if (Node.children.length > 0) {
            KeyArray = KeyArray.concat(
              this.HandlerGetNodeKey(Node, CurrentCheckedKeys, OperationType),
            );
          } else {
            if (
              OperationType === "Add"
                ? !CurrentCheckedKeys.includes(Node.key)
                : true
            ) {
              KeyArray.push(Node.key);
            }
          }
          return KeyArray;
        }, [])
      : [Node.key];
  }
  /*Инициализация инструмента*/
  abstract InitMapTool(): void;
  ngOnInit(): void {
    this.Register();
    this.AddMapTool();
  }
}
