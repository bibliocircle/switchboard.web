import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const application = createSlice({
  name: "application",
  initialState: {
    breadcrumbs: [],
    alerts: [],
  },
  reducers: {
    setBreadcrumbs(state, { payload }) {
      state.breadcrumbs = payload;
    },
    createAlert(state, { payload }) {
      state.alerts = [
        ...state.alerts,
        {
          id: v4(),
          type: payload.type,
          message: payload.message,
          autoHideDuration: payload.autoHideDuration,
        },
      ];
    },
    removeAlert(state, { payload: alertId }) {
      state.alerts = state.alerts.filter((alert) => alert.id !== alertId);
    },
  },
});
export const BREADCRUMBS_SELECTOR = (state) => state.application.breadcrumbs;
export const ALERTS_SELECTOR = (state) => state.application.alerts;
export const { setBreadcrumbs, createAlert, removeAlert } = application.actions;
export default application.reducer;
