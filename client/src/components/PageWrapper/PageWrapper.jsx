import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./PageWrapper.style.css" 
import { users } from "../../api/userApi";
import { fetchUserById } from "../../store/userSlice/userSlice";

const PageWrapper = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {user?.role?.id === 2 ? (
        <>
          <header>
            <nav className="navbar navbar-expand-lg bg-light">
              <div className="container-fluid">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span>Выход</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        <span onClick={() => navigate("/dispatcherMainPage")}>Главная</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <span onClick={() => navigate("/dispatcherReportPage")}>Отчеты</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Время
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.name}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => dispatch(fetchUserById(1))}
                          >
                            {users[0].name}
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
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
            <nav className="navbar navbar-expand-lg bg-light">
              <div className="container-fluid">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Лого
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.name}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => dispatch(fetchUserById(1))}
                          >
                            {users[0].name}
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
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
                <span className="buttonNav" onClick={() => navigate("/freeTrasport")}>
                  Доступные ТС
                </span>
                <span className="buttonNav" onClick={() => navigate("/myRequests")}>
                  Мои заявки
                </span>
                <span className="buttonNav" onClick={() => navigate("/addRequest")}>
                  Создать заявки
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
