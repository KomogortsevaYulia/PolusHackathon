import React from "react";
import "./MyRequestsPage.style.css"

const MyRequestsPage = () => {
  return <div className="containerCustomer">
    <div className="row align-items-stretch  d-flex card">
      <div className="card-body">
        <div className="col-auto">
          Сортировочка по дате
        </div>
        <div className="col-auto">
          Даты
        </div>
        <div className="col-auto">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Поиск" />
          </form>
        </div>
      </div>
    </div>
    <table className="table table-bordered request">
      <tbody>
        <tr>
          <td ><p className="textRequest">Работа на точке</p> <p>Даты</p> </td>
          <td>Время</td>
          <td>Точка</td>
          <td>Исполнитель</td>
        </tr>
      </tbody>
    </table>
  </div>;
};

export default MyRequestsPage;
