import { NzConfig } from "ng-zorro-antd/core/config";
import { NZ_DATE_CONFIG } from "ng-zorro-antd/i18n";
/*Глобальная конфигурация для NgZorro */
export const GlobalNgZorroConfig: NzConfig = {
  button: { nzSize: "small" },
  notification: { nzPlacement: "bottomLeft" },
  switch: { nzSize: "small" },
};
/*Глобальная конфигурация для календаря*/
export const GlobalNzZorroDateProvider = {
  provide: NZ_DATE_CONFIG,
  useValue: {
    firstDayOfWeek: 1,
  },
};
