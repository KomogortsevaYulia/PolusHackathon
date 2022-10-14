import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AddRequestPage from "../../pages/AddRequestPage/AddRequestPage";
import FreeTransportPage from "../../pages/FreeTransportPage/FreeTransportPage";
import MyRequestsPage from "../../pages/MyRequestsPage/MyRequestsPage";
import DispatcherMainPage from "../../pages/DispatcherMainPage/DispatcherMainPage";
import DispatcherReportPage from "../../pages/DispatcherReportPage/DispatcherReportPage";
import PageWrapper from "../PageWrapper/PageWrapper";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PageWrapper />}>
        <Route path="/" element={<FreeTransportPage />} /> 
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
