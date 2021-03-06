import {
  types,
  ReferenceOptionsGetSet,
  Instance,
  IAnyType,
  IReferenceType,
} from "mobx-state-tree";
import { STNValue } from "mobx-state-tree/dist/core/type/type";
import { IObservableArray } from "mobx";

// This could be infered using ReturnType<typeof createRefList> but for
// TS doesn't allow resolving return type of generic functions (smthn like ReturnType<typeof createRefList<T extends IAnyType>>)
export interface RefListInstance<T extends IAnyType> {
  map: IObservableArray<
    STNValue<T["TypeWithoutSTN"], IReferenceType<T>>
  >["map"];
  replace: IObservableArray<
    STNValue<T["TypeWithoutSTN"], IReferenceType<T>>
  >["replace"];
  push: IObservableArray<
    STNValue<T["TypeWithoutSTN"], IReferenceType<T>>
  >["push"];
  array: Instance<T>[];
}

export function createRefList<T extends IAnyType>(
  name: string,
  type: T,
  refOptions?: ReferenceOptionsGetSet<T>
) {
  return types.optional(
    types
      .model(name + "RefList", {
        refList: types.array(
          types.safeReference(type, {
            acceptsUndefined: false,
            ...refOptions,
          })
        ),
      })
      .views((self) => {
        return {
          get array(): Instance<T>[] {
            return (self.refList.toJS() as unknown) as Instance<T>[];
          },
        };
      })
      .actions((self) => {
        return {
          map(
            callbackFn: Parameters<typeof self.refList.map>["0"],
            thisArg?: Parameters<typeof self.refList.map>["1"]
          ) {
            return self.refList.map(callbackFn, thisArg);
          },
          replace(newItems: Parameters<typeof self.refList.replace>["0"]) {
            return self.refList.replace(newItems);
          },
          push(...items: Parameters<typeof self.refList.push>) {
            return self.refList.push(...items);
          },
          unshift(...items: Parameters<typeof self.refList.unshift>) {
            return self.refList.unshift(...items);
          },
        };
      }),
    {}
  );
}
