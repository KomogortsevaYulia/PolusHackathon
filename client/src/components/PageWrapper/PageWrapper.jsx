import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user?.role !== "admin" ? (
        <>
          <header>
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
          <main>{children || <Outlet />}</main>
        </>
      ) : (
        <>
          <header>
            <nav>
              <span onClick={() => navigate("/freeTrasport")}>Главная</span>
              <span onClick={() => navigate("/myRequests")}>Отчёты</span>
            </nav>
          </header>
          <main>{children || <Outlet />}</main>
        </>
      )}
    </>
  );
};

export default PageWrapper;
