import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

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
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">
                        Главная
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Отчеты
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">
                        Время
                      </a>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Чел
                      </a>
                      <ul class="dropdown-menu">
                        <li >
                          <button class="dropdown-item" onClick={() => dispatch(fetchUserById(1))}>
                            {users[0].name}
                          </button>
                        </li>
                        <li >
                          <button class="dropdown-item" onClick={() => dispatch(fetchUserById(2))}>
                            {users[1].name}
                          </button >
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
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">
                        Лого
                      </a>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Чел
                      </a>
                      <ul class="dropdown-menu">
                        <li >
                          <button class="dropdown-item" onClick={() => dispatch(fetchUserById(1))}>
                            {users[0].name}
                          </button >
                        </li>
                        <li >
                          <button class="dropdown-item" onClick={() => dispatch(fetchUserById(1))}>
                            {users[1].name}
                          </button >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav>
              <span onClick={() => navigate("/freeTrasport")}>
                Доступные ТС
              </span>
              <span onClick={() => navigate("/myRequests")}>Мои заявки</span>
              <span onClick={() => navigate("/addRequest")}>
                Создать заявки
              </span>
            </nav>
          </header>
        </>
      )}
      <main>{children || <Outlet />}</main>
    </>
  );
};

export default PageWrapper;
