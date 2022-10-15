import React from "react";
import "./FreeTransportPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchTransportName,fetchTransport } from "../../store/transportSlice/transportSlice";
import { fetchUserById } from "../../store/userSlice/userSlice";
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FreeTransportPage = () => {
  React.useEffect(() => {
    window.ymaps.ready(function () {
      console.log(132);
      // Указывается идентификатор HTML-элемента.
      var moscow_map = new window.ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10,
      });
    });

    dispatch(fetchUserById(1));
    dispatch(fetchTransportName());
  }, []);

  const [isRadio, setIsRadio] = useState("Работа на точке");
  const [isSelect, setIsSelect] = useState("Погрузчик");
  const [isCar, setIsCar] = useState("");

  const { transport } = useSelector((state) => state.transport);
  const dispatch = useDispatch();
  console.log(isRadio);

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    dispatch(fetchTransportName(isSelect));
  }, [isSelect]);

  React.useEffect(() => {
    console.log(transport);
  }, [transport]);

  const handleChangeCar = (e) => {
    setIsCar(e.currentTarget.value);
  };

  const handleChange = (e) => {
    setIsRadio(e.currentTarget.value);
  };

  const handleChangeselect = (e) => {
    setIsSelect(e.currentTarget.value);
  };

  return (
    <>
      <div className="row align-items-stretch containerCustomer d-flex ">
        <div className="col boxWhite p-4 ">
          <div className="row  pb-5">
            <div className="col textForm choiseTransportType ">
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
          </div>
          <div className="row pb-2 choiseTransportType ps-3 col-8">
            Вид транспортного средства
            <select
              class="form-select textForm"
              aria-label="Default select example"
              onChange={handleChangeselect}
            >
              {isRadio === "Работа на точке" ? (
                <>
                  <option selected={isSelect === "Автовышка"} value="Автовышка">
                    Автовышка
                  </option>
                  <option selected={isSelect === "Погрузчик"} value="Погрузчик">
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
                  <option selected={isSelect === "Грузовой"} value="Грузовой">
                    Грузовой
                  </option>
                </>
              )}
            </select>
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
        </div>
        <div className="col order-last d-flex d-inline-block boxWhite transportSearchBox">
          <div
            id="first_map"
            style={{ width: "100%", borderRadius: "25px" }}
            className="map"
          ></div>
        </div>
      </div>
      <div
        className="row align-items-stretch containerCustomer d-flex justify-content-between mt-4"
        style={{ overflowX: "auto", flexWrap: "none" }}
      >
        {transport &&
          Object.keys(transport)?.map((key) => (
            <div
              className="card cardBoxWhite transportSearchBox"
              style={{ width: "18rem" }}
              key={transport[key][0].id}
            >
              <img
                src="https://drikus.club/uploads/posts/2022-01/1641903077_69-drikus-club-p-karernii-samosval-volvo-tekhnika-krasivo-f-76.jpg"
                class="card-img-top"
                alt="ТС"
              />
              <div className="card-body">
                <h5 className="card-title">{transport[key][0].name}</h5>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FreeTransportPage;
