import React from "react";
import "./MyRequestsPage.style.css";
import CalendarComp from "../../components/Calendar/CalendarComp.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestByClientId } from "../../store/requestSlice/requestSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
=======

>>>>>>> f1e96a2023b77dab1c38d9e39c942f9f13500da0

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
    <div className="container">
      <div className="myRequestMenu row">
        <div className="myRequestMenuItem col-2">
          <p>Текущие</p>
        </div>
        <div className="myRequestMenuItem col-2">
          <p>История заявок</p>
        </div>
        <div className="myRequestMenuItem col-2">
          <p>Бронь</p>
        </div>
        <div className="myRequestMenuItem col-2">
          <CalendarComp className="calendarDateSelect" />
        </div>
        <div className="myRequestMenuItem col-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Найти"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary col-2"
              type="button"
              id="button-addon2"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </div>
      <table className="table table-bordered request mt-3">
        <tbody>
          {requests &&
            requests?.map((row) => (
              <tr className="bg-white ">
                <td>
                  <p className="textRequest">{row.type}</p> <p>Даты</p>{" "}
                </td>
                <td>{row.status} </td>
                <td>{row.type}</td>
                {row.plannedDateEnd === row.plannedDateStart ? (
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
