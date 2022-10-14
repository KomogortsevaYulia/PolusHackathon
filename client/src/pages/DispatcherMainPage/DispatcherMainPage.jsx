import React from "react";
import "./DispatcherMainStyle.css";

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
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className = "dropdown mt-4">
                    <button className = "btn btn-filter btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
              </div>
              <div className="col-8 mt-4">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
                <div className="row justify-content-between">
                  <div className = "dropdown col-3">
                      <button className = "btn btn-filter btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                  </div>
                  <div class="form-check col-3 pt-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                      Истекает время
                    </label>
                  </div>
                  <div class="form-check col-3 pt-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                      Накладка ТС
                    </label>
                  </div>
                  <div class="form-check col-3 pt-2">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                      Доступные
                    </label>
                  </div>
                </div>
              </div>
              <div className = "requestTableContainer m-4">
                <table class="table request">
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
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </div>
        <div className = "col-4">
          <div className = "transportStatus col m-4">

          </div>
          <div className = "transportStatus col m-4">

          </div>
          <div className = "requestCard col m-4">

          </div>
        </div>
      </div>
  );
};

export default DispatcherMainPage;
