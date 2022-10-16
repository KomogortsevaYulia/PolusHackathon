import React from "react";
import "./MyRequestsPage.style.css";
import CalendarComp from "../../components/Calendar/CalendarComp.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestByClientId } from "../../store/requestSlice/requestSlice";
import {
  faMagnifyingGlass,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

      <div className="col mt-4">
        {requests &&
          requests?.map((row) => (
            <>
              <div className="row requestTable d-flex mt-3">
                <div className="col-1 borderItem pt-4">
                  {row.status === "Создана" ? (
                    <FontAwesomeIcon icon={faCheck} size="2x" color="#1A73E8" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCheckDouble}
                      size="2x"
                      color="#11BE56"
                    />
                  )}
                  <p className="mt-2">{row.status}</p>
                </div>
                <div className="col-3 pt-4 borderItem">
                  <p className="requestType">{row.type}</p>
                  {row.plannedDateEnd === row.plannedDateStart ? (
                    <p>
                      {row.plannedDateStart
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}
                    </p>
                  ) : (
                    <p>
                      {row.plannedDateStart
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}{" "}
                      -{" "}
                      {row.plannedDateEnd
                        .split("T")
                        .map((s) => s.split(".")[0])
                        .join(" ")}
                    </p>
                  )}
                </div>
                {row.type === "Работа на точке" ? (
                  <>
                    <div className="col-2 borderItem pt-4">
                      {row.firstPlace}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-2 borderItem pt-4">
                      {row.firstPlace}
                    </div>
                    <div className="col-2 borderItem pt-4">
                      {row.secondPlace}
                    </div>
                  </>
                )}
                <div className="col pt-5">{row.comment}</div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default MyRequestsPage;
