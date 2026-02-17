import { Injectable } from "@angular/core";
/*Сервис с настройками для карты*/
@Injectable()
export default class MapService {
  PluginsConfigsMap = new Map<string, any>();

  RegisterPlugin<OptionsType>(Id: string, Options: OptionsType) {
    if (this.PluginsConfigsMap.has(Id)) {
      throw new Error(`Плагин с Id ${Id} уже зарегистрирован!`);
    } else {
      this.PluginsConfigsMap.set(Id, Options);
    }
  }
}
