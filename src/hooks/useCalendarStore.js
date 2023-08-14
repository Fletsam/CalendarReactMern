import { addHours } from "date-fns/esm";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogout,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { calendarApi } from "../api";
import { convertEventstoDateEvents } from "../helpers";
import Swal from "sweetalert2";
export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } else {
        const { data } = await calendarApi.post("/events", calendarEvent);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al Guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (activeEvent.id) {
        await calendarApi.delete(`/events/${activeEvent.id}`);
        dispatch(onDeleteEvent(activeEvent.id));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al Borrar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      console.log({ data });
      const events = convertEventstoDateEvents(data.eventos);
      console.log(events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  const startLogout = () => {
    localStorage.clear();

    dispatch(onLogoutCalendar());
    dispatch(onLogout());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
    startLogout,
  };
};
