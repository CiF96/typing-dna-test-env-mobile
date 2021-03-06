import {RootStore} from './RootStore';
import {PersistenceStatic} from '~/services/createPersistence';
import {HttpStatic} from '~/services/http/createHttp';

export interface Environment {
  persistence: PersistenceStatic;
  http: HttpStatic;
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);
  await rootStore.authStore.watchToken();

  return rootStore;
}
