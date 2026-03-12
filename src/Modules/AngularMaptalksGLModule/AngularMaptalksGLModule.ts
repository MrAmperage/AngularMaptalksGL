import { NgModule } from "@angular/core";
import MapComponent from "./Components/MapComponent/MapComponent";
import PanelComponent from "../../Modules/AngularMaptalksGLModule/Components/PanelComponent/PanelComponent";
import TileLayerDirective from "../../Modules/AngularMaptalksGLModule/Directives/LayerDirectives/TileLayerDirective/TileLayerDirective";
import ToolbarMapToolComponent from "./MapToolComponents/ToolbarMapToolComponent/ToolbarMapToolComponent";
import GLTFLayerDirective from "./Directives/LayerDirectives/GLTFLayerDirective/GLTFLayerDirective";

@NgModule({
  declarations: [
    MapComponent,
    PanelComponent,
    TileLayerDirective,
    ToolbarMapToolComponent,
    GLTFLayerDirective,
  ],
  exports: [
    MapComponent,
    PanelComponent,
    TileLayerDirective,
    ToolbarMapToolComponent,
    GLTFLayerDirective,
  ],
  imports: [],
})
export default class AngularMaptalksGLModule {}
