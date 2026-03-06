import { LineStringLayer, PointLayer, PolygonLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import {
  GeoFeatureType,
  GeozoneMapToolOptions,
  GeozoneType,
} from "./GeozoneMapToolComponentTypes";
import { LayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject, Input } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import PreloadGeozonesDataStoreService from "../../Services/DataStoreServices/PreloadGeozonesDataStoreService/PreloadGeozonesDataStoreService";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";
import TruncatedGeozonesDataStoreService from "../../Services/DataStoreServices/TruncatedGeozonesDataStoreService/TruncatedGeozonesDataStoreService";
import { NzFormatEmitEvent } from "ng-zorro-antd/tree";
import UserEnterprisesDataStoreService from "../../Services/DataStoreServices/UserEnterprisesDataStoreService/UserEnterprisesDataStoreService";
import TruncatedGeoFeaturesDataStoreService from "../../Services/DataStoreServices/TruncatedGeoFeaturesDataStoreService/TruncatedGeoFeaturesDataStoreService";
import PreloadLinesDataStoreService from "../../Services/DataStoreServices/PreloadLinesDataStoreService/PreloadLinesDataStoreService";
import LineGeometry from "./Geometries/LineGeometry/LineGeometry";
import TreeGeozoneJson from "./Configs/TreeGeozones.json";
import PreloadSegmentsDataStoreService from "../../Services/DataStoreServices/PreloadSegmentsDataStoreService/PreloadSegmentsDataStoreService";
import SegmentGeometry from "./Geometries/SegmentGeometry/SegmentGeometry";
import PreloadPointsDataStoreService from "../../Services/DataStoreServices/PreloadPointsDataStoreService/PreloadPointsDataStoreService";
import PointGeometry from "./Geometries/PointGeometry/PointGeometry";
import PreloadCloudPointsDataStoreService from "../../Services/DataStoreServices/PreloadCloudPointsDataStoreService/PreloadCloudPointsDataStoreService";
import CloudPointsGeometry from "./Geometries/CloudPointsGeometry/CloudPointsGeometry";

@Component({
  selector: "GeozoneMapToolComponent",
  templateUrl: "GeozoneMapToolComponent.html",
  standalone: false,
})
export default class GeozoneMapToolComponent extends BaseMapToolDirective<GeozoneMapToolOptions> {
  constructor(
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
    private PreloadGeozonesDataStoreService: PreloadGeozonesDataStoreService,
    private TruncatedGeozonesDataStoreService: TruncatedGeozonesDataStoreService,
    private UserEnterprisesDataStoreService: UserEnterprisesDataStoreService,
    private TruncatedGeoFeaturesDataStoreService: TruncatedGeoFeaturesDataStoreService,
    private PreloadLinesDataStoreService: PreloadLinesDataStoreService,
    private PreloadSegmentsDataStoreService: PreloadSegmentsDataStoreService,
    private PreloadPointsDataStoreService: PreloadPointsDataStoreService,
    private PreloadCloudPointsDataStoreService: PreloadCloudPointsDataStoreService,
  ) {
    super(MapServiceInstance);
  }
  @Input()
  IsShowPreload: boolean = false;
  override Id: string = "GeozoneMapTool";
  override Options: GeozoneMapToolOptions = {
    IsShowName: false,
    IsShowCaption: false,
    IsShowDefault: true,
    IsShowOnlyActive: true,
    GeozoneGeometries: [],
    LineGeometries: [],
    PointGeometries: [],
    GeoFeaturesInfo: [],
    SegmentGeometries: [],
    CloudPointsGeometries: [],
    GeozonesInfo: [],
    CheckedKeys: [],
    Organizations: [],
    SearchInput: null,
    TreeGeozones: TreeGeozoneJson,
    PointLayer: new PointLayer("GeozoneMapToolPointLayer", LayerConfig),
    PolygonLayer: new PolygonLayer("GeozoneMapToolPolygonLayer", LayerConfig),
    LineStringLayer: new LineStringLayer(
      "GeozoneMapToolLineStringLayer",
      LayerConfig,
    ),
  };
  ClickTreeNode(Event: NzFormatEmitEvent) {
    if (
      Event.node !== undefined &&
      Event.node !== null &&
      Event.node.children.length === 0
    ) {
      const Type: GeozoneType | GeoFeatureType = Event.node.origin["type"];
      switch (true) {
        case Type !== "line" &&
          Type !== "segment" &&
          Type !== "dot" &&
          Type !== "cloud":
          this.FitExtentByGeometryId(Event.node.key, this.Options.PolygonLayer);
          break;
        case Type === "line" || Type === "segment":
          this.FitExtentByGeometryId(
            Event.node.key,
            this.Options.LineStringLayer,
          );
          break;
        case Type === "dot" || Type === "cloud":
          this.FitExtentByGeometryId(Event.node.key, this.Options.PointLayer);
          break;
      }
    }
  }

  ChangeShowOnlyActive(IsShow: boolean) {
    this.UpdateOption({ IsShowOnlyActive: IsShow });
  }

  //TODO переписать через RxJs
  UpdateCheckedKeys() {
    let CheckedKeys: string[] = [];
    CheckedKeys = CheckedKeys.concat(
      this.Options.GeozoneGeometries.reduce(
        (GeozoneCheckedKeys: string[], Geozone) => {
          GeozoneCheckedKeys.push(Geozone.getId());
          return GeozoneCheckedKeys;
        },
        [],
      ),
    );
    CheckedKeys = CheckedKeys.concat(
      this.Options.LineGeometries.reduce((LineCheckedKeys: string[], Line) => {
        LineCheckedKeys.push(Line.getId());
        return LineCheckedKeys;
      }, []),
    );
    CheckedKeys = CheckedKeys.concat(
      this.Options.SegmentGeometries.reduce(
        (SegementCheckedKeys: string[], Segement) => {
          SegementCheckedKeys.push(Segement.getId());
          return SegementCheckedKeys;
        },
        [],
      ),
    );
    CheckedKeys = CheckedKeys.concat(
      this.Options.PointGeometries.reduce(
        (PointCheckedKeys: string[], Point) => {
          PointCheckedKeys.push(Point.getId());
          return PointCheckedKeys;
        },
        [],
      ),
    );
    CheckedKeys = CheckedKeys.concat(
      this.Options.CloudPointsGeometries.reduce(
        (CloudPointsCheckedKeys: string[], Point) => {
          CloudPointsCheckedKeys.push(Point.getId());
          return CloudPointsCheckedKeys;
        },
        [],
      ),
    );
    this.UpdateOption({ CheckedKeys: CheckedKeys });
  }
  ChangeShowName(IsShow: boolean) {
    this.UpdateOption({ IsShowName: IsShow });
    this.Options.GeozoneGeometries.forEach((GeozoneGeometry) => {
      GeozoneGeometry.ChangeShowName(this.Options.IsShowName);
    });
    this.Options.LineGeometries.forEach((LineGeometry) => {
      LineGeometry.ChangeShowName(this.Options.IsShowName);
    });
    this.Options.PointGeometries.forEach((PointGeometry) => {
      PointGeometry.ChangeShowName(this.Options.IsShowName);
    });
  }
  ChangeShowCaption(IsShow: boolean) {
    this.UpdateOption({ IsShowCaption: IsShow });
    this.Options.GeozoneGeometries.forEach((GeozoneGeometry) => {
      GeozoneGeometry.ChangeShowCaption(this.Options.IsShowCaption);
    });
  }

  RemoveGeozonesByKeys(Keys: string[]) {
    const RemovedGeometries: GeozoneGeometry[] = [];
    const NewGeozoneGeometies: GeozoneGeometry[] = [];

    this.Options.GeozoneGeometries.forEach((Geometry) => {
      if (Keys.includes(Geometry.getId())) {
        RemovedGeometries.push(Geometry);
      } else {
        NewGeozoneGeometies.push(Geometry);
      }
    });
    this.Options.PolygonLayer.removeGeometry(RemovedGeometries);
    this.UpdateOption({
      GeozoneGeometries: NewGeozoneGeometies,
    });
    this.UpdateCheckedKeys();
  }
  AddGeozonesByKeys(Keys: string[]) {
    this.HttpService.RequestGeozonesByOptions(Keys).then((Response) => {
      const NewGeozones = Response.result.map((GeozoneResponse) => {
        return new GeozoneGeometry(GeozoneResponse, this.Options);
      });

      this.UpdateOption({
        GeozoneGeometries: this.Options.GeozoneGeometries.concat(NewGeozones),
      });
      this.Options.PolygonLayer.addGeometry(NewGeozones);
      this.UpdateCheckedKeys();
    });
  }
  AddLinesByKeys(Keys: string[]) {
    this.HttpService.RequestLinesByOptions(Keys).then((Response) => {
      const NewLines = Response.result.map((LineResponse) => {
        return new LineGeometry(LineResponse, this.Options);
      });
      this.UpdateOption({
        LineGeometries: this.Options.LineGeometries.concat(NewLines),
      });
      this.Options.LineStringLayer.addGeometry(NewLines);
      this.UpdateCheckedKeys();
    });
  }
  AddPointsByKeys(Keys: string[]) {
    this.HttpService.RequestPointsByOptions(Keys).then((Response) => {
      const NewPoints = Response.result.map((PointResponse) => {
        return new PointGeometry(PointResponse, this.Options);
      });
      this.UpdateOption({
        PointGeometries: this.Options.PointGeometries.concat(NewPoints),
      });
      this.Options.PointLayer.addGeometry(NewPoints);
      this.UpdateCheckedKeys();
    });
  }
  AddSegmentsByKeys(Keys: string[]) {
    this.HttpService.RequestSegmentsByOptions(Keys).then((Response) => {
      const NewSegments = Response.result.map((SegmentResponse) => {
        return new SegmentGeometry(SegmentResponse);
      });
      this.UpdateOption({
        SegmentGeometries: this.Options.SegmentGeometries.concat(NewSegments),
      });
      this.Options.LineStringLayer.addGeometry(NewSegments);
      this.UpdateCheckedKeys();
    });
  }
  AddCloudPointsByKeys(Keys: string[]) {
    this.HttpService.RequestCloudsPointsByOptions(Keys).then((Response) => {
      const NewCloudPoints = Response.result.map((CloudPointsResponse) => {
        return new CloudPointsGeometry(CloudPointsResponse, this.Options);
      });
      this.UpdateOption({
        CloudPointsGeometries:
          this.Options.CloudPointsGeometries.concat(NewCloudPoints),
      });
      this.Options.PointLayer.addGeometry(NewCloudPoints);
      this.UpdateCheckedKeys();
    });
  }
  RemoveLinesByKeys(Keys: string[]) {
    const RemovedLineGeometries: LineGeometry[] = [];
    const NewLineGeometries: LineGeometry[] = [];
    this.Options.LineGeometries.forEach((LineGeometry) => {
      if (Keys.includes(LineGeometry.getId())) {
        RemovedLineGeometries.push(LineGeometry);
      } else {
        NewLineGeometries.push(LineGeometry);
      }
    });
    this.Options.LineStringLayer.removeGeometry(RemovedLineGeometries);
    this.UpdateOption({
      LineGeometries: NewLineGeometries,
    });
    this.UpdateCheckedKeys();
  }
  RemoveCloudPointsByKeys(Keys: string[]) {
    const RemovedCloudPointsGeometries: CloudPointsGeometry[] = [];
    const NewCloudPointsGeometries: CloudPointsGeometry[] = [];
    this.Options.CloudPointsGeometries.forEach((CloudPointsGeometry) => {
      if (Keys.includes(CloudPointsGeometry.getId())) {
        RemovedCloudPointsGeometries.push(CloudPointsGeometry);
      } else {
        NewCloudPointsGeometries.push(CloudPointsGeometry);
      }
    });
    this.Options.PointLayer.removeGeometry(RemovedCloudPointsGeometries);
    this.UpdateOption({
      CloudPointsGeometries: NewCloudPointsGeometries,
    });
    this.UpdateCheckedKeys();
  }
  RemovePointsByKeys(Keys: string[]) {
    const RemovedPointGeometries: PointGeometry[] = [];
    const NewPointGeometries: PointGeometry[] = [];
    this.Options.PointGeometries.forEach((PointGeometry) => {
      if (Keys.includes(PointGeometry.getId())) {
        RemovedPointGeometries.push(PointGeometry);
      } else {
        NewPointGeometries.push(PointGeometry);
      }
    });
    this.Options.PointLayer.removeGeometry(RemovedPointGeometries);
    this.UpdateOption({
      PointGeometries: NewPointGeometries,
    });
    this.UpdateCheckedKeys();
  }
  RemoveSegmentsByKeys(Keys: string[]) {
    const RemovedSegmentGeometries: SegmentGeometry[] = [];
    const NewSegmentGeometries: SegmentGeometry[] = [];
    this.Options.SegmentGeometries.forEach((SegmentGeometry) => {
      if (Keys.includes(SegmentGeometry.getId())) {
        RemovedSegmentGeometries.push(SegmentGeometry);
      } else {
        NewSegmentGeometries.push(SegmentGeometry);
      }
    });
    this.Options.LineStringLayer.removeGeometry(RemovedSegmentGeometries);
    this.UpdateOption({
      SegmentGeometries: NewSegmentGeometries,
    });
    this.UpdateCheckedKeys();
  }
  //TODO унифицировать добавление и удаление разных геометрий
  CheckTreeNode(Event: NzFormatEmitEvent) {
    if (Event.node !== undefined && Event.node !== null) {
      const NodeType: GeozoneType | GeoFeatureType = Event.node.origin["type"];
      const AddedKeys = BaseMapToolDirective.HandlerGetNodeKey(
        Event.node,
        this.Options.CheckedKeys,
        "Add",
      );
      const RemovedKeys = BaseMapToolDirective.HandlerGetNodeKey(
        Event.node,
        this.Options.CheckedKeys,
        "Remove",
      );
      switch (true) {
        case NodeType !== "segment" &&
          NodeType !== "dot" &&
          NodeType !== "cloud" &&
          NodeType !== "line":
          if (Event.node.isChecked) {
            this.AddGeozonesByKeys(AddedKeys);
          } else {
            this.RemoveGeozonesByKeys(RemovedKeys);
          }
          break;
        case NodeType === "line":
          if (Event.node.isChecked) {
            this.AddLinesByKeys(AddedKeys);
          } else {
            this.RemoveLinesByKeys(RemovedKeys);
          }
          break;
        case NodeType === "segment":
          if (Event.node.isChecked) {
            this.AddSegmentsByKeys(AddedKeys);
          } else {
            this.RemoveSegmentsByKeys(RemovedKeys);
          }
          break;
        case NodeType === "dot":
          if (Event.node.isChecked) {
            this.AddPointsByKeys(AddedKeys);
          } else {
            this.RemovePointsByKeys(RemovedKeys);
          }
          break;
        case NodeType === "cloud":
          if (Event.node.isChecked) {
            this.AddCloudPointsByKeys(AddedKeys);
          } else {
            this.RemoveCloudPointsByKeys(RemovedKeys);
          }
          break;
      }
    }
  }
  ChangeSearch(SeachString: string) {
    this.UpdateOption({ SearchInput: SeachString });
  }
  //TODO Перенести подсчет на Pipe
  get GetCheckedCount() {
    const CountGeozones = this.Options.GeozoneGeometries.filter((Geometry) => {
      return this.Options.IsShowOnlyActive
        ? Geometry.Geozone.properties.active
        : true;
    }).length;
    const CountSegments = this.Options.SegmentGeometries.filter((Geometry) => {
      return this.Options.IsShowOnlyActive
        ? Geometry.Segement.properties.active
        : true;
    }).length;

    const CountLines = this.Options.LineGeometries.filter((Geometry) => {
      return this.Options.IsShowOnlyActive
        ? Geometry.Line.properties.active
        : true;
    }).length;
    const CountPoints = this.Options.PointGeometries.filter((Geometry) => {
      return this.Options.IsShowOnlyActive
        ? Geometry.Point.properties.active
        : true;
    }).length;

    const CountCloudsPoints = this.Options.CloudPointsGeometries.filter(
      (Geometry) => {
        return this.Options.IsShowOnlyActive
          ? Geometry.CloudPoints.properties.active
          : true;
      },
    ).length;
    return (
      CountGeozones +
      CountSegments +
      CountLines +
      CountPoints +
      CountCloudsPoints
    );
  }
  PreloadLines() {
    this.PreloadLinesDataStoreService.Request().then((Response) => {
      const PreloadLine: LineGeometry[] = Response.map((Line) => {
        return new LineGeometry(Line, this.Options);
      });
      this.UpdateOption({
        LineGeometries: PreloadLine,
      });
      this.UpdateCheckedKeys();
      this.Options.LineStringLayer.addGeometry(this.Options.LineGeometries);
    });
  }

  PreloadCloudsPoint() {
    this.PreloadCloudPointsDataStoreService.Request().then((Response) => {
      const PreloadCloudPoints: CloudPointsGeometry[] = Response.map(
        (CloudPoint) => {
          return new CloudPointsGeometry(CloudPoint, this.Options);
        },
      );
      this.UpdateOption({
        CloudPointsGeometries: PreloadCloudPoints,
      });
      this.UpdateCheckedKeys();
      this.Options.PointLayer.addGeometry(this.Options.CloudPointsGeometries);
    });
  }
  PreloadGeozones() {
    this.PreloadGeozonesDataStoreService.Request().then((Response) => {
      const PreloadGeozones: GeozoneGeometry[] = Response.map((Geozone) => {
        return new GeozoneGeometry(Geozone, this.Options);
      });
      this.UpdateOption({
        GeozoneGeometries: PreloadGeozones,
      });
      this.UpdateCheckedKeys();
      this.Options.PolygonLayer.addGeometry(this.Options.GeozoneGeometries);
    });
  }

  PreloadSegments() {
    this.PreloadSegmentsDataStoreService.Request().then((Response) => {
      const PreloadSegments: SegmentGeometry[] = Response.map((Segemnt) => {
        return new SegmentGeometry(Segemnt);
      });
      this.UpdateOption({
        SegmentGeometries: PreloadSegments,
      });
      this.UpdateCheckedKeys();
      this.Options.LineStringLayer.addGeometry(this.Options.SegmentGeometries);
    });
  }

  PreloadPoints() {
    this.PreloadPointsDataStoreService.Request().then((Response) => {
      const PreloadPoints: PointGeometry[] = Response.map((Point) => {
        return new PointGeometry(Point, this.Options);
      });
      this.UpdateOption({
        PointGeometries: PreloadPoints,
      });
      this.UpdateCheckedKeys();
      this.Options.PointLayer.addGeometry(this.Options.PointGeometries);
    });
  }

  override InitMapTool(): void {
    this.MapServiceInstance.Map.addLayer([
      this.Options.PolygonLayer,
      this.Options.LineStringLayer,
      this.Options.PointLayer,
    ]);
    this.UserEnterprisesDataStoreService.Request().then((Response) => {
      this.UpdateOption({ Organizations: Response });
    });
    this.TruncatedGeoFeaturesDataStoreService.Request().then((Response) => {
      this.UpdateOption({ GeoFeaturesInfo: Response });
    });
    this.TruncatedGeozonesDataStoreService.Request().then((Response) => {
      this.UpdateOption({ GeozonesInfo: Response });
      if (this.IsShowPreload) {
        this.PreloadGeozones();
        this.PreloadLines();
        this.PreloadSegments();
        this.PreloadPoints();
        this.PreloadCloudsPoint();
      }
    });
  }
}
