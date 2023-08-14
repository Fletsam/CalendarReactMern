import { addHours } from "date-fns/esm";
import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInSeconds, isDate, set } from "date-fns";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useDispatch } from "react-redux";
import { FabAddNew } from "./FabAddNew";
import { FabDelete } from "./FabDelete";
registerLocale("es", es);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");
export const CalendarModal = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formValue, setFormValue] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValue.title.length > 0 ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValue({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValue({
      ...formValue,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValue.end, formValue.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Horas incorrectas",
        "Las horas de inicio y final no tienen sentido...",
        "error"
      );
      return;
    }
    if (formValue.title.length <= 0) return;
    await startSavingEvent(formValue);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <>
      <Modal
        className="modal"
        overlayClassName="modal-fondo"
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form onSubmit={onSubmit} className="container">
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
            <DatePicker
              locale="es"
              selected={formValue.start}
              className="form-control"
              onChange={(event) => onDateChange(event, "start")}
              dateFormat=" Pp"
              showTimeSelect
              timeCaption="hora"
              timeIntervals={30}
            />
          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
            <DatePicker
              locale="es"
              minDate={formValue.start}
              selected={formValue.end}
              className="form-control"
              onChange={(event) => onDateChange(event, "end")}
              dateFormat=" Pp"
              showTimeSelect
              timeCaption="hora"
              timeIntervals={30}
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValue.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValue.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    
    </>
  );
};
