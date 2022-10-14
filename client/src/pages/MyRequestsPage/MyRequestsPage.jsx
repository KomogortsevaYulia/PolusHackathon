import React from "react";

const MyRequestsPage = () => {
  return <div>
    <div className="col">
      <div className="row">
        <div className="card">
          <div className="card-body">
            Сортировочка
            Даты
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="col-3">
              Работа на точке
            </div>
            <div className="col-2">
              Время
            </div>
            <div className="col-4">
              Точка
            </div>
            <div className="col-2">
              Исполнитель
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>;
};

export default MyRequestsPage;
