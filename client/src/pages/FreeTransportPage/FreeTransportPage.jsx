import React from "react";
import "./FreeTransportPage.style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchTransport } from "../../store/transportSlice/transportSlice";
import { fetchUserById } from "../../store/userSlice/userSlice";
import { useState } from "react";

const FreeTransportPage = () => {
  React.useEffect(() => {
    window.ymaps.ready(function () {
      // Указывается идентификатор HTML-элемента.
      var moscow_map = new window.ymaps.Map("first_map", {
        center: [55.76, 37.64],
        zoom: 10,
      });
      // // Ссылка на элемент.
      // var piter_map = new window.ymaps.Map(
      //   document.getElementsByTagName("p")[2],
      //   {
      //     center: [59.94, 30.32],
      //     zoom: 9,
      //   }
      // );
    });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { transport } = useSelector((state) => state.transport);
  const dispatch = useDispatch();
  const [isRadio, setIsRadio] = useState("Специальная техника");
  console.log(isRadio);

  React.useEffect(() => {
    dispatch(fetchUserById(1));
    dispatch(fetchTransport());
  }, []);

  React.useEffect(() => {
    console.log(transport);
  }, [transport]);

  return (
    <>
      <div className="row align-items-stretch containerCustomer d-flex ">
        <div className="col boxWhite p-4 transportSearchBox">
          <div className="row">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked
              />
              <label className="btn btnYellow " htmlFor="btnradio1">
                Специальная техника
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
              />
              <label className="btn btnYellow" htmlFor="btnradio2">
                Грузопассажирский транспорт
              </label>
            </div>
          </div>
        </div>
        <div className="col order-last d-flex d-inline-block boxWhite transportSearchBox">
          <div
            id="first_map"
            style={{ width: "100%", borderRadius: "25px" }}
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
                <h6 className="card-subtitle mb-2 text-muted">Имя</h6>
                <p className="card-text">Описание</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default FreeTransportPage;
