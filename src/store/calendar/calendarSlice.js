import { createSlice } from "@reduxjs/toolkit";
import addHours from "date-fns/addHours";

/* const tempEvent = {
  id: new Date().getTime(),
  title: "Cumpleanos",
  notes: "comer pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    id: "123",
    name: "Luis",
  },
};
 */
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onDeleteEvent: (state, { payload }) => {
      if (!state.activeEvent) return;
      state.events = state.events.filter(
        (event) => state.activeEvent.id !== event.id
      );
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (payload.id === event.id) {
          return payload;
        }
        return event;
      });
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(events);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});
export const {
  onSetActiveEvent,
  onLogoutCalendar,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} = calendarSlice.actions;
