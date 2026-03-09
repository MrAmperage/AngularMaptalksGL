import { Injectable } from "@angular/core";
import { Map as MapObject } from "maptalks-gl";
import { BehaviorSubject } from "rxjs";
import { BaseOptionsType } from "../../MapToolComponents/BaseMapToolDirective/BaseMapToolDirectiveTypes";
import { MapToolListType } from "./MapServiceTypes";
/*Сервис с настройками для карты*/
@Injectable()
export default class MapService {
  Map!: MapObject;
  readonly PluginsConfigsMap: Map<string, BehaviorSubject<any>> = new Map();

  RegisterPlugin<OptionsType extends BaseOptionsType>(Options: OptionsType) {
    if (this.PluginsConfigsMap.has(Options.Id)) {
      throw new Error(`Плагин с Id ${Options.Id} уже зарегистрирован!`);
    } else {
      this.PluginsConfigsMap.set(Options.Id, new BehaviorSubject(Options));
    }
  }

  UpdateOption<OptionType>(Id: string, Option: Partial<OptionType>) {
    const OldOption = this.PluginsConfigsMap.get(Id);
    if (OldOption !== undefined) {
      OldOption.next({ ...OldOption.getValue(), ...Option });
    }
  }
  RegisterMap(Map: MapObject) {
    this.Map = Map;
  }

  GetOptionById<OptionsKey extends keyof MapToolListType>(
    Id: keyof MapToolListType,
  ): MapToolListType[OptionsKey] | undefined {
    const CurrentOption = this.PluginsConfigsMap.get(Id);
    return CurrentOption !== undefined ? CurrentOption.getValue() : undefined;
  }
}
