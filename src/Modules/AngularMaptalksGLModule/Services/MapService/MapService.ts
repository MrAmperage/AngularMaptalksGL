import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
/*Сервис с настройками для карты*/
@Injectable()
export default class MapService {
  PluginsConfigsMap: Map<string, BehaviorSubject<any>> = new Map();

  RegisterPlugin<OptionsType>(Id: string, Options: OptionsType) {
    if (this.PluginsConfigsMap.has(Id)) {
      throw new Error(`Плагин с Id ${Id} уже зарегистрирован!`);
    } else {
      this.PluginsConfigsMap.set(Id, new BehaviorSubject(Options));
    }
  }

  UpdateOption<OptionType>(Id: string, Option: Partial<OptionType>) {
    const OldOption = this.PluginsConfigsMap.get(Id);
    if (OldOption !== undefined) {
      OldOption.next({ ...OldOption.getValue(), ...Option });
    }
  }
}
