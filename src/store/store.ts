import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "#modules/theme/theme.reducer.ts";
import projectReducer from "#modules/projects/project.reducer.ts";
import tasksReducer from "#modules/tasks/tasks.reducer.ts";

const rootReducer = combineReducers({
  theme: themeReducer,
  projects: projectReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/REGISTER"],
      },
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
