import { Component, Inject, Input } from "@angular/core";
import BaseMapToolDirective from "../BaseMapToolDirective/BaseMapToolDirective";
import {
  TransportMapToolOptions,
  TransportOptionsTreeCheckedKey,
  TransportState,
} from "./TransportMapToolComponentTypes";
import { PointLayer } from "maptalks-gl";
import { LayerConfig } from "../../Configs/LayersConfigs/LayersConfigs";
import MapComponent from "../../Components/MapComponent/MapComponent";
import MapService from "../../Services/MapService/MapService";
import TransportOptionsTreeConfig from "./Configs/TransportOptionsTreeConfig.json";
import MapObjectDataStoreService from "../../Services/DataStoreServices/MapObjectsDataStoreService/MapObjectsDataStoreService";
import HttpService from "../../Services/HttpService/HttpService";
import TransportGeometry from "./Geometries/TransportGeometry/TransportGeometry";
import { NzFormatEmitEvent } from "ng-zorro-antd/tree";
import TransportGroupsOptions from "./Configs/TransportGroupsOptions.json";

@Component({
  selector: "TransportMapToolComponent",
  templateUrl: "TransportMapToolComponent.html",
  standalone: false,
})
export default class TransportMapToolComponent extends BaseMapToolDirective<TransportMapToolOptions> {
  constructor(
    @Inject(MapService)
    private MapServiceInstance: MapService,
    private MapObjectDataStoreService: MapObjectDataStoreService,
    private HttpService: HttpService,
  ) {
    super(MapServiceInstance);
  }

  @Input()
  AutoStart: boolean = false;
  override Id: string = "TransportMapTool";
  //TODO Перенести EventSource в сервис
  EventSource: EventSource | null = null;
  override Options: TransportMapToolOptions = {
    TransportGroupType: "All",
    GroupsOptions: TransportGroupsOptions,
    SelectGeometry: null,
    Transports: [],
    SearchInput: null,
    TransportCheckedKeys: [],
    TransportOptionsTreeCheckedKeys: [
      "AllNameGroup",
      "Course",
      "DangerZoneRadius",
      "ObjectsIcon",
      "ObjectsName",
      "Status",
    ],
    TransportGeometries: [],
    PointLayer: new PointLayer("TransportMapToolPointLayer", LayerConfig),
    TransportOptionsTree: TransportOptionsTreeConfig,
  };
  CacheMapState = new Map<string, TransportState>();
  override InitMapTool(): void {
    this.MapServiceInstance.Map.addLayer(this.Options.PointLayer);
    this.MapObjectDataStoreService.Request().then((Response) => {
      this.UpdateOption({
        Transports: Response,
      });
      if (this.AutoStart) {
        const TransportCheckedKeys: string[] = Response.map((Transport) => {
          return Transport.id.$uuid;
        });
        this.Start(TransportCheckedKeys);
      }
    });
  }
  SetSelectGeometry(Geometry: TransportGeometry) {
    if (this.Options.SelectGeometry !== null) {
      this.Options.SelectGeometry.SetSelect(false);
    }
    this.UpdateOption({ SelectGeometry: Geometry });
    if (this.Options.SelectGeometry !== null) {
      this.Options.SelectGeometry.SetSelect(true);
    }
  }
  ChangeSearchInput(SearchInput: string) {
    this.UpdateOption({ SearchInput: SearchInput });
  }
  Start(CheckedKeys: string[]) {
    this.UpdateOption({
      TransportCheckedKeys: CheckedKeys,
    });

    this.HttpService.RequestTransportState().then((Response) => {
      const TransportGeometries = Response.reduce(
        (
          TransportGeometriesArray: TransportGeometry[],
          TransportState,
        ): TransportGeometry[] => {
          this.CacheMapState.set(TransportState.object_id, TransportState);
          const CurrentTransport = this.Options.Transports.find((Transport) => {
            return (
              this.Options.TransportCheckedKeys.includes(Transport.id.$uuid) &&
              Transport.id.$uuid === TransportState.object_id
            );
          });
          if (CurrentTransport !== undefined) {
            const NewTransportGeometry = new TransportGeometry(
              CurrentTransport,
              TransportState,
              this.Options,
            );
            NewTransportGeometry.on(
              "click",
              this.TransportGeometrySelectHandler,
            );
            TransportGeometriesArray.push(NewTransportGeometry);
          }
          return TransportGeometriesArray;
        },
        [],
      );
      this.UpdateOption({ TransportGeometries: TransportGeometries });
      this.Options.PointLayer.addGeometry(this.Options.TransportGeometries);
      this.HttpService.RequestTransportStateTicket().then((Response) => {
        this.InitEventSource(Response.ticket);
      });
    });
  }
  //TODO Переписать без обработчика
  TransportGeometrySelectHandler = (Event: any) => {
    if (Event !== undefined) {
      const Geometry = Event.target;
      this.SetSelectGeometry(Geometry);
    }
  };
  ChangeShowName(IsShowName: boolean) {
    if (IsShowName) {
      const NewCheckedKeys =
        this.Options.TransportOptionsTreeCheckedKeys.concat("ObjectsName");
      this.UpdateOption({
        TransportOptionsTreeCheckedKeys: NewCheckedKeys,
      });
    } else {
      const NewCheckedKeys =
        this.Options.TransportOptionsTreeCheckedKeys.filter((Key) => {
          return Key !== "ObjectsName";
        });
      this.UpdateOption({
        TransportOptionsTreeCheckedKeys: NewCheckedKeys,
      });
    }

    this.Options.TransportGeometries.forEach((TransportGeometry) => {
      TransportGeometry.ChangeShowName(IsShowName);
    });
  }
  CheckOptionsTreeNode(Event: NzFormatEmitEvent) {
    if (Event.node !== null && Event.node !== undefined) {
      const CheckedKey = Event.node.key as TransportOptionsTreeCheckedKey;
      switch (CheckedKey) {
        case "AllNameGroup":
          break;
        case "Course":
          break;
        case "DangerZoneRadius":
          break;
        case "ObjectsIcon":
          break;
        case "ObjectsName":
          this.ChangeShowName(Event.node.isChecked);
          break;
        case "Status":
          break;
      }
    }
  }
  TransportStateHandler = (TransportState: TransportState) => {
    this.CacheMapState.set(TransportState.object_id, TransportState);
    const CurrentTransportGeometry = this.Options.TransportGeometries.find(
      (TransportGeometry) => {
        return TransportGeometry.getId() === TransportState.object_id;
      },
    );

    if (CurrentTransportGeometry !== undefined) {
      CurrentTransportGeometry.UpdateState(TransportState);
    }
  };

