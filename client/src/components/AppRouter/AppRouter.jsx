import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { users } from "../../api/userApi";
import { fetchUserById } from "../../store/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

import AddRequestPage from "../../pages/AddRequestPage/AddRequestPage";
import FreeTransportPage from "../../pages/FreeTransportPage/FreeTransportPage";
import MyRequestsPage from "../../pages/MyRequestsPage/MyRequestsPage";
import DispatcherMainPage from "../../pages/DispatcherMainPage/DispatcherMainPage";
import DispatcherReportPage from "../../pages/DispatcherReportPage/DispatcherReportPage";
import PageWrapper from "../PageWrapper/PageWrapper";


const AppRouter = () => {


  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserById(1));
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Routes>
      <Route element={<PageWrapper />}>
        {user?.role?.id === 2 ?         <Route path="/" element={<DispatcherMainPage/>} /> :        <Route path="/" element={<FreeTransportPage />} />  }
        <Route path="/dispatcherMainPage" element={<DispatcherMainPage />} />
        <Route path="/dispatcherReportPage" element={<DispatcherReportPage />} />
        <Route path="/freeTrasport" element={<FreeTransportPage />} />
        <Route path="/myRequests" element={<MyRequestsPage />} />
        <Route path="/addRequest" element={<AddRequestPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
