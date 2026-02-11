import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { VectorLayer } from "maptalks-gl";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { VectorLayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import { RoadStateMapToolOptions } from "./RoadStateMapToolComponentTypes";
import MapService from "../../Services/MapService/MapService";

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
  ) {
    super(MapComponentInstance, MapServiceInstance);
  }
  Id: string = "RoadStateMapTool";
  Options: RoadStateMapToolOptions = {
    TruckIds: [],
    ModelCategoryIds: [],
    Resolution: null,
    PassesCount: null,
    ModelsIds: [],
    BeginDate: null,
    EndDate: null,
    LoadingProcent: null,
  };
  VectorLayer!: VectorLayer;
  override InitMapTool() {
    this.VectorLayer = new VectorLayer(
      "RoadStateMapToolVectorLayer",
      VectorLayerConfig,
    );
    this.MapComponent.Map.addLayer(this.VectorLayer);
  }
  RequestRoadState() {}
}
