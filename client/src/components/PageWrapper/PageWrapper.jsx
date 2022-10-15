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
} from "@fortawesome/free-solid-svg-icons";

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
            <nav className="navbar navbar-expand-lg bg-light navStyles">
              <div className="container-fluid">
                <div
                  className="collapse navbar-collapse col-6"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item exitItem">
                      <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span className="ms-3 me-3">Выход</span>
                      </a>
                    </li>
                    <li className="nav-item ms-3">
                      <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faListSquares} />
                        <span
                          className="ms-3"
                          onClick={() => navigate("/dispatcherMainPage")}
                        >
                          Главная
                        </span>
                      </a>
                    </li>
                    <li className="nav-item ms-3">
                      <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faListCheck} />
                        <span
                          className="ms-3"
                          onClick={() => navigate("/dispatcherReportPage")}
                        >
                          Отчеты
                        </span>
                      </a>
                    </li>
                    <li className="nav-item align-self-center">
                      <a className="nav-link" href="#">
                        Время
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <span
                        className=" nav-link dropdown-toggle buttonNav"
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
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        </>
      ) : (
        <>
          <header>
            <nav className="navbar bg-white navbar-expand-lg bg-light navStyles">
              <div className="container-fluid ">
                <div
                  className="collapse navbar-collapse "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item d-flex justify-content-start">
                      <img
                        src={logo}
                        style={{ height: "50px" }}
                        alt="Логотип"
                      />
                    </li>
                    <li className="nav-item exitItem">
                      <a className="nav-link" href="#">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Выход</span>
                      </a>
                    </li>
                    <li className="buttonNav nav-item dropdown">
                      <span
                        className=" nav-link dropdown-toggle buttonNav"
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
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="navCustomer">
              <nav>
                <span
                  className={`buttonNav ${
                    "/freeTransport" === location.pathname
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
      <main>{children || <Outlet />}</main>
    </>
  );
};

export default PageWrapper;
