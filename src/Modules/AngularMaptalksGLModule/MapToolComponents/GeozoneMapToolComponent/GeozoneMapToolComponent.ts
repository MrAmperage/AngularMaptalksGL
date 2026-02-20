import { PolygonLayer } from "maptalks-gl";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { GeozoneMapToolOptions } from "./GeozoneMapToolComponentTypes";
import { LayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import { Component, Inject, Input } from "@angular/core";
import MapService from "../../Services/MapService/MapService";
import HttpService from "../../Services/HttpService/HttpService";
import MapComponent from "../../Components/MapComponent/MapComponent";
import PreloadGeozonesDataStoreService from "../../Services/DataStoreServices/PreloadGeozonesDataStoreService/PreloadGeozonesDataStoreService";
import GeozoneGeometry from "./Geometries/GeozoneGeometry/GeozoneGeometry";
import TruncatedGeozonesDataStoreService from "../../Services/DataStoreServices/TruncatedGeozonesDataStoreService/TruncatedGeozonesDataStoreService";

@Component({
  selector: "GeozoneMapToolComponent",
  templateUrl: "GeozoneMapToolComponent.html",
  styleUrl: "GeozoneMapToolComponent.css",
  standalone: false,
})
export default class GeozoneMapToolComponent extends BaseMapToolDirective<GeozoneMapToolOptions> {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private HttpService: HttpService,
    private PreloadGeozonesDataStoreService: PreloadGeozonesDataStoreService,
    private TruncatedGeozonesDataStoreService: TruncatedGeozonesDataStoreService,
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  @Input()
  IsLoadingPreloadGeozones: boolean = false;
  override Id: string = "GeozoneMapTool";
  PolygonLayer!: PolygonLayer;
  override Options: GeozoneMapToolOptions = {
    IsShowName: false,
    IsShowCaption: false,
    IsShowDefault: true,
    IsShowOnlyActive: true,
    GeozoneGeometries: [],
    GeozonesInfo: [],
    CheckedKeys: [],
    TreeGeozones: [
      {
        title: "Проекты бурения",
        key: "DrillingBlock",
        selectable: false,
        children: [],
      },
      {
        title: "Контуры проектов бурения",
        key: "DrillingBlockContour",
        selectable: false,
      },
      { title: "Облака точек", key: "PointClouds", selectable: false },
      { title: "Линии", key: "Line", selectable: false },
      { title: "Проекты заряжания", key: "BlastBlock", selectable: false },
      {
        title: "Контуры проектов заряжания",
        key: "BlastBlockContour",
        selectable: false,
      },
      { title: "Сетки скважин", key: "DrillGrid", selectable: false },
      { title: "Сетки зарядов", key: "BlastGrid", selectable: false },
      {
        title: "Пользовательские контуры проектов заряжания",
        key: "BlastUserContour",
        selectable: false,
      },
      { title: "Зоны разгрузки", key: "Unload", selectable: false },
      {
        title: "Статические объекты",
        key: "TypedStaticObject",
        selectable: false,
      },
      {
        title: "Статические геометрии",
        key: "StaticGeometry",
        selectable: false,
      },
      { title: "Опасные зоны", key: "RestrictedGeometry", selectable: false },
      { title: "Точки", key: "Points", selectable: false },
      { title: "Отрезки", key: "Segments", selectable: false },
      {
        title: "Контуры ВГМ проекта бурения",
        key: "DrillingRockContour",
        selectable: false,
      },
    ],
  };

  override InitMapTool(): void {
    this.PolygonLayer = new PolygonLayer(
      "GeozoneMapToolPolygonLayer",
      LayerConfig,
    );
    this.MapComponent.Map.addLayer(this.PolygonLayer);
    if (this.IsLoadingPreloadGeozones) {
      this.PreloadGeozonesDataStoreService.Request().then((Response) => {
        const CheckedKeys: string[] = [];
        const PreloadGeozones: GeozoneGeometry[] = [];
        Response.forEach((Geozone) => {
          PreloadGeozones.push(new GeozoneGeometry(Geozone));
          CheckedKeys.push(Geozone.id.$uuid);
        });
        this.ChangeOptions("GeozoneGeometries", PreloadGeozones);
        this.ChangeOptions("CheckedKeys", CheckedKeys);
        this.PolygonLayer.addGeometry(this.Options.GeozoneGeometries);
      });
    }
    this.TruncatedGeozonesDataStoreService.Request().then((Response) => {
      this.ChangeOptions("GeozonesInfo", Response);
    });
  }
}
