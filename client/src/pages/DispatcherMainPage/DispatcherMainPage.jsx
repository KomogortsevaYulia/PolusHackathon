import React from "react";
import "./DispatcherMainStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCheck,
  faCheckDouble,
  faEllipsisVertical,
  faTruckFast,
  faClock,
  faUserCheck,
  faEnvelopeOpen
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CalendarComp from "../../components/Calendar/CalendarComp.jsx";
import {
  appointCar,
  fetchRequestAll,
} from "../../store/requestSlice/requestSlice";
import { fetchTransportByName } from "../../store/transportSlice/transportSlice";
import id from "date-fns/esm/locale/id/index.js";

var myMap;

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addToMap(obj, coords, name) {
  obj.add(
    new window.ymaps.Placemark(
      coords,
      {
        balloonContent: name,
      },
      {
        preset: "islands#circleIcon",
        iconColor: getRandomColor(),
      }
    )
  );
}

const DispatcherMainPage = () => {
  const [selectedMap, setSelectedMap] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(false);

  React.useEffect(() => {
    if (!selectedMap) {
      myMap = new window.ymaps.Map("first_map", {
        center: [52, 104],
        zoom: 7,
      });
    }
  }, [selectedMap]);

  React.useEffect(() => {
    if (!selectedMap) {
      var location = window.ymaps.geolocation;

      location
        .get({
          mapStateAutoApply: true,
        })
        .then(
          function (result) {
            for (let req of requests) {
              addToMap(
                myMap.geoObjects,
                [req.startLon, req.startLat],
                req.requiredCarName
              );
            }
          },
          function (err) {
            console.log("Ошибка: " + err);
          }
        );
    }
  }, [selectedMap]);

  const { user } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.request);
  const { arrayOfTransportByName } = useSelector((state) => state.transport);
  const dispatch = useDispatch();

  const [selectedCar, setSelectedCar] = React.useState("");

  const handleChangeSelect = (e) => {
    setSelectedCar(+e.currentTarget.value);
  };

  React.useEffect(() => {
    dispatch(fetchRequestAll());
  }, []);

  React.useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <div className="row justify-content-center mt-4 ">
      <div className="col-7 subMenu mt-4">
        <div className="row justify-content-center">
          <div className="col-3 m-4">
            <div className="dropdown">
              <CalendarComp className="calendarDateSelect" />
            </div>
            <div className="dropdown mt-4">
              <button
                className="btn btn-filter btn-secondary dropdown-toggle col-12"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Статус заказа
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Выполняется
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Выполнен
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ожидает выполнения
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-8 mt-4">
            <div className="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Найти"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary col-2"
                type="button"
                id="button-addon2"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <div className="row justify-content-between">
              <div className="form-check col-3 pt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Истекает время
                </label>
              </div>
              <div className="form-check col-2 pt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Накладки
                </label>
              </div>
              <div className="form-check col-2 pt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Доступные
                </label>
              </div>
            </div>
          </div>
          <div className="requestTableContainer m-4">
            <div
              class="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
                checked={selectedMap}
                onClick={() => setSelectedMap(true)}
              />
              <label className="btn btnYellow " htmlFor="option1">
                Таблица
              </label>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
                checked={!selectedMap}
                onClick={() => setSelectedMap(false)}
              />
              <label className="btn btnYellow" htmlFor="option2">
                Карта
              </label>
            </div>

            {selectedMap ? (
              <div className="col mt-4">
                {requests &&
                  requests?.map((row) => (
                    <>
                      <div
                        className="row requestTable d-flex mt-3 despatcherRequests"
                        onClick={() => {
                          setSelectedRequest(row);
                          dispatch(fetchTransportByName(row.requiredCarName));
                        }}
                      >
                        <div className="col-2 borderItem pt-4">
                          {row.status === "Создана" && (
                            <FontAwesomeIcon
                              icon={faClock}
                              size="2x"
                              color="grey"
                            />
                          )}
                          {row.status === "Назначена" && (
                            <FontAwesomeIcon
                              icon={faUserCheck}
                              size="2x"
                              color="#FABB05"
                            />
                          )}
                          {row.status === "Выполняется" && (
                            <FontAwesomeIcon
                              icon={faTruckFast}
                              size="2x"
                              color="#1A73E8"
                            />
                          )}
                          {row.status === "Выполнена" && (
                            <FontAwesomeIcon
                              icon={faCheckDouble}
                              size="2x"
                              color="#11BE56"
                            />
                          )}
                          <p className="mt-2">{row.status}</p>
                        </div>
                        <div className="col-3 pt-4 borderItem">
                          <p className="requestType">{row.type}</p>
                          {row.plannedDateEnd === row.plannedDateStart ? (
                            <p>
                              {row.plannedDateStart
                                .split("T")
                                .map((s) => s.split(".")[0])
                                .join(" ")}
                            </p>
                          ) : (
                            <p>
                              {row.plannedDateStart
                                .split("T")
                                .map((s) => s.split(".")[0])
                                .join(" ")}{" "}
                              -{" "}
                              {row.plannedDateEnd
                                .split("T")
                                .map((s) => s.split(".")[0])
                                .join(" ")}
                            </p>
                          )}
                        </div>
                        {row.type === "Работа на точке" ? (
                          <>
                            <div className="col-6 borderItem pt-4">
                              {row.firstPlace}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-3 borderItem pt-4">
                              {row.firstPlace}
                            </div>
                            <div className="col-3 borderItem pt-4">
                              {row.firstPlace}
                            </div>
                          </>
                        )}
                        <div className="col-1 pt-5">
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size="2x"
                            color="#7c7c7c"
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            ) : (
              <div className="col order-last d-flex d-inline-block">
                <div
                  id="first_map"
                  style={{
                    width: "100%",
                    height: "50vh",
                    borderRadius: "25px",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="transportStatus col m-4">
          <div className="row d-flex justify-content-evenly align-items-center">
            <p className="waitTransport col-auto">28</p>
            <p className="col-auto p-2">В ожидании</p>
            <p className="requestTransport col-auto">15</p>
            <p className="col-auto">На заявке</p>
            <p className="brokenTransport col-auto">4</p>
            <p className="col-auto">Сломан</p>
          </div>
        </div>

        {selectedRequest ? (
          <div className="requestCard col m-3 p-5">
            <div className="row">
              <div className="col-9">
                <p className="requestTitle">
                  Заявка на
                  {selectedRequest.type === "Перевозка"
                    ? " перевоз"
                    : " выполнение работы"}
                </p>
              </div>
              <div className="col-1">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="ms-2 requestCheck"
                  size="2x"
                />
              </div>
              <div className="col-1">01.01.2022</div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <div className="row mt-4 customerRequestTitle">
                  <p className="col-6 customerRequestName">
                    {selectedRequest.client.name}
                  </p>
                  <p className="col-6 text-end requestData">
                    {selectedRequest.plannedDateStart
                      .split("T")
                      .map((s) => s.split(".")[0])
                      .join(" ")}
                  </p>
                </div>

                <div className="row mt-5">
                  <p className="customerText col-5">+7 (923) 234-43-13</p>
                  <div className="col-4 borderSlicer"></div>
                  <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    className="col-2"
                    size="2x"
                  />
                </div>

                <div className="col mt-4">
                  <p className="customerText">Транспортное средство</p>
                  <p className="customerSubText">{selectedRequest.car?.name}</p>
                </div>

                <div className="col">
                  {selectedRequest.secondPlace ? (
                    <>
                      <p className="mt-4 customerText">
                        {selectedRequest.firstPlace}
                      </p>
                      <p className="mt-4 requestData">
                        {selectedRequest.secondPlace}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-4 customerText">
                        {selectedRequest.firstPlace}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div
                className="row text-center btnBlue mt-3"
                style={{ height: "100%" }}
              >
                {!selectedRequest.car && (
                  <span
                    className="col-6"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop2"
                  >
                    Назначить заявку
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn-primary col-6"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Редактировать
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Редактивание заявки
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">...</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Отмена
                    </button>
                    <button type="button" className="btn btn-primary">
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="staticBackdrop2"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Назначить заявку на транспорт
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div
                      className="row p-2"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div className="row">Свободный транспорт вида</div>
                      <div className="row">
                        <div>{selectedRequest.requiredCarName} </div>
                      </div>
                      <div className="row">
                        <div>Срок </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {selectedRequest.plannedDateStart
                            .split("T")
                            .map((s) => s.split(".")[0])
                            .join(" ")}
                        </div>

                        <div className="col">
                          {selectedRequest.plannedDateEnd
                            ?.split("T")
                            .map((s) => s.split(".")[0])
                            .join(" ")}
                        </div>
                      </div>
                    </div>
                    <select
                      className="form-select textForm"
                      aria-label="Default select example"
                      onChange={handleChangeSelect}
                    >
                      <option value={0} selected disabled>
                        Выберите машину
                      </option>
                      {Array.isArray(arrayOfTransportByName) &&
                        arrayOfTransportByName?.map((t) => (
                          <option selected={selectedCar === t.id} value={t.id}>
                            {t.number}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() =>
                        dispatch(
                          appointCar({
                            requestId: selectedRequest.id,
                            carId: selectedCar,
                          })
                        )
                      }
                    >
                      Назначить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DispatcherMainPage;
