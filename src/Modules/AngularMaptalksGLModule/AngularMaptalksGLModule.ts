import { NgModule } from "@angular/core";
import MapComponent from "./Components/MapComponent/MapComponent";
import EdgeMapToolComponent from "../../Modules/AngularMaptalksGLModule/MapToolComponents/EdgeMapToolComponent/EdgeMapToolComponent";
import TransportMapToolComponent from "../../Modules/AngularMaptalksGLModule/MapToolComponents/TransportMapToolComponent/TransportMapToolComponent";
import PanelComponent from "../../Modules/AngularMaptalksGLModule/Components/PanelComponent/PanelComponent";
import TileLayerDirective from "../../Modules/AngularMaptalksGLModule/Directives/LayerDirectives/TileLayerDirective/TileLayerDirective";
import HttpService from "./Services/HttpService/HttpService";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import CloseButtonComponent from "./Components/UIKitComponents/CloseButtonComponent/CloseButtonComponent";
import ClearButtonComponent from "./Components/UIKitComponents/ClearButtonComponent/ClearButtonComponent";
import TitlePanelComponent from "./Components/UIKitComponents/TitlePanelComponent/TitlePanelComponent";
import RoadStateMapToolComponent from "./MapToolComponents/RoadStateMapToolComponent/RoadStateMapToolComponent";
import { NzSelectModule } from "ng-zorro-antd/select";
import TruckIconComponent from "./Components/UIKitComponents/IconsComponents/TruckIconComponent/TruckIconComponent";

@NgModule({
  declarations: [
    MapComponent,
    TransportMapToolComponent,
    PanelComponent,
    EdgeMapToolComponent,
    TileLayerDirective,
    CloseButtonComponent,
    ClearButtonComponent,
    TitlePanelComponent,
    RoadStateMapToolComponent,
    TruckIconComponent,
  ],
  exports: [
    RoadStateMapToolComponent,
    MapComponent,
    TransportMapToolComponent,
    PanelComponent,
    EdgeMapToolComponent,
    TileLayerDirective,
  ],
  providers: [HttpService],
  imports: [NzButtonModule, NzIconModule, NzSelectModule],
})
export default class AngularMaptalksGLModule {}
