import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { VectorLayer } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { RoadStateMapToolOptions } from "./RoadStateMapToolComponentTypes";
import MapService from "../../Services/MapService/MapService";
import MapObjectDataStoreService from "../../Services/DataStoreServices/MapObjectsDataStoreService/MapObjectsDataStoreService";
import { Transport } from "../TransportMapToolComponent/TransportMapToolComponentTypes";
import ModelCategoryDataStoreService from "../../Services/DataStoreServices/ModelCategoriesDataStoreService/ModelCategoriesDataStoreService";
import { Model, ModelCategory } from "../../AngularMaptalksGLModuleTypes";
import {
  ModelsDataStoreService,
  WorkModesDataStoreService,
} from "../../../../public-api";
import HttpService from "../../Services/HttpService/HttpService";
import { WorkMode } from "../../Components/UIKitComponents/TimeIntervalSelectorComponent/TimeIntervalSelectorComponentTypes";

@Component({
  selector: "RoadStateMapToolComponent",
  templateUrl: "RoadStateMapToolComponent.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class RoadStateMapToolComponent extends BaseMapToolDirective<RoadStateMapToolOptions> {
  constructor(
    @Inject(MapComponent)
    private MapComponentInstance: MapComponent,
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private MapObjectDataStoreService: MapObjectDataStoreService,
    private ModelCategoryDataStoreService: ModelCategoryDataStoreService,
    private ModelsDataStoreService: ModelsDataStoreService,
    private WorkModesDataStoreService: WorkModesDataStoreService,
    private HttpService: HttpService,
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  WorkModes: WorkMode[] = [];
  Transports: Transport[] = [];
  ModelCaegories: ModelCategory[] = [];
  Models: Model[] = [];
  Id: string = "RoadStateMapTool";
  Options: RoadStateMapToolOptions = {
    TruckIds: [],
    ModelCategoryIds: [],
    Resolution: null,
    PassesCount: null,
    ModelsIds: [],
    BeginDate: null,
    EndDate: null,
    OpacityProcent: 50,
    IsLoaded: true,
  };

  VectorLayer!: VectorLayer;
  override InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "RoadStateMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
    this.MapObjectDataStoreService.Request().then((Response) => {
      this.Transports = Response;
    });
    this.ModelCategoryDataStoreService.Request().then((Response) => {
      this.ModelCaegories = Response;
    });
    this.ModelsDataStoreService.Request().then((Response) => {
      this.Models = Response;
    });
    this.WorkModesDataStoreService.Request().then((Response) => {
      this.WorkModes = Response;
    });
  }

  ShowRoadStates() {
    console.log(
      this.Options,
      this.MapServiceInstance.PluginsConfigsMap.get("RoadStateMapTool"),
    );
    this.HttpService.RequestRoadState(this.Options).then((Response) => {
      console.log(Response);
    });
  }
}
