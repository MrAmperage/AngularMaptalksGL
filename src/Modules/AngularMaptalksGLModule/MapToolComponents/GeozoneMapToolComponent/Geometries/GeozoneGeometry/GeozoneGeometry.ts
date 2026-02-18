import PolygonGeometry from "../../../../Abstractions/PolygonGeometry/PolygonGeometry";
import { Geozone } from "../../GeozoneMapToolComponentTypes";
/*Геометрия для отображения геозон*/
export default class GeozoneGeometry extends PolygonGeometry {
  readonly GeozoneStaticGeometrySymbol = {
    lineColor: "blue",
    polygonFill: "lightblue",
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly DrillingRockContourSymbol = {
    lineDasharray: [10, 10],
    lineOpacity: 0.5,
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly ConturGeometrySymbol = {
    lineOpacity: 0.5,
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };

  /*Стили для геозоны типа "Проект бурения" */
  readonly GeozoneDrillingBlockSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };

  /*Стили для геозоны типа "Запретная зона"  */
  readonly GeozoneRestrictedGeometrySymbol = {
    lineColor: "red",
    polygonFill: "lightcoral",
    polygonOpacity: 0.25,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };

  /*Стили для геозоны типа "Статический типизированный объект"*/
  readonly GeozoneTypedStaticObjectSymbol = {
    lineColor: "lightgray",
    polygonFill: "#5c5bf8",
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly BlastBlockSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };

  readonly GridDrillSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly BlastGridSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly GeozoneUnloadSymbol = {
    lineColor: "green",
    polygonFill: "lightgreen",
    polygonOpacity: 0.5,
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  Geozone: Geozone;
  constructor(Geozone: Geozone) {
    super(Geozone.location);
    this.Geozone = Geozone;
    this.setId(this.Geozone.id.$uuid);
  }
  override GenerateSymbol() {
    let NewGeozoneSymbol = null;
    switch (this.Geozone.type) {
      case "DrillingBlock":
        NewGeozoneSymbol = this.GeozoneDrillingBlockSymbol;
        break;
      case "DrillingBlockContour":
        NewGeozoneSymbol = this.ConturGeometrySymbol;
        break;
      case "RestrictedGeometry":
        NewGeozoneSymbol = this.GeozoneRestrictedGeometrySymbol;
        break;

      case "StaticGeometry":
        NewGeozoneSymbol = this.GeozoneStaticGeometrySymbol;
        break;

      case "TypedStaticObject":
        NewGeozoneSymbol = this.GeozoneTypedStaticObjectSymbol;
        break;
      case "Unload":
        NewGeozoneSymbol = this.GeozoneUnloadSymbol;
        break;
      case "BlastBlock":
        NewGeozoneSymbol = this.BlastBlockSymbol;
        break;
      case "BlastBlockContour":
        NewGeozoneSymbol = this.ConturGeometrySymbol;
        break;
      case "DrillGrid":
        NewGeozoneSymbol = this.GridDrillSymbol;
        break;
      case "BlastGrid":
        NewGeozoneSymbol = this.BlastGridSymbol;
        break;
      case "BlastUserContour":
        NewGeozoneSymbol = this.ConturGeometrySymbol;
        break;
      case "DrillingRockContour":
        NewGeozoneSymbol = this.DrillingRockContourSymbol;
        break;
    }
    if (this.Geozone.style !== null) {
      NewGeozoneSymbol = Object.assign(NewGeozoneSymbol, this.Geozone.style);
    }

    return NewGeozoneSymbol;
  }
  override getJSONType(): string {
    return "GeozoneGeometry";
  }
}
