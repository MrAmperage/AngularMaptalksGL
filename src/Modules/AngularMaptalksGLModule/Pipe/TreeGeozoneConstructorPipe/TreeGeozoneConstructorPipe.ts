import { Pipe, PipeTransform } from "@angular/core";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import {
  GeoFeatureInfo,
  GeozoneInfo,
  GeozoneType,
} from "../../MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponentTypes";

@Pipe({
  name: "TreeGeozoneConstructorPipe",
  standalone: false,
})
export default class TreeGeozoneConstructorPipe implements PipeTransform {
  transform(
    GeozoneInfo: GeozoneInfo[],
    GeoFeatureInfo: GeoFeatureInfo[],
    Groups: NzTreeNodeOptions[],
    IsOnlyActive: boolean,
  ) {
    const GeoFeatureList = (GeoFeatureInfo as any[]).concat(GeozoneInfo);
    const FilteredGeoFeatureList = GeoFeatureList.filter((Object) => {
      return IsOnlyActive ? Object.is_active : true;
    });

    //@ts-ignore
    const ObjectsMap = Map.groupBy(
      FilteredGeoFeatureList,
      (Object: GeozoneInfo) => {
        return Object.type;
      },
    );
    return Groups.reduce((GroupArray: NzTreeNodeOptions[], Group) => {
      Group["type"] = Group.key;
      const ChildrenObjects = ObjectsMap.get(Group.key as GeozoneType);
      if (ChildrenObjects !== undefined) {
        Group.children = ChildrenObjects.map((Object) => {
          return {
            ["type"]: Object.type,
            isLeaf: true,
            selectable: false,
            title: Object.name,
            key: Object.id.$uuid,
          };
        });
        GroupArray.push(Group);
      }
      return GroupArray;
    }, []);
  }
}
