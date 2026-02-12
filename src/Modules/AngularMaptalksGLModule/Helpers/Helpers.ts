import { Paths } from "../AngularMaptalksGLModuleTypes";

export function GetObjectValueByAdress<ObjectType, ReturnType>(
  Object: ObjectType,
  Address: Paths<ObjectType>,
): ReturnType {
  const NewObject = { ...Object };
  return Address.split(".").reduce(
    (PrevValue, CurrentValue, Index, Array): any => {
      if (Index !== Array.length) {
        if (PrevValue === null) {
          return NewObject[CurrentValue];
        } else {
          return PrevValue[CurrentValue];
        }
      } else {
        return Object[CurrentValue];
      }
    },
    null,
  );
}
