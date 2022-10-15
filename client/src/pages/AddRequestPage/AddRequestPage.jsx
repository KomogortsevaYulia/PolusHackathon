import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddRequestPage.style.css";



const AddRequestPage = () => {

  React.useEffect(() => {
    window.ymaps.ready(function () {
      // Указывается идентификатор HTML-элемента.
      var moscow_map = new window.ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10,
      });
      // Ссылка на элемент.
      var piter_map = new window.ymaps.Map(
        document.getElementsByTagName("p")[2],
        {
          center: [59.94, 30.32],
          zoom: 9,
        }
      );
    });
  }, []);


  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const typeRequest = React.useState();

  return <div>
    <div className="row align-items-stretch containerCustomer d-flex boxWhite">
    <div className="row">
    <div className="col">
        <div className="row">
          Тип услуги
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" for="flexRadioDefault1">
              Перевозка
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
            <label className="form-check-label" for="flexRadioDefault2">
              Работа на точке
            </label>
          </div>
        </div>
        <div className="row">
          {
            typeRequest === "Перевозка" ?
              <div>
                Время к которому небходимо забрать груз
                <DatePicker selected={startDate} showTimeSelect onChange={(date) => setStartDate(date)} locale="ru" />
              </div>
              : <div className="row">
                <div className="col-auto">
                  Время работы</div>
                <div className="col-auto">
                  <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={date => setStartDate(date)} locale="ru" showTimeInput
                  />
                </div>
                <div className="col-auto">
                  <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    onChange={date => setEndDate(date)} locale="ru" showTimeInput
                  />
                </div>
              </div>
          }
        </div>
        Транспорт

        <div class="mb-3 row">
          <label for="exampleFormControlTextarea1" class="form-label">Комментарий</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>
      <div className="col order-last d-flex h-100 d-inline-block">
        <div id="first_map" style={{ width: "100%", height: "50vh", borderRadius: "25px" }} ></div>
      </div>
    </div>
    <div className="row">
    <div class="mt-3 row justify-content-md-center">
      <span class="btnAdd text-center">Создать</span>
    </div>
    </div>
    </div>
  </div>;
};

export default AddRequestPage;
