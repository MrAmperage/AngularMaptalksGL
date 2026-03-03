import { Pipe, PipeTransform } from "@angular/core";
import { SelectPipeOptions } from "./ArrayToSelectOptionPipeTypes";
import { NzSelectOptionInterface } from "ng-zorro-antd/select";
import BaseMapToolDirective from "../../MapToolComponents/BaseMapToolDirective/BaseMapToolDirective";

@Pipe({
  name: "ArrayToSelectOptionPipe",
  standalone: false,
})
export default class ArrayToSelectOptionPipe implements PipeTransform {
  transform<ObjectType>(
    Array: Array<ObjectType>,
    Options: SelectPipeOptions<ObjectType>,
  ) {
    return Array.map((Object): NzSelectOptionInterface => {
      return {
        value: BaseMapToolDirective.GetObjectValueByAdress(
          Object,
          Options.ValueAdress,
        ),
        label: BaseMapToolDirective.GetObjectValueByAdress(
          Object,
          Options.LabelAdress,
        ),
      };
    });
  }
}
