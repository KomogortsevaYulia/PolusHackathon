import React from "react";
import "./DispatcherMainStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCheck, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CalendarComp from './CalendarComp.jsx'


const DispatcherMainPage = () => {
  const [selectedMap, setSelectedMap] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(false);

  React.useEffect(() => {
    window.ymaps.ready(function () {
      // Указывается идентификатор HTML-элемента.
      var moscow_map = new window.ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10,
      });
      // Ссылка на элемент.
      // var piter_map = new window.ymaps.Map(
      //   document.getElementsByTagName("p")[2],
      //   {
      //     center: [59.94, 30.32],
      //     zoom: 9,
      //   }
      // );
    });
  }, []);

  const { transport } = useSelector((state) => state.transport);
  const dispatch = useDispatch();

  return (
      <div className = "row justify-content-center mt-4 ">
        <div className = "col-7 subMenu mt-4">
           <div className = "row justify-content-center">
              <div className = "col-3 m-4">
                <div className = "dropdown">
                  <CalendarComp className = "calendarDateSelect"/>
                    {/* <button className = "btn btn-calendar btn-secondary dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className = "dropdown-item" href="#">Action</a></li>
                      <li><a className = "dropdown-item" href="#">Another action</a></li>
                      <li><a className = "dropdown-item" href="#">Something else here</a></li>
                    </ul> */}
                </div>
                <div className = "dropdown mt-4">
                    <button className = "btn btn-filter btn-secondary dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Фильтр 1
                    </button>
                    <ul className = "dropdown-menu">
                      <li><a className = "dropdown-item" href="#">Action</a></li>
                      <li><a className = "dropdown-item" href="#">Another action</a></li>
                      <li><a className = "dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
              </div>
              <div className="col-8 mt-4">
                <div className = "input-group mb-3">
                  <input type = "text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                  <button className = "btn btn-outline-secondary col-2" type="button" id="button-addon2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
                <div className = "row justify-content-between">
                  <div className = "dropdown col-4">
                      <button className = "btn btn-filter btn-secondary dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Фильтр 2
                      </button>
                      <ul class="dropdown-menu">
                        <li><a className = "dropdown-item" href="#">Action</a></li>
                        <li><a className = "dropdown-item" href="#">Another action</a></li>
                        <li><a className = "dropdown-item" href="#">Something else here</a></li>
                      </ul>
                  </div>
                  <div className = "form-check col-3 pt-2">
                    <input className = "form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className = "form-check-label" for="flexCheckDefault">
                      Истекает время
                    </label>
                  </div>
                  <div className = "form-check col-2 pt-2">
                    <input className = "form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className = "form-check-label" for="flexCheckDefault">
                      Накладка ТС
                    </label>
                  </div>
                  <div className = "form-check col-2 pt-2">
                    <input className = "form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className = "form-check-label" for="flexCheckDefault">
                      Доступные
                    </label>
                  </div>
                </div>
              </div>
              <div className = "requestTableContainer m-4">
                <input type="radio" className = "btn-check" name="options" onClick={() => setSelectedMap(true)} id="option1" autocomplete="off" checked/>
                <label class="btn btn-secondary" for="option1" >Таблица</label>
                <input type="radio" className = "btn-check" name="options" onClick={() => setSelectedMap(false)} id="option2" autocomplete="off"/>
                <label class="btn btn-secondary" for="option2">Карта</label>
                {selectedMap? 
                <table class="table table-striped mt-3">
                <thead>
                  <tr>
                    <th scope="col">Время</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Адрес</th>
                    <th scope="col">ТС</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Бронирование</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="requestTr" onClick={() => setSelectedRequest(!selectedRequest)}>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr className="requestTr">
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr className="requestTr">
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>:
              <div className="col order-last d-flex d-inline-block">
                <div
                      id="first_map"
                      style={{ width: "100%", height: "50vh", borderRadius: "25px" }}
                  ></div>
              </div>
              }
              
              </div>
           </div>
        </div>
        <div className = "col-4">
          <div className = "transportStatus col m-4">
            <div className="row d-flex justify-content-evenly align-items-center">
              <p className="waitTransport col-auto">28</p>
              <p className="col-auto p-2">В ожидании</p>
              <p className="requestTransport col-auto">15</p>
              <p className="col-auto">На заявке</p>
              <p className="brokenTransport col-auto">4</p>
              <p className="col-auto">Сломан</p>
            </div>
          </div>
          <div className = "transportStatus col m-4">
            <div className="row d-flex justify-content-start align-items-center">
              <p className="waitTransport col-auto ms-2">28</p>
              <p className="col-auto p-2 ms-3">В ожидании</p>
            </div>
          </div>


         {selectedRequest?  
         <div className = "requestCard col m-4 p-5">
            <div className="row mt-3">
                <p className = "requestTitle col-8">
                    Заявка на перевоз груза
                    <FontAwesomeIcon icon={faCheck} className = "ms-2 requestCheck" />
                </p>
                <p className="col text-end requestData">
                    12.12.2309
                </p>
            </div>
            <div className="row rowCompany">
                <p className = "mt-4 requestCompanyTitle col-8">
                    OOO "Газпром"
                </p>
                <p className="mt-4 col-4 text-end requestData">
                    10:10
                </p>
            </div>
            <div className="row mt-4">
              <div className="col">
                <p className="boldCardText">Выбранный ТС</p>
                <p>Фронтальный погрузчик</p>
                <p className="customerNumber">+7 (923) 234-43-13</p>
                <p>Заказчик</p>
                <p>г.Иркутск 
                ул. Гриюоедова
                453553</p>
              </div>
              <div className="col">
                <p className="text-end">OLEG</p>
                <p className="text-end">+7 (923) 234-43-13</p>
                <p className="text-end">
                  <FontAwesomeIcon icon={faEnvelope} size = "2x"/>
                </p>  
                <p className="text-end">г. Москва
                пр. Ленина
                453553</p>
              </div>
            </div>
          </div> : <></>}
        </div>
      </div>
  );
};

export default DispatcherMainPage;
