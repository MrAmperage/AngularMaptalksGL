import { Marker } from "maptalks-gl";
import {
  Transport,
  TransportMapToolOptions,
  TransportState,
} from "../../TransportMapToolComponentTypes";

//TODO добавить общий класс для одиночных точек (В том числе и транспорта)
export default class TransportGeometry extends Marker {
  IsSelect: boolean = false;
  readonly Symbol = {
    markerWidth: 32,
    markerHeight: 32,
    markerFile: "assets/Image/TruckMoveEmpty.png",
    markerHorizontalAlignment: "middle",
    markerVerticalAlignment: "middle",
  };
  readonly SelectSymbol = {
    markerWidth: 32,
    markerHeight: 32,
    markerType: "ellipse",
    markerFillOpacity: 0,
    markerLineColor: "#0091ff",
    markerLineWidth: 9,
    markerHorizontalAlignment: "middle",
    markerVerticalAlignment: "middle",
    markerLineOpacity: 0.5,
  };
  readonly NameSymbol = {
    textSize: 10,
    textFaceName: "Arial",
    textDy: 25,
    textHaloFill: "#fff",
    textHaloRadius: 2,
  };
  readonly CourseSymbol = {
    markerFile: "/assets/Image/Course.png",
    markerWidth: 42,
    markerHeight: 42,
    markerHorizontalAlignment: "middle",
    markerVerticalAlignment: "middle",
  };
  Transport: Transport;
  TransportState: TransportState;
  Options: TransportMapToolOptions;
  constructor(
    Transport: Transport,
    TransportState: TransportState,
    Options: TransportMapToolOptions,
  ) {
    super([TransportState.location[0], TransportState.location[1]], {
      id: Transport.id.$uuid,
    });
    this.Transport = Transport;
    this.TransportState = TransportState;
    this.Options = Options;
    this.on("add", () => {
      this.setSymbol(this.GenerateSymbol());
    });
  }

  override getJSONType(): string {
    return "TransportGeometry";
  }
  UpdateState(TransportState: TransportState) {
    this.TransportState = TransportState;
    this.setCoordinates([
      this.TransportState.location[0],
      this.TransportState.location[1],
    ]);
    this.setSymbol(this.GenerateSymbol());
  }
  SetSelect(IsSelect: boolean) {
    this.IsSelect = IsSelect;
    this.setSymbol(this.GenerateSymbol());
  }
  ChangeShowName(IsShow: boolean) {
    if (IsShow) {
      this.Options.TransportOptionsTreeCheckedKeys.push("ObjectsName");
    } else {
      this.Options.TransportOptionsTreeCheckedKeys =
        this.Options.TransportOptionsTreeCheckedKeys.filter((Key) => {
          return Key !== "ObjectsName";
        });
    }
    this.setSymbol(this.GenerateSymbol());
  }
  GenerateSymbol() {
    const Symbols: any[] = [];
    if (this.Options.TransportOptionsTreeCheckedKeys.includes("ObjectsIcon")) {
      if (this.Transport.icon !== null) {
        Symbols.push({
          ...this.Symbol,
          ...{
            markerFile: `s3/icons/${this.Transport.icon.$uuid}.png`,
          },
        });
      } else {
        Symbols.push(this.Symbol);
      }
    }
    if (this.Options.TransportOptionsTreeCheckedKeys.includes("ObjectsName")) {
      Symbols.push({
        ...this.NameSymbol,
        ...{ textName: this.Transport.name },
      });
    }
    if (this.Options.TransportOptionsTreeCheckedKeys.includes("Course")) {
      const Radians = (this.TransportState.course * Math.PI) / 180;
      const Offset = 5;
      Symbols.push({
        ...this.CourseSymbol,
        markerRotation: this.TransportState.course,
        markerDx: Math.sin(Radians) * Offset,
        markerDy: -Math.cos(Radians) * Offset,
      });
    }
    if (this.IsSelect) {
      Symbols.push(this.SelectSymbol);
    }
    return Symbols;
  }
}
