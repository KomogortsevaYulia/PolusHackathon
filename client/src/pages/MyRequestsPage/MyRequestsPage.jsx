import React from "react";
import "./MyRequestsPage.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CalendarComp from "../../components/Calendar/CalendarComp.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestByClientId } from "../../store/requestSlice/requestSlice";

const MyRequestsPage = () => {
  const { user } = useSelector((state) => state.user);
  const { requests } = useSelector((state) => state.request);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRequestByClientId(user.id));
  }, []);

  React.useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <div className="containerCustomer">
      <div className="row align-items-stretch  d-flex card searchBox">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="dropdown">
                <CalendarComp className="calendarDateSelect col-12" />
              </div>
            </div>
            <div className="col-6">qq</div>
          </div>
        </div>
      </div>
      <table className="table table-bordered request">
        <tbody>
          <tr>
            <td>
              <p className="textRequest">Работа на точке</p> <p>Даты</p>{" "}
            </td>
            <td>Время</td>
            <td>Точка</td>
            <td>Исполнитель</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestsPage;
