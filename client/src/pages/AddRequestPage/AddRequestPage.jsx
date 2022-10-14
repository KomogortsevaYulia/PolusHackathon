import React from "react";

const AddRequestPage = () => {
  return <div>
    <div className="row align-items-stretch containerCustomer d-flex">
      <div className="row">
        Тип услуги(radio)
        Время(начало и конца(при наличии))
        Транспорт


        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label" for="flexRadioDefault1">
            Default radio
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
          <label className="form-check-label" for="flexRadioDefault2">
            Default checked radio
          </label>
        </div>
      </div></div>
  </div>;
};

export default AddRequestPage;
