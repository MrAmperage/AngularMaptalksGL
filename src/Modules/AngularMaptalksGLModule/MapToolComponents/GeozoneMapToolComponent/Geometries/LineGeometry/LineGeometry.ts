import {
  GeozoneMapToolOptions,
  Line,
} from "../../GeozoneMapToolComponentTypes";
import BaseLineString from "../../../../Abstractions/BaseLineString/BaseLineString";
/*Класс для отображения линий*/
export default class LineGeometry extends BaseLineString {
  override DefaultSymbol: any = {};
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
  Line: Line;
  constructor(Line: Line, Options: GeozoneMapToolOptions) {
    super(Line.features);
    this.Line = Line;
    this.Options = Options;
    this.setId(this.Line.id.$uuid);
  }
  override GenerateSymbol() {
    const Symbols: any[] = [
      {
        lineColor: this.Line.style.lineColor,
        lineWidth: this.Line.style.lineWidth,
      },
    ];
    if (this.Options.IsShowName) {
      Symbols.push({
        ...this.TextSymbol,
        ...{ textName: this.Line.properties.name },
      });
    }
    return Symbols;
  }

  ChangeShowName(IsShow: boolean) {
    this.Options.IsShowName = IsShow;
    this.setSymbol(this.GenerateSymbol());
  }
  override getJSONType(): string {
    return "LineGeometry";
  }
}
