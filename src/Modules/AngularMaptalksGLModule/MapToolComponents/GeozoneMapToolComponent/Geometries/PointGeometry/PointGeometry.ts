import { Marker } from "maptalks-gl";
import {
  GeozoneMapToolOptions,
  Point,
} from "../../GeozoneMapToolComponentTypes";

/*Класс для отображения точек */
export default class PointGeometry extends Marker {
  Options: GeozoneMapToolOptions;
  readonly TextSymbol = {
    textHorizontalAlignment: "middle",
    textVerticalAlignment: "middle",
    textSize: 10,
    textFaceName: "Arial",
    textDy: 10,
    textHaloFill: "#fff",
    textHaloRadius: 3,
  };
  Point: Point;
  constructor(Point: Point, Options: GeozoneMapToolOptions) {
    super(Point.feature.geometry.coordinates, { id: Point.id.$uuid });
    this.Options = Options;
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
    this.Point = Point;
  }
  override getJSONType(): string {
    return "PointGeometry";
  }
  ChangeShowName(IsShowName: boolean) {
    this.Options.IsShowName = IsShowName;
    this.setSymbol(this.GenerateSymbol());
  }
  //TODO Переписать
  GenerateSymbol(): any {
    let Symbols: any[] = [];
    switch (this.Point.feature.properties.symbol) {
      case 1:
        Symbols.push({
          markerFill: this.Point.style.markerFill,
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerLineWidth: 0,
          markerType: "ellipse",
        });
        break;
      case 2:
        Symbols.push({
          markerLineColor: this.Point.style.markerFill,
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
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
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerLineWidth: 1,
          markerType: "ellipse",
          markerLineColor: this.Point.style.markerFill,
        });
        break;

      case 4:
        Symbols = Symbols.concat([
          {
            markerHeight: this.Point.style.markerHeight,
            markerWidth: this.Point.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerLineWidth: 1,
            markerType: "ellipse",
            markerFillOpacity: 0,
            markerLineColor: this.Point.style.markerFill,
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
            markerHeight: this.Point.style.markerHeight,
            markerWidth: this.Point.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerLineWidth: 1,
            markerType: "ellipse",
            markerFillOpacity: 1,
            markerLineColor: this.Point.style.markerFill,
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
            markerHeight: this.Point.style.markerHeight,
            markerWidth: this.Point.style.markerHeight,
            markerHorizontalAlignment: "middle",
            markerVerticalAlignment: "middle",
            markerType: "cross",
            markerLineColor: this.Point.style.markerFill,
            markerLineWidth: 1,
          },
        ]);
        break;

      case 7:
        Symbols.push({
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "x",
          markerLineWidth: 1,
          markerLineColor: this.Point.style.markerFill,
        });
        break;
      case 8:
        Symbols.push({
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "triangle",
          markerLineColor: this.Point.style.markerFill,
          markerFill: this.Point.style.markerFill,
        });
        break;

      case 9:
        Symbols.push({
          markerHeight: this.Point.style.markerHeight,
          markerWidth: this.Point.style.markerHeight,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerType: "triangle",
          markerFill: "#ffffff",
          markerLineColor: this.Point.style.markerFill,
        });
        break;
      case 10:
        Symbols.push({
          markerType: "bar",
          markerHeight: 15,
          markerWidth: 15,
          markerHorizontalAlignment: "middle",
          markerVerticalAlignment: "middle",
          markerFill: this.Point.style.markerFill,
          markerLineColor: this.Point.style.markerFill,
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
          markerLineColor: this.Point.style.markerFill,
        });
        break;
    }
    if (this.Options.IsShowName) {
      Symbols.push({
        ...{ textName: this.Point.properties.name },
        ...this.TextSymbol,
      });
    }

    return Symbols;
  }
}
