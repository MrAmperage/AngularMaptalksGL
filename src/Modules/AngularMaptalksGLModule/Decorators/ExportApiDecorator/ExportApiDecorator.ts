export default function ExportApi() {
  return (Target: any, PropertyKey: string, Descriptor: PropertyDescriptor) => {
    if (Target["ApiExport"] === undefined) {
      Target["ApiExport"] = [];
    }
    Target["ApiExport"].push(PropertyKey);
  };
}
