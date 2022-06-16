// export const refChartData = [
//   {
//     date: "00:00",
//     refNum: 0,
//   },
//   {
//     date: "01:00",
//     refNum: 0,
//   },
//   {
//     wdate: "02:00",
//     refNum: 0,
//   },
//   {
//     date: "03:00",
//     refNum: 0,
//   },
//   {
//     date: "04:00",
//     refNum: 0,
//   },
//   {
//     date: "05:00",
//     refNum: 0,
//   },
//   {
//     date: "06:00",
//     refNum: 0,
//   },
//   {
//     date: "07:00",
//     refNum: 0,
//   },
//   {
//     date: "08:00",
//     refNum: 0,
//   },
//   {
//     date: "09:00",
//     refNum: 0,
//   },
//   {
//     date: "10:00",
//     refNum: 0,
//   },
//   {
//     date: "11:00",
//     refNum: 0,
//   },
//   {
//     date: "12:00",
//     refNum: 0,
//   },
//   {
//     date: "13:00",
//     refNum: 0,
//   },
//   {
//     date: "14:00",
//     refNum: 0,
//   },
//   {
//     date: "15:00",
//     refNum: 0,
//   },
//   {
//     date: "16:00",
//     refNum: 0,
//   },
//   {
//     date: "17:00",
//     refNum: 0,
//   },
//   {
//     date: "18:00",
//     refNum: 0,
//   },
//   {
//     date: "19:00",
//     refNum: 0,
//   },
//   {
//     date: "20:00",
//     refNum: 0,
//   },
//   {
//     date: "21:00",
//     refNum: 0,
//   },
//   {
//     date: "22:00",
//     refNum: 0,
//   },
//
//   {
//     date: "23:00",
//     refNum: 0,
//   },
//
//   {
//     date: "00:00",
//     refNum: 0,
//   },
// ];

import {sendReq} from "./sendReq";

export const refChartDataMob = [
  {
    date: "00:00",
    refNum: 0,
  },

  {
    wdate: "02:00",
    refNum: 0,
  },

  {
    date: "04:00",
    refNum: 0,
  },

  {
    date: "06:00",
    refNum: 0,
  },

  {
    date: "08:00",
    refNum: 0,
  },

  {
    date: "10:00",
    refNum: 0,
  },

  {
    date: "12:00",
    refNum: 0,
  },

  {
    date: "14:00",
    refNum: 0,
  },

  {
    date: "16:00",
    refNum: 0,
  },

  {
    date: "18:00",
    refNum: 0,
  },

  {
    date: "20:00",
    refNum: 0,
  },

  {
    date: "22:00",
    refNum: 0,
  },

  {
    date: "00:00",
    refNum: 0,
  },
];

export const refChartData = [
    {
      date: "06.12",
      refNum: 1,
    },
    {
      date: "06.12",
      refNum: 2,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 5,
    },
    {
      date: "06.12",
      refNum: 20,
    },
    {
      date: "06.12",
      refNum: 20,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 3,
    },
    {
      date: "06.12",
      refNum: 6,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 15,
    },
    {
      date: "06.12",
      refNum: 12,
    },
    {
      date: "06.12",
      refNum: 1,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 3,
    },
    {
      date: "06.12",
      refNum: 6,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 15,
    },
    {
      date: "06.12",
      refNum: 12,
    },
    {
      date: "06.12",
      refNum: 1,
    },
    {
      date: "06.12",
      refNum: 10,
    },
    {
      date: "06.12",
      refNum: 1,
    },
    {
      date: "06.12",
      refNum: 10,
    },
  ];

export const fetchRefChartData = async () => {
    let res = {}
    // let res = await sendReq("get", "affiliate/stat");
    res.data = {
        "result": "success",
        "data": {
            "stat": {
                "2022-06-13": {
                    "amount": "16.1889000",
                    "dt": "13/06",
                    "time": 1655078400,
                    "sum": 16.1889,
                    "color": "#0374E7",
                    "colorsum": "#9a1ce8"
                },
                "2022-06-14": {
                    "amount": "2605.7139000",
                    "dt": "14/06",
                    "time": 1655164800,
                    "sum": 2621.9028,
                    "color": "#0374E7",
                    "colorsum": "#9a1ce8"
                }
            },
            "metrics": {
                "total_profit": 2621.9028,
                "total_month": 2621.9028,
                "total_week": 2621.9028,
                "total_day": 0
            }
        }
    }
    // res.data = {
    //     "result": "success",
    //     "data": {
    //         "stat": {
    //             "2022-06-13": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-14": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-15": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-16": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-17": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-18": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-19": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-20": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-21": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-22": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-23": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-24": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-25": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-26": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-27": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-28": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-29": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-30": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-31": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-32": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-33": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-34": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-35": {
    //                 "amount": "16.1889000",
    //                 "dt": "13/06",
    //                 "time": 1655078400,
    //                 "sum": 16.1889,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //             "2022-06-36": {
    //                 "amount": "2605.7139000",
    //                 "dt": "14/06",
    //                 "time": 1655164800,
    //                 "sum": 2621.9028,
    //                 "color": "#0374E7",
    //                 "colorsum": "#9a1ce8"
    //             },
    //         },
    //         "metrics": {
    //             "total_profit": 2621.9028,
    //             "total_month": 2621.9028,
    //             "total_week": 2621.9028,
    //             "total_day": 0
    //         }
    //     }
    // }

    let chartData = []

    if (res) {
        if (res.data.result === "success") {
            if (res.data.data) {
                for (let date in res.data.data.stat) {
                    chartData.push({
                        date: res.data.data.stat[date].dt,
                        refNum: res.data.data.stat[date].sum
                    })
                }
                if (chartData.length > 20) {
                    // if chartData has more than 20 days, it will take only last 20
                    chartData = chartData.slice(-20)
                }
            }
        }
    }
    if (chartData.length < 20) {
        // if chartData has less than 20 days, it will add some empty columns to make chart looks better
        const countOfEmptyColumnsToAdd = 20 - chartData.length;
        for (let i = 0; i < countOfEmptyColumnsToAdd; ++i) {
            chartData.unshift({
                date: '',
                refNum: 0
            })
        }
    }
    return chartData
}
