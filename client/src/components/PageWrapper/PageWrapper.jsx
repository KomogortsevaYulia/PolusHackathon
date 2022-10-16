import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./PageWrapper.style.css";
import { users } from "../../api/userApi";
import { fetchUserById } from "../../store/userSlice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../sourse/logo.png";
import { useLocation } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faListSquares,
  faListCheck,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    navigate("/");
  }, [user]);

  return (
    <>
      {user?.role?.id === 2 ? (
        <>
          <header>
            <div className="row navbarWhite d-flex">
              <div className="row d-flex ">
                <div className="col-auto ms-3 p-3">
                  <a className="nav-link exitItem" href="#">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <span className="ms-3 me-3 ">Выход</span>
                  </a>
                </div>
                <div className="col-auto p-3">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faListSquares} />
                    <span
                      className={`ms-3 ${
                        "/dispatcherReportPage" === location.pathname ||
                        location.pathname === "/"
                          ? "buttonNavActiveTop"
                          : ""
                      }`}
                      onClick={() => navigate("/dispatcherReportPage")}
                    >
                      Главная
                    </span>
                  </a>
                </div>
                <div className="col-auto p-3 ">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faListCheck} />
                    <span
                      className={`ms-3 ${
                        "/dispatcherMainPage" === location.pathname 
                          ? "buttonNavActiveTop"
                          : ""
                      }`}
                      onClick={() => navigate("/dispatcherMainPage")}
                    >
                      Заявки
                    </span>
                  </a>
                </div>
                <div className="col-auto p-3 ">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faChartColumn} />
                    <span
                       className={`ms-3 ${
                        "/dispatcherAnalitycPage" === location.pathname 
                          ? "buttonNavActiveTop"
                          : ""
                      }`}
                      onClick={() => navigate("/dispatcherAnalitycPage")}
                    >
                      Отчет
                    </span>
                  </a>
                </div>

                <div className="col flex-grow-1 ms-10 me-10 text-center align-self-center">
                  
                  <Moment format="HH:mm " className="time exitItem" interval={1000} />
                  <Moment format="YYYY-MM-DD" className="timemin "  interval={1000} />
                </div>

                
                <div className="col-2 p-3 ms-auto">
                  <span
                    className=" nav-link dropdown-toggle buttonNav userChoise"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item buttonNav"
                        onClick={() => dispatch(fetchUserById(1))}
                      >
                        {users[0].name}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item buttonNav"
                        onClick={() => dispatch(fetchUserById(2))}
                      >
                        {users[1].name}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header>
            <div className="row navbarWhite justify-content-center">
              <div className="row col-11">
                <div className="col-6 p-1">
                  <img src={logo} style={{ height: "50px" }} alt="Логотип" />
                </div>
                <div className="col-md-2 offset-md-2 p-3">
                  <a className="nav-link exitItem2" href="#">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <span className="ms-3 me-3 ">Выход</span>
                  </a>
                </div>
                <div className="col-2 p-3">
                  <span
                    className=" nav-link dropdown-toggle buttonNav userChoise"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </span>
                  <ul className="dropdown-menu ">
                    <li>
                      <button
                        className="dropdown-item buttonNav"
                        onClick={() => dispatch(fetchUserById(1))}
                      >
                        {users[0].name}
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item buttonNav"
                        onClick={() => dispatch(fetchUserById(2))}
                      >
                        {users[1].name}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`navCustomer`}>
              <nav>
                <span
                  className={`buttonNav ${
                    "/freeTransport" === location.pathname ||
                    location.pathname === "/"
                      ? "buttonNavActive"
                      : ""
                  }`}
                  onClick={() => navigate("/freeTransport")}
                >
                  Доступные ТС
                </span>
                <span
                  className={`buttonNav ${
                    "/myRequests" === location.pathname ? "buttonNavActive" : ""
                  }`}
                  onClick={() => navigate("/myRequests")}
                >
                  Мои заявки
                </span>
                <span
                  className={`buttonNav ${
                    "/addRequest" === location.pathname ? "buttonNavActive" : ""
                  }`}
                  onClick={() => navigate("/addRequest")}
                >
                  Создать заявку
                </span>
              </nav>
            </div>
          </header>
        </>
      )}
      <main      >
        {children || <Outlet />}
      </main>
    </>
  );
};

export default PageWrapper;
