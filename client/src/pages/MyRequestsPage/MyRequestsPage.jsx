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
      <div className="row">
        <div className="menuItem col-3">
          Текущие
        </div>
        <div className="menuItem col-3">
          История заявок
        </div>
        <div className="menuItem col-3">
          Бронь
        </div>
        <div className="row align-items-stretch d-flex cardBoxWhite requestMenu">
        <CalendarComp className="calendarDateSelect"/>
        </div>
      </div>
      <table className="table table-bordered request">
        <tbody>
          {requests &&
            requests?.map((row) => (
              <tr className="bg-white ">
                <td>
                  <p className="textRequest">{row.type}</p> <p>Даты</p>{" "}
                </td>
                <td>{row.status} </td>
                <td>{row.type}</td>
                {row.plannedDateEnd == row.plannedDateStart ? (
                  <>
                    <td>
                      {row.plannedDateStart
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}
                    </td>
                    <td>Точка</td>
                  </>
                ) : (
                  <>
                    <td>
                      {row.plannedDateStart
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}{" "}
                      -{" "}
                      {row.plannedDateEnd
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}
                    </td>
                    <td>Точка</td>
                  </>
                )}
                <td>{row.comment}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestsPage;
