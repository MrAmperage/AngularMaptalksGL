import { NgModule } from "@angular/core";
import MapComponent from "./Components/MapComponent/MapComponent";
import EdgeMapToolComponent from "../../Modules/AngularMaptalksGLModule/MapToolComponents/EdgeMapToolComponent/EdgeMapToolComponent";
import TransportMapToolComponent from "../../Modules/AngularMaptalksGLModule/MapToolComponents/TransportMapToolComponent/TransportMapToolComponent";
import PanelComponent from "../../Modules/AngularMaptalksGLModule/Components/PanelComponent/PanelComponent";
import TileLayerDirective from "../../Modules/AngularMaptalksGLModule/Directives/LayerDirectives/TileLayerDirective/TileLayerDirective";
import HttpService from "./Services/HttpService/HttpService";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import CloseButtonComponent from "./Components/UIKitComponents/CloseButtonComponent/CloseButtonComponent";
import ClearButtonComponent from "./Components/UIKitComponents/ClearButtonComponent/ClearButtonComponent";
import TitlePanelComponent from "./Components/UIKitComponents/TitlePanelComponent/TitlePanelComponent";
import RoadStateMapToolComponent from "./MapToolComponents/RoadStateMapToolComponent/RoadStateMapToolComponent";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTreeModule } from "ng-zorro-antd/tree";
import TruckIconComponent from "./Components/UIKitComponents/IconsComponents/TruckIconComponent/TruckIconComponent";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import TripIconComponent from "./Components/UIKitComponents/IconsComponents/TripIconComponent/TripIconComponent";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import TimeIntervalSelectorComponent from "./Components/UIKitComponents/TimeIntervalSelectorComponent/TimeIntervalSelectorComponent";
import ToolbarMapToolComponent from "./MapToolComponents/ToolbarMapToolComponent/ToolbarMapToolComponent";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { FormsModule } from "@angular/forms";
import ArrayToSelectOptionPipe from "./Pipe/ArrayToSelectOptionPipe/ArrayToSelectOptionPipe";
import { CommonModule } from "@angular/common";
import ItemListComponent from "./Components/UIKitComponents/ItemListComponent/ItemListComponent";
import DefaultItemComponent from "./Components/UIKitComponents/DefaultItemComponent/DefaultItemComponent";
import { NzSpinModule } from "ng-zorro-antd/spin";
import GeozoneMapToolComponent from "./MapToolComponents/GeozoneMapToolComponent/GeozoneMapToolComponent";

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
    TripIconComponent,
    TimeIntervalSelectorComponent,
    ToolbarMapToolComponent,
    ArrayToSelectOptionPipe,
    ItemListComponent,
    DefaultItemComponent,
    GeozoneMapToolComponent,
  ],
  exports: [
    RoadStateMapToolComponent,
    MapComponent,
    TransportMapToolComponent,
    PanelComponent,
    EdgeMapToolComponent,
    TileLayerDirective,
    ToolbarMapToolComponent,
    GeozoneMapToolComponent,
  ],
  providers: [HttpService],
  imports: [
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzDatePickerModule,
    FormsModule,
    CommonModule,
    NzCheckboxModule,
    NzSpinModule,
    NzTreeModule,
  ],
})
export default class AngularMaptalksGLModule {}
