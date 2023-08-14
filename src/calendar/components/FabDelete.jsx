import { addHours } from "date-fns/esm";
import React from "react";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      disabled={!hasEventSelected}
      onClick={handleClickDelete}
      className="btn btn-danger fab-danger"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
