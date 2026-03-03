import { TextMarker } from "maptalks-gl";
import BasePolygon from "../../../../Abstractions/BasePolygon/BasePolygon";
import {
  Geozone,
  GeozoneMapToolOptions,
} from "../../GeozoneMapToolComponentTypes";
/*Геометрия для отображения геозон*/
export default class GeozoneGeometry extends BasePolygon {
  CaptionMarker: TextMarker | undefined = undefined;
  override DefaultSymbol: any = {};
  readonly TextSymbol = {
    textHorizontalAlignment: "middle",
    textVerticalAlignment: "middle",
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  readonly CaptionSymbol = {
    textHorizontalAlignment: "middle",
    textVerticalAlignment: "middle",
    textFaceName: "Arial",
  };
  readonly GeozoneStaticGeometrySymbol = {
    lineColor: "blue",
    polygonFill: "lightblue",
    polygonOpacity: 0.5,
  };
  readonly DrillingRockContourSymbol = {
    lineDasharray: [10, 10],
    lineOpacity: 0.5,
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };
  readonly ConturGeometrySymbol = {
    lineOpacity: 0.5,
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };

  /*Стили для геозоны типа "Проект бурения" */
  readonly GeozoneDrillingBlockSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };

  /*Стили для геозоны типа "Запретная зона"  */
  readonly GeozoneRestrictedGeometrySymbol = {
    lineColor: "red",
    polygonFill: "lightcoral",
    polygonOpacity: 0.25,
  };

  /*Стили для геозоны типа "Статический типизированный объект"*/
  readonly GeozoneTypedStaticObjectSymbol = {
    lineColor: "lightgray",
    polygonFill: "#5c5bf8",
    polygonOpacity: 0.5,
  };
  readonly BlastBlockSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };

  readonly GridDrillSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };
  readonly BlastGridSymbol = {
    lineColor: "black",
    lineWidth: 3,
    polygonOpacity: 0.5,
  };
  readonly GeozoneUnloadSymbol = {
    lineColor: "green",
    polygonFill: "lightgreen",
    polygonOpacity: 0.5,
  };
  Geozone: Geozone;
  Options: GeozoneMapToolOptions;
  constructor(Geozone: Geozone, Options: GeozoneMapToolOptions) {
    super(Geozone.location);
    this.Geozone = Geozone;
    this.Options = Options;
    this.GenerateCaptionMarker();
    if (this.CaptionMarker !== undefined && this.Options.IsShowCaption) {
      this.Options.PointLayer.addGeometry(this.CaptionMarker);
    }
    this.setId(this.Geozone.id.$uuid);
  }
  override GenerateSymbol() {
    const Symbols: any[] = [];
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
      NewGeozoneSymbol = { ...NewGeozoneSymbol, ...this.Geozone.style };
    }
    Symbols.push(NewGeozoneSymbol);

    if (this.Options.IsShowName) {
      Symbols.push({
        ...this.TextSymbol,
        ...{ textName: this.Geozone.properties.name },
      });
    }
    return Symbols;
  }
  GenerateCaptionMarker() {
    if (
      this.Geozone.title_properties !== null &&
      this.Geozone.title_properties.location.coordinates[0] !== 0 &&
      this.Geozone.title_properties.location.coordinates[1] !== 0
    ) {
      this.CaptionMarker = new TextMarker(
        this.Geozone.title_properties.location.coordinates,
        {
          symbol: {
            ...this.CaptionMarker,
            ...this.Geozone.title_properties.style,
            ...{ textName: this.Geozone.properties.description },
          },
        },
      );
    }
  }
  ChangeShowName(IsShow: boolean) {
    this.Options.IsShowName = IsShow;
    this.setSymbol(this.GenerateSymbol());
  }

  ChangeShowCaption(IsShow: boolean) {
    this.Options.IsShowCaption = IsShow;
    if (this.CaptionMarker !== undefined) {
      if (this.Options.IsShowCaption) {
        this.Options.PointLayer.addGeometry(this.CaptionMarker);
      } else {
        this.Options.PointLayer.removeGeometry(this.CaptionMarker);
      }
    }
  }
  override getJSONType(): string {
    return "GeozoneGeometry";
  }
}
