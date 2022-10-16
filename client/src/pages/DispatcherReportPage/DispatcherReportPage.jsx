import React from "react";
import "./DispatcherReportPageStyle.css"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactECharts from "echarts-for-react";



const DispatcherReportPage = () => {

  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 60,
            name: '%'
          }
        ]
      }
    ]
  };


  return (
    <div>
      <div className="row align-items-stretch containerCustomer d-flex ">
        <div className="row">
          <div className="col-auto">
            <div className="card colorCardOrange m-5">
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

            <div className="card colorCardRed m-5">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-2 d-flex">4</div>
                  <div className="col textCard p-2 d-flex text-end">Сломаны</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card colorCardBlue m-5">
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
            <div className="card colorCardGreen m-5">
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
              <div className="row" >
                <div className="row" >
                  Заявок выполнено за день
                </div>
                <div className="row" >
                  22/25
                </div>
              </div>
              <div className="row" >
                <div className="col" >
                  18/19
                </div>
                <div className="col" >
                  Вчера
                </div>
                <div className="col" >
                  В среднем за сутки выполняется заявок
                </div>
              </div>
            </div>
            <div className="row boxWhite">

            </div>
          </div>
          <div className="col">
            <div className="row boxWhite cardProblem">
              <div className="card-body m-4 ">
                <div className="row">
                  <div className="col numCard p-2 ps-5 d-flex">6</div>
                  <div className="col textCard p-3 d-flex text-end">Проблем</div>
                </div>
                <div className="row">
                  <div className="col textCard p-2 ps-5 d-flex">Подробнее
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row boxWhite cardOk">
              <div className="card-body m-4">
                <div className="row text-end">
                  <div className="col numCard p-2 ps-5 d-flex ">15</div>
                  <div className="col textCard p-3 d-flex text-end">Закрытых заявок</div>
                </div>
                <div className="row text-end">
                  <div className="col textCard p-2 ps-5 d-flex ">Подробнее
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row boxWhite">
              <div className="card-body m-4">
                <div className="col textEcharts p-3 d-flex">
                  <span className="text-center">Загруженность</span> </div>
                <ReactECharts option={option} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatcherReportPage;
