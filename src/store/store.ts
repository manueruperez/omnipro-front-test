import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "#modules/theme/theme.reducer.ts";
// import projectReducer from "#modules/projects/project.reducer"; // Ejemplo de otro slice

const store = configureStore({
  reducer: {
    theme: themeReducer,
    // project: projectReducer,
    // Agrega más slices según necesites
  },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
