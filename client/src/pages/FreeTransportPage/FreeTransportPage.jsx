import React from "react";

const FreeTransportPage = () => {

  window.ymaps.ready(function () {
    // Указывается идентификатор HTML-элемента.
    var moscow_map = new window.ymaps.Map("first_map", {
      center: [55.76, 37.64],
      zoom: 10
    });
    // Ссылка на элемент.
    var piter_map = new window.ymaps.Map(document.getElementsByTagName('p')[2], {
      center: [59.94, 30.32],
      zoom: 9
    });
  });

  return <>

    <div className="row">
      <div className="col-auto">

        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
          <label className="btn btn-outline-primary" for="btnradio1">Специальная техника</label>
          <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
          <label className="btn btn-outline-primary" for="btnradio2">Грузопассажирский транспорт</label>
        </div>
      </div>
      <div className="col-5">
        <div id="first_map" style="width:400px; height:300px"></div>
        <p>Карта Санкт-Петербурга</p>
        <p style="width:400px; height:200px"></p>
      </div>
    </div>
  </>;
};

export default FreeTransportPage;
