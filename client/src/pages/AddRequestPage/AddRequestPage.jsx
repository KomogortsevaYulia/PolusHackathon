import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTransportName } from "../../store/transportSlice/transportSlice";
import "react-datepicker/dist/react-datepicker.css";
import { createtwoPlacemark } from "../../utils/yamap";
import "./AddRequestPage.style.css";
import { useState } from "react";

import { addRequest } from "../../store/requestSlice/requestSlice";

var myMap;

const AddRequestPage = () => {
  const [isRadio, setIsRadio] = useState("Работа на точке");
  const [isSelect, setIsSelect] = useState("Погрузчик");
  const [isCar, setIsCar] = useState();

  React.useEffect(() => {
    window.ymaps.ready(function () {
      // Указывается идентификатор HTML-элемента.

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

      createtwoPlacemark(myMap, setPlacemark, setPlacemark2);
      // createMultiRoute(myMap)
    });

    dispatch(fetchTransportName(isSelect));
  }, []);

  const [myPlacemark, setPlacemark] = useState();
  const [firstPlace, setFirstPlace] = useState("");

  const [myPlacemark2, setPlacemark2] = useState();
  const [secondPlace, setSecondPlace] = useState("");

  const handleChangeCar = (e) => {
    setIsCar(e.currentTarget.value);
  };

  React.useEffect(() => {
    if (!myPlacemark) return;

    window.ymaps
      .geocode(myPlacemark.geometry.getCoordinates())
      .then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        setFirstPlace(
          [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", ")
        );
      });
  }, [myPlacemark]);

  React.useEffect(() => {
    if (!myPlacemark2) return;

    window.ymaps
      .geocode(myPlacemark2.geometry.getCoordinates())
      .then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);
        setSecondPlace(
          [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(", ")
        );
      });
  }, [myPlacemark2]);

  const { transport } = useSelector((state) => state.transport);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setIsRadio(e.currentTarget.value);
  };

  const handleChangeselect = (e) => {
    setIsSelect(e.currentTarget.value);
  };

  React.useEffect(() => {
    dispatch(fetchTransportName(isSelect));
  }, [isSelect]);

  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const onSubmit = async (e) => {
    console.log(myPlacemark);
    e.preventDefault();

    const place1 = myPlacemark?.geometry.getCoordinates();
    const place2 = myPlacemark?.geometry.getCoordinates();

    isRadio == "Работа на точке"
      ? dispatch(
          addRequest({
            type: isRadio,
            subType: isSelect,
            requiredCarName: isCar,
            startLon: place1[0],
            startLat: place1[1],
            endLon: place1[0],
            endLat: place1[1],
            plannedDateStart: startDate,
            plannedDateEnd: endDate,
            userId: 1,
          })
        )
      : dispatch(
          addRequest({
            type: isRadio,
            subType: isSelect,
            requiredCarName: isCar,
            startLon: place1[0],
            startLat: place1[1],
            endLon: place2[0],
            endLat: place2[1],
            plannedDateStart: startDate,
            plannedDateEnd: startDate,
            userId: 1,
          })
        );
  };

  const typeRequest = React.useState();

  return (
    <div>
      <form action="#" id="#" method="put" onSubmit={onSubmit}>
        <div className="row align-items-stretch containerCustomer d-flex boxWhite p-5 ">
          <div className="row">
            <div className="col m-2">
              <div className="row pb-5">
                <div className="col textForm choiseTransportType">
                  {" "}
                  Тип услуги
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="Перевозка"
                      onChange={handleChange}
                      checked={isRadio === "Перевозка"}
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
                      value="Работа на точке"
                      onChange={handleChange}
                      checked={isRadio === "Работа на точке"}
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
              <div className="row pb-2 choiseTransportType ps-3 col-8">
                Вид транспортного средства
                <select
                  class="form-select textForm"
                  aria-label="Default select example"
                  onChange={handleChangeselect}
                >
                  {isRadio == "Работа на точке" ? (
                    <>
                      <option
                        selected={isSelect === "Автовышка"}
                        value="Автовышка"
                      >
                        Автовышка
                      </option>
                      <option
                        selected={isSelect === "Погрузчик"}
                        value="Погрузчик"
                      >
                        Погрузчик
                      </option>
                      <option selected={isSelect === "Кран"} value="Кран">
                        Кран
                      </option>
                    </>
                  ) : (
                    <>
                      <option
                        selected={isSelect === "Пассажирский"}
                        value="Пассажирский"
                      >
                        Пассажирский
                      </option>
                      <option
                        selected={isSelect === "Грузовой"}
                        value="Грузовой"
                      >
                        Грузовой
                      </option>
                    </>
                  )}
                </select>
              </div>
              <div className="row mt-5 choiseTransportType">
                {isRadio === "Перевозка" ? (
                  <div className="row textForm">
                    <div className="col-auto textForm">Время</div>
                    <div className="col-auto">
                      <DatePicker
                        id="startDateTime"
                        selected={startDate}
                        showTimeSelect
                        locale="ru"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-auto textForm">Время работы</div>
                    <div className="col-auto">
                      <DatePicker
                        id="startDateTime"
                        selected={startDate}
                        locale="ru"
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        onChange={(date) => setStartDate(date)}
                        showTimeInput
                      />
                    </div>
                    <div className="col-auto">
                      <DatePicker
                        selected={endDate}
                        selectsEnd
                        locale="ru"
                        id="endDateTime"
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={startDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeInput
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="row mt-5 choiseTransportType ps-3 col-8">
                Модель ТС
                <select
                  class="form-select textForm"
                  aria-label="Default select example"
                  onChange={handleChangeCar}
                >
                  {transport &&
                    Object.keys(transport)?.map((row) => (
                      <option selected={isCar === row} value={row}>
                        {row}
                      </option>
                    ))}
                </select>
              </div>
              <div class="mt-5 row ps-3 col-8 choiseTransportType">
                {isRadio === "Перевозка" ? (
                  <div class="mb-3 row">
                    <label
                      for="exampleFormControlTextarea1"
                      className="textForm form-label col"
                    >
                      Точка А : {firstPlace} (
                      {myPlacemark?.geometry.getCoordinates().join(", ")})
                    </label>
                    <label
                      for="exampleFormControlTextarea1"
                      className="textForm form-label col"
                    >
                      Точка Б : {secondPlace} (
                      {myPlacemark2?.geometry.getCoordinates().join(", ")})
                    </label>
                  </div>
                ) : (
                  <div class="mb-3 row">
                    <label
                      for="exampleFormControlTextarea1"
                      className="textForm form-label col"
                    >
                      Место :{firstPlace}
                      {myPlacemark?.geometry.getCoordinates().join(", ")}
                    </label>
                  </div>
                )}
              </div>

              <div class="mb-3 row mt-5 choiseTransportType ps-3 col-8">
                  Комментарий
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                ></textarea>
              </div>
            </div>
            <div className="col order-last d-flex h-100 d-inline-block">
              <div
                id="first_map"
                style={{ width: "100%", height: "63vh", borderRadius: "25px" }}
              ></div>
            </div>
          </div>
          <div className="row">
            <div class="mt-3 row justify-content-md-center" onClick={onSubmit}>
              <span class="btnAdd textForm text-center">Создать</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRequestPage;
