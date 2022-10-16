import React from "react";
import "./DispatcherMainStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCheck,
  faCheckDouble,
  faEllipsisVertical 
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CalendarComp from "../../components/Calendar/CalendarComp.jsx";
import {
  appointCar,
  fetchRequestAll,
} from "../../store/requestSlice/requestSlice";
import { fetchTransportByName } from "../../store/transportSlice/transportSlice";

var myMap;

const DispatcherMainPage = () => {
  const [selectedMap, setSelectedMap] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(false);

  React.useEffect(() => {
    if (!selectedMap) {
      myMap = new window.ymaps.Map("first_map", {
        center: [52, 108],
        zoom: 5,
      });

      var location = window.ymaps.geolocation;

      // Получение местоположения и автоматическое отображение его на карте.
      location
        .get({
          mapStateAutoApply: true,
        })
        .then(
          function (result) {
            myMap.geoObjects
              .add(
                new window.ymaps.Placemark(
                  [52, 108],
                  {
                    balloonContent: "KOMATSU FD50AYT-10 - Погрузчик_Вилочный",
                  },
                  {
                    preset: "islands#circleIcon",
                  }
                )
              )
              .add(
                new window.ymaps.Placemark(
                  [52, 104],
                  {
                    balloonContent: "KOMATSU FD50AYT-10 - Погрузчик_Вилочный",
                  },
                  {
                    preset: "islands#circleIcon",
                  }
                )
              );
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
          <div class="btn-group" role="group" aria-label="Basic outlined example">
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
              <div className="row requestTable d-flex mt-3 despatcherRequests"
                onClick={() => {
                              setSelectedRequest(row);
                              dispatch(fetchTransportByName(row.requiredCarName));
                }}>
                <div className="col-2 borderItem pt-4">
                  { row.status === "Создана" ? (
                    <FontAwesomeIcon icon={faCheck} size = "2x" color="#1A73E8"/>
                  )
                  :(
                    <FontAwesomeIcon icon={faCheckDouble} size = "2x" color="#11BE56"/>
                  )
                  }
                  <p className="mt-2">{row.status}</p>
                </div>
                <div   className="col-3 pt-4 borderItem">
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
                    <div className="col-6 borderItem pt-4">{row.firstPlace}</div>
                  </>
                ) : (
                  <>
                    <div className="col-3 borderItem pt-4">{row.firstPlace}</div>
                    <div className="col-3 borderItem pt-4">{row.firstPlace}</div>
                  </>
                )}
                  <div className="col-1 pt-5">
                    <FontAwesomeIcon icon={faEllipsisVertical} size = "2x" color="#7c7c7c"/>
                  </div>
              </div>
              </>
            ))}
          </div>
              // <table class="table table-striped mt-3">
              //   <thead>
              //     <tr>
              //       <th scope="col">Тип</th>
              //       <th scope="col">Время</th>
              //       <th scope="col">Статус</th>
              //       <th scope="col">Адрес</th>
              //       <th scope="col">ТС</th>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {requests &&
              //       requests?.map((row) => (
              //         <tr
              //           className="requestTr"
              //           onClick={() => {
              //             setSelectedRequest(row);
              //             dispatch(fetchTransportByName(row.requiredCarName));
              //           }}
              //         >
              //           {/* <th scope="row"></th> */}
              //           <td>{row.type}</td>
              //           <td>
              //             {row.type === "Перевозка" ? (
              //               row.plannedDateStart
              //                 .split("T")
              //                 .map((s) => s.split(".")[0])
              //                 .join(" ")
              //             ) : (
              //               <>
              //                 <div>
              //                   {row.plannedDateStart
              //                     .split("T")
              //                     .map((s) => s.split(".")[0])
              //                     .join(" ")}{" "}
              //                   -
              //                 </div>
              //                 <div>
              //                   {row.plannedDateEnd
              //                     .split("T")
              //                     .map((s) => s.split(".")[0])
              //                     .join(" ")}
              //                 </div>
              //               </>
              //             )}
              //           </td>
              //           <td>{row.status}</td>
              //           <td>{row.firstPlace}</td>
              //           <td>{row?.car?.id}</td>
              //         </tr>
              //       ))}
              //   </tbody>
              // </table>
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
            <div className="row mt-3">
              <p className="requestTitle col">
                Заявка на
                {selectedRequest.type === "Перевозка"
                  ? " перевоз"
                  : " выполнение работы"}
                {/* <FontAwesomeIcon icon={faCheck} className="ms-2 requestCheck" /> */}
              </p>
            </div>
            <div className="row mt-3">
              <div className="col">
                <div className="row">
                  <p className="borderYellow ">Заказчик</p>
                  <p>{selectedRequest.client.name}</p>
                  <p className="customerNumber ">+7 (923) 234-43-13</p>
                </div>

                <div className="row">
                  <p className="borderYellow">Место</p>
                  <p>{selectedRequest.firstPlace}</p>
                  <p>{selectedRequest.secondPlace}</p>
                </div>
                <div className="row">
                  <p className="borderYellow">ТС</p>
                  <p>{selectedRequest.car?.name}</p>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  {selectedRequest.type === "Перевозка" ? (
                    <p className="mt-4 text-end  requestData">
                      {selectedRequest.plannedDateStart
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}
                    </p>
                  ) : (
                    <>
                      <p className="mt-4  text-end requestData">
                        {selectedRequest.plannedDateStart
                          .split("T")
                          .map((s) => s.split(".")[0])
                          .join(" ")}
                      </p>
                      <p className="mt-4 text-end  requestData">
                        {selectedRequest.plannedDateEnd
                          .split("T")
                          .map((s) => s.split(".")[0])
                          .join(" ")}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div
                className="row text-center btnBlue"
                style={{ height: "100%" }}
              >
                {!selectedRequest.car && (
                  <span
                    className="col"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop2"
                  >
                    Назначить заявку
                  </span>
                )}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Редактировать
                </button>
              </div>
            </div>
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="staticBackdrop2"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Назначить заявку на транспорт
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      Свободный транспорт вида
                      <div>{selectedRequest.requiredCarName} </div>
                      на даты
                      <div>
                        {selectedRequest.plannedDateStart
                          .split("T")
                          .map((s) => s.split(".")[0])
                          .join(" ")}
                      </div>
                      -
                      <div>
                        {selectedRequest.plannedDateEnd
                          ?.split("T")
                          .map((s) => s.split(".")[0])
                          .join(" ")}
                      </div>
                    </div>
                    <select
                      class="form-select textForm"
                      aria-label="Default select example"
                      onChange={handleChangeSelect}
                    >
                      <option value={0} selected disabled>
                        Вибирите машину
                      </option>
                      {Array.isArray(arrayOfTransportByName) &&
                        arrayOfTransportByName?.map((t) => (
                          <option selected={selectedCar === t.id} value={t.id}>
                            {t.number}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
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
