import React from "react";
import "./DispatcherReportPageStyle.css"
const DispatcherReportPage = () => {
  return (
    <div>
      <div className="row align-items-stretch containerCustomer d-flex ">
        <div className="row">
          <div className="col-auto">
            <div className="card colorCardOrange m-3">
              <div className="card-body m-2">
                <div className="row ">
                  <div className="col numCard p-2 d-flex">15</div>
                  <div className="col textCard p-2 d-flex">В ожидании</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card colorCardRed m-3">
              <div className="card-body m-2">
                <div className="row ">
                  <div className="col numCard p-2 d-flex">4</div>
                  <div className="col textCard p-2 d-flex text-end">Сломаны</div>
                </div>
                <div className="row">
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>

              </div>
            </div>
            <div className="card colorCardBlue m-3">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-2 d-flex">10</div>
                  <div className="col textCard p-2 d-flex text-end">Простаивают</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card colorCardGreen m-3">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-2 d-flex">25</div>
                  <div className="col textCard p-2 d-flex text-end">На заявке</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row boxWhite numberCenter" >
              22/25
            </div>
            <div className="row boxWhite">

            </div>
          </div>
          <div className="col">
            <div className="row boxWhite">

            </div>
            <div className="row boxWhite">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatcherReportPage;
