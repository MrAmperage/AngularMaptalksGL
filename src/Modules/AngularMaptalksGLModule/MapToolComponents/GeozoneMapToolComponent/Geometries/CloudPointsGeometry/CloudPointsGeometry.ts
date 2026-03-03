import { MultiPoint } from "maptalks-gl";
import {
  CloudPoints,
  GeozoneMapToolOptions,
} from "../../GeozoneMapToolComponentTypes";
// TODO Вынести общее из геометрий контейнеров в родительский класс
export default class CloudPointsGeometry extends MultiPoint {
  readonly TextSymbol = {
    textHorizontalAlignment: "middle",
    textVerticalAlignment: "middle",
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  CloudPoints: CloudPoints;
  Options: GeozoneMapToolOptions;
  constructor(CloudPoints: CloudPoints, Options: GeozoneMapToolOptions) {
    super(
      CloudPoints.features.map((Feature) => {
        return Feature.geometry.coordinates;
      }),
      {
        id: CloudPoints.id.$uuid,
      },
    );
    this.CloudPoints = CloudPoints;
    this.Options = Options;
    this.setSymbol(this.GenerateSymbol());
  }
  override getJSONType(): string {
    return "CloudPointsGeometry";
  }
  //TODO Переписать
  GenerateSymbol(): any {
    let Symbols: any[] = [];
    switch (this.CloudPoints.features[0].properties.symbol) {
      case 1:
        Symbols.push({
          markerFill: this.CloudPoints.features[0].properties.style.markerFill,
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerLineWidth: 0,
          markerType: "ellipse",
        });
        break;
      case 2:
        Symbols.push({
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerLineWidth: 1,
          markerType: "ellipse",
          markerFillOpacity: 0,
        });
        break;

      case 3:
        Symbols.push({
          markerFill: "#ffffff",
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerLineWidth: 1,
          markerType: "ellipse",
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;

      case 4:
        Symbols = Symbols.concat([
          {
            markerHeight:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerWidth:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerLineWidth: 1,
            markerType: "ellipse",
            markerFillOpacity: 0,
            markerLineColor:
              this.CloudPoints.features[0].properties.style.markerFill,
          },
          {
            markerHeight: 2,
            markerWidth: 2,
            markerType: "ellipse",
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
          },
        ]);
        break;

      case 5:
        Symbols = Symbols.concat([
          {
            markerFill: "#ffffff",
            markerHeight:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerWidth:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerLineWidth: 1,
            markerType: "ellipse",
            markerFillOpacity: 1,
            markerLineColor:
              this.CloudPoints.features[0].properties.style.markerFill,
          },
          {
            markerHeight: 2,
            markerWidth: 2,
            markerType: "ellipse",
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
          },
        ]);
        break;

      case 6:
        Symbols = Symbols.concat([
          {
            markerHeight:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerWidth:
              this.CloudPoints.features[0].properties.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerType: "cross",
            markerLineColor:
              this.CloudPoints.features[0].properties.style.markerFill,
            markerLineWidth: 1,
          },
        ]);
        break;

      case 7:
        Symbols.push({
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "x",
          markerLineWidth: 1,
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;
      case 8:
        Symbols.push({
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "triangle",
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
          markerFill: this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;

      case 9:
        Symbols.push({
          markerHeight:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerWidth:
            this.CloudPoints.features[0].properties.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "triangle",
          markerFill: "#ffffff",
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;
      case 10:
        Symbols.push({
          markerType: "bar",
          markerHeight: 15,
          markerWidth: 15,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerFill: this.CloudPoints.features[0].properties.style.markerFill,
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;

      case 11:
        Symbols.push({
          markerType: "bar",
          markerHeight: 15,
          markerWidth: 15,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerFill: "#ffffff",
          markerLineColor:
            this.CloudPoints.features[0].properties.style.markerFill,
        });
        break;
    }
    if (this.Options.IsShowName) {
      Symbols.push({
        ...{ textName: this.CloudPoints.properties.name },
        ...this.TextSymbol,
      });
    }

    return Symbols;
  }
}
