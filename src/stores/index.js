import { createPersistedState } from "pinia-plugin-persistedstate";
const stores = createPinia();
// 本地持久化
stores.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
    storage: sessionStorage,
    // debug: true
  })
);

export default stores;
