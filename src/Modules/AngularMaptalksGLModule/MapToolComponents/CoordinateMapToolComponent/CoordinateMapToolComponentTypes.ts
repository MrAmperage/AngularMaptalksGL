export type CoordinateMapToolOptions = {
  Id: string;
  Latitude: number | null;
  Longitude: number | null;
  CoordinatesType: CoordinatesType;
  IsShowCenter: boolean;
};

export type CoordinatesType = "Local" | "Geographic";
