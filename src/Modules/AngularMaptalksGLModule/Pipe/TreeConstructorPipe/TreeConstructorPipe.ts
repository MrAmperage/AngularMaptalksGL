import { Pipe, PipeTransform } from "@angular/core";
import { TreeConstructorOptions } from "./TreeConstructorPipeTypes";
import BaseMapToolDirective from "../../MapToolComponents/BaseMapToolDirective/BaseMapToolDirective";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";

@Pipe({
  name: "TreeConstructorPipe",
  standalone: false,
})
export default class TreeConstructorPipe implements PipeTransform {
  transform(
    Objects: any[],
    Options: TreeConstructorOptions,
    Groups: NzTreeNodeOptions[],
    IsOnlyActive: boolean,
  ) {
    const FilteredObjects = IsOnlyActive
      ? Objects.filter((Object) => {
          return BaseMapToolDirective.GetObjectValueByAdress(
            Object,
            Options.IsActiveAdress,
          );
        })
      : [...Objects];

    //@ts-ignore
    const ObjectsMap = Map.groupBy(FilteredObjects, (Object) => {
      return BaseMapToolDirective.GetObjectValueByAdress(
        Object,
        Options.ParrentAdress,
      );
    });
    return Groups.reduce((GroupArray: NzTreeNodeOptions[], Group) => {
      const ChildrenObjects = ObjectsMap.get(Group.key);
      if (ChildrenObjects !== undefined) {
        Group.children = ChildrenObjects.map((Object) => {
          return {
            isLeaf: true,
            selectable: false,
            title: BaseMapToolDirective.GetObjectValueByAdress(
              Object,
              Options.TitleAdress,
            ),
            key: BaseMapToolDirective.GetObjectValueByAdress(
              Object,
              Options.KeyAdress,
            ),
          };
        });
        GroupArray.push(Group);
      }
      return GroupArray;
    }, []);
  }
}
