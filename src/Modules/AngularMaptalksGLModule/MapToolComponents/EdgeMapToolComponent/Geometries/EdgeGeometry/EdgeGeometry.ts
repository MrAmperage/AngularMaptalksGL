import { LineString } from "maptalks-gl";
import { Edge } from "../../EdgeMapToolComponentTypes";

export default class EdgeGeometry extends LineString {
  Edge: Edge;
  constructor(Edge: Edge) {
    super(Edge.path.coordinates, { id: Edge.id.$uuid });
    this.Edge = Edge;
  }

  getJSONType(): string {
    return "EdgeGeometry";
  }
}