  InitEventSource(Ticket: string) {
    this.EventSource = this.HttpService.SubscribeTransportStateSource(
      Ticket,
      this.TransportStateHandler,
      5000,
    );
  }

  AddTransportByKeys(Keys: string[]) {
    const AddedTransportGeometries = Keys.reduce(
      (TransportGeometries: TransportGeometry[], Key) => {
        const CurrentState = this.CacheMapState.get(Key);
        const CurrentTransport = this.Options.Transports.find((Transport) => {
          return Transport.id.$uuid === Key;
        });
        if (
          CurrentState !== undefined &&
          CurrentTransport &&
          !this.Options.TransportCheckedKeys.includes(Key)
        ) {
          const TransportGeometryObject = new TransportGeometry(
            CurrentTransport,
            CurrentState,
            this.Options,
          );
          TransportGeometryObject.on(
            "click",
            this.TransportGeometrySelectHandler,
          );
          TransportGeometries.push(TransportGeometryObject);
        }
        return TransportGeometries;
      },
      [],
    );
    this.Options.PointLayer.addGeometry(AddedTransportGeometries);
    const NewTransportGeometries = this.Options.TransportGeometries.concat(
      AddedTransportGeometries,
    );
    this.UpdateOption({ TransportGeometries: NewTransportGeometries });
    this.UpdateCheckedKeys();
  }
  RemoveTransportByKeys(Keys: string[]) {
    const RemovedTransportGeometries: TransportGeometry[] = [];
    const NewTransportGeozoneGeometies: TransportGeometry[] = [];
    this.Options.TransportGeometries.forEach((Geometry) => {
      if (Keys.includes(Geometry.getId())) {
        RemovedTransportGeometries.push(Geometry);
      } else {
        NewTransportGeozoneGeometies.push(Geometry);
      }
    });
    this.Options.PointLayer.removeGeometry(RemovedTransportGeometries);
    this.UpdateOption({
      TransportGeometries: NewTransportGeozoneGeometies,
    });
    this.UpdateCheckedKeys();
  }
  UpdateCheckedKeys() {
    const CheckedKeys = this.Options.TransportGeometries.map(
      (TransportGeometry) => {
        return TransportGeometry.getId();
      },
    );

    this.UpdateOption({ TransportCheckedKeys: CheckedKeys });
  }
  CheckTreeNode(Event: NzFormatEmitEvent) {
    if (
      Event.node !== undefined &&
      Event.node !== null &&
      Event.node.children.length === 0
    ) {
      if (Event.node.isChecked) {
        this.AddTransportByKeys([Event.node.key]);
      } else {
        this.RemoveTransportByKeys([Event.node.key]);
      }
    }
  }
  ClickTreeNode(Event: NzFormatEmitEvent) {
    if (
      Event.node !== undefined &&
      Event.node !== null &&
      Event.node.children.length === 0
    ) {
      this.FitExtentByGeometryId(Event.node.key, this.Options.PointLayer);
    }
  }
}
