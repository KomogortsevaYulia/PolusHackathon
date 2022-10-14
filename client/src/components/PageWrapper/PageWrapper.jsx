import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/userSlice/userSlice";
const users =[{username:'Заказчик Игорь', role:1 }, { username:'Диспетчер Олег', role:2 }]

const PageWrapper = ({ children }) => {
  
  
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  React.useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <>
      {user?.role !== 1 ? (
        <>
          <header>
            <nav class="navbar navbar-expand-lg bg-light">
              <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Главная</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Отчеты</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Время</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Чел
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">{users[0].username}</a></li>
                        <li><a class="dropdown-item" href="#">{users[1].username}</a></li>
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
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Лого</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Чел
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Деловой закзчик</a></li>
                        <li><a class="dropdown-item" href="#">Диспетчер</a></li>
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
