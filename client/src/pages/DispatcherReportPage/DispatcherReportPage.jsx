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

  const option2 = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Заявок в час']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Заявок в час',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: " #5BF0B5 "
        },
        emphasis: {
          focus: 'series'
        },
        data: [12, 5, 8, 18, 49, 43, 32, 21, 8]
      },
    ]
  };


  return (
    <div>
      <div className="row align-items-stretch containerCustomer d-flex ">
        <div className="row">
          <div className="col">
            <div className="card colorCardOrange m-4 p-3">
              <div className="card-body m-2">
                <div className="row ">
                  <div className="col numCard p-3 d-flex">15</div>
                  <div className="col textCard p-3 d-flex">В ожидании</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>

            <div className="card colorCardRed m-4 p-3">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-3 d-flex">4</div>
                  <div className="col textCard p-3 d-flex text-end">Сломаны</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card colorCardBlue m-4 p-3">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-3 d-flex">10</div>
                  <div className="col textCard p-3 d-flex text-end">Простаивают</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
            <div className="card colorCardGreen m-4 p-3">
              <div className="card-body">
                <div className="row m-2">
                  <div className="col numCard p-3 d-flex">25</div>
                  <div className="col textCard p-3 d-flex text-end">На заявке</div>
                </div>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-label="Basic example" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="row boxWhite " >
              <div className="row  d-flex" >
                <div className="row textEcharts p-3" >
                  Заявок выполнено за день
                </div>
                <div className="row d-flex" >
                  <span className="col-auto numberCenter  d-flex align-self-end">22</span> <span className=" col-auto  d-flex align-self-end numberCenterSmall">/25</span>
                </div>
              </div>
              <div className="row" >
                <div className="col-auto numberCenterSmall d-flex align-items-baseline" >
                  18/19
                </div>
                <div className="col-auto textEcharts d-flex align-self-center" >
                  Вчера
                </div>
              </div>
            </div>

            <div className="row boxWhite">
              <div className="card-body m-2">
                <div className="col textEcharts p-3 d-flex">
                  <span className="text-center">Загруженность</span> </div>
                <ReactECharts option={option} />
              </div>
            </div>
          </div>
          <div className="col-6">
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
                  <span className="text-center">Количество выполненных заявок по часам</span> </div>
                <ReactECharts option={option2} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatcherReportPage;
