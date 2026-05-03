import { Injectable } from "@angular/core";
import { Map as MapObject } from "maptalks-gl";
import { BehaviorSubject } from "rxjs";
import { BaseOptionsType } from "../../MapToolComponents/BaseMapToolDirective/BaseMapToolDirectiveTypes";
import { MapToolListType } from "./MapServiceTypes";
/*Сервис с настройками для карты*/
@Injectable()
export default class MapService {
  Map!: MapObject;
  readonly PluginsOptionsMap: Map<string, BehaviorSubject<any>> = new Map();

  RegisterPlugin<OptionsType extends BaseOptionsType>(Options: OptionsType) {
    if (this.PluginsOptionsMap.has(Options.Id)) {
      throw new Error(`Плагин с Id ${Options.Id} уже зарегистрирован!`);
    } else {
      this.PluginsOptionsMap.set(Options.Id, new BehaviorSubject(Options));
    }
  }

  UpdateOption<OptionType>(Id: string, Option: Partial<OptionType>) {
    const OldOption = this.PluginsOptionsMap.get(Id);
    if (OldOption !== undefined) {
      OldOption.next({ ...OldOption.getValue(), ...Option });
    }
  }

  RegisterMap(Map: MapObject) {
    this.Map = Map;
  }

  GetOptionById<OptionsKey extends keyof MapToolListType>(
    Id: OptionsKey,
  ): MapToolListType[OptionsKey] | undefined {
    const CurrentOption = this.PluginsOptionsMap.get(Id);
    return CurrentOption !== undefined ? CurrentOption.getValue() : undefined;
  }
}
