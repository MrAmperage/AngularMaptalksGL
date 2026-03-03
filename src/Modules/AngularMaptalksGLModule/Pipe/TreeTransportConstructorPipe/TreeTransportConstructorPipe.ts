import { Pipe, PipeTransform } from "@angular/core";
import { Transport } from "../../MapToolComponents/TransportMapToolComponent/TransportMapToolComponentTypes";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";

@Pipe({
  name: "TreeTransportConstructorPipe",
  standalone: false,
})
export default class TreeTransportConstructorPipe implements PipeTransform {
  transform(Transports: Transport[]): NzTreeNodeOptions[] {
    return Transports.map((Transport) => {
      return {
        title: Transport.name,
        key: Transport.id.$uuid,
        selectable: false,
        isLeaf: true,
        children: [],
      };
    });
  }
}
