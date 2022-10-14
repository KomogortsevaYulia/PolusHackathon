import React from "react";
import "./FreeTransportPage.style.css"
window.ymaps.ready(function () {
  // Указывается идентификатор HTML-элемента.
  var moscow_map = new window.ymaps.Map("first_map", {
    center: [55.76, 37.64],
    zoom: 10,
  });
  // Ссылка на элемент.
  var piter_map = new window.ymaps.Map(document.getElementsByTagName("p")[2], {
    center: [59.94, 30.32],
    zoom: 9,
  });
});

const FreeTransportPage = () => {
  return (
    <>
      <div className="row align-items-stretch containerCustomer d-flex">
        <div className="col-auto ">
          <div className="row ">
            <span className="text">Фильтры</span>
          </div>
          <div className="row ">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked
              />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">
                Специальная техника
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
              />
              <label className="btn btn-outline-primary" htmlFor="btnradio2">
                Грузопассажирский транспорт
              </label>
            </div>
          </div>
        </div>
        <div className="col order-last d-flex h-100 d-inline-block">
          <div id="first_map" style={{ width: '100%', height: '50vh' }}></div>
        </div>
      </div>
      <div className="row align-items-stretch containerCustomer d-flex">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </div>
      </div>

    </>
  );
};

export default FreeTransportPage;
