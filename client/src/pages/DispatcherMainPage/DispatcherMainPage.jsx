import React from "react";
import "./DispatcherMainStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


const DispatcherMainPage = () => {
  return (
      <div className = "row justify-content-center mt-4 ">
        <div className = "col-7 subMenu mt-4">
           <div className = "row justify-content-center">
              <div className = "col-3 m-4">
                <div className = "dropdown">
                    <button className = "btn btn-calendar btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className = "dropdown-item" href="#">Action</a></li>
                      <li><a className = "dropdown-item" href="#">Another action</a></li>
                      <li><a className = "dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className = "dropdown mt-4">
                    <button className = "btn btn-filter btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown button
                    </button>
                    <ul class="dropdown-menu">
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
                <div className = "row">
                  <div className = "dropdown col-3">
                      <button className = "btn btn-filter btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
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
                  <div className = "form-check col-3 pt-2">
                    <input className = "form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className = "form-check-label" for="flexCheckDefault">
                      Накладка ТС
                    </label>
                  </div>
                  <div className = "form-check col-3 pt-2">
                    <input className = "form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className = "form-check-label" for="flexCheckDefault">
                      Доступные
                    </label>
                  </div>
                </div>
              </div>
              <div className = "requestTableContainer m-4">
                <table className = "table request">
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
                    <tr className="requestTr">
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
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                </table>
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
          <div className = "requestCard col m-4">

          </div>
        </div>
      </div>
  );
};

export default DispatcherMainPage;
