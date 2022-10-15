import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { init } from "../../utils/yamap";
import "./AddRequestPage.style.css";

const AddRequestPage = () => {
  React.useEffect(() => {
    window.ymaps.ready(function () {
      // Указывается идентификатор HTML-элемента.
      var myMap;
      myMap = new window.ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10,
      });

      var location = window.ymaps.geolocation;

      // Получение местоположения и автоматическое отображение его на карте.
      location
        .get({
          mapStateAutoApply: true,
        })
        .then(
          function (result) {
            // Получение местоположения пользователя.
            var userAddress = result.geoObjects.get(0).properties.get("text");
            var userCoodinates = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            // Пропишем полученный адрес в балуне.
            result.geoObjects.get(0).properties.set({
              balloonContentBody:
                "Адрес: " + userAddress + "<br/>Координаты:" + userCoodinates,
            });
            myMap.geoObjects.add(result.geoObjects);
          },
          function (err) {
            console.log("Ошибка: " + err);
          }
        );

      createtwoPlacemark(myMap);
      createMultiRoute(myMap)
    });
  }, []);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const typeRequest = React.useState();

  return (
    <div>
      <div className="row align-items-stretch containerCustomer d-flex boxWhite p-4 ">
        <div className="row">
          <div className="col m-2">
            <div className="row pb-5">
              <div className="col textForm ">
                {" "}
                Тип услуги
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    className="form-check-label textForm"
                    for="flexRadioDefault1"
                  >
                    Перевозка
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label
                    className="form-check-label textForm"
                    for="flexRadioDefault2"
                  >
                    Работа на точке
                  </label>
                </div>
              </div>
              <div className="col"></div>
            </div>
            <div className="row pb-5">
              <label for="exampleFormControlTextarea1" class="form-label">
                Вид транспортного средства
              </label>
              <select
                class="form-select textForm"
                aria-label="Default select example"
              >
                <option selected value="1">
                  Автовышка
                </option>
                <option value="2">Погрузчик</option>
                <option value="3">Кран</option>
                <option value="4">Пассажирский</option>
                <option value="5">Грузовой</option>
              </select>
            </div>
            <div className="row pb-5">
              {typeRequest === "Перевозка" ? (
                <div className="textForm">
                  Время к которому небходимо забрать груз
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    onChange={(date) => setStartDate(date)}
                    locale="ru"
                  />
                </div>
              ) : (
                <div className="row">
                  <div className="col-auto textForm">Время работы</div>
                  <div className="col-auto">
                    <DatePicker
                      selected={startDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(date) => setStartDate(date)}
                      locale="ru"
                      showTimeInput
                    />
                  </div>
                  <div className="col-auto">
                    <DatePicker
                      selected={endDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      onChange={(date) => setEndDate(date)}
                      locale="ru"
                      showTimeInput
                    />
                  </div>
                </div>
              )}
            </div>

            <div class="mb-3 row">
              <label
                for="exampleFormControlTextarea1"
                className="textForm form-label"
              >
                Комментарий
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="col order-last d-flex h-100 d-inline-block">
            <div
              id="first_map"
              style={{ width: "100%", height: "50vh", borderRadius: "25px" }}
            ></div>
          </div>
        </div>
        <div className="row">
          <div class="mt-3 row justify-content-md-center">
            <span class="btnAdd textForm text-center">Создать</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRequestPage;
