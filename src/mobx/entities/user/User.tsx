import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

// import { DateTime } from "~/mobx/util-models/DateTime";

export interface UserInstance extends Instance<typeof User> {}
export interface UserSnapshotIn extends SnapshotIn<typeof User> {}
export interface UserSnapshotOut extends SnapshotOut<typeof User> {}

export const User = types.model("User", {
  id: types.identifier,
  name: types.string,
  last_name: types.string,
  email: types.string,
  // email_verified_at: types.maybeNull(DateTime),
  // created_at: DateTime,
  // updated_at: DateTime,
});
