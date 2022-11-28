import service from "../httpService";
import router from "@/router";
const userCountAnalysis = {
  namespaced: true,

  state: {
    orderChart : [
        {
            "Counts": 43763,
            "Date": 1659312000000,
            "Day": "Monday"
          },
          {
            "Counts": 54831,
            "Date": 1659398400000,
            "Day": "Tuesday"
          },
          {
            "Counts": 53489,
            "Date": 1659484800000,
            "Day": "Wednesday"
          },
          {
            "Counts": 74339,
            "Date": 1659571200000,
            "Day": "Thursday"
          },
          {
            "Counts": 49495,
            "Date": 1659657600000,
            "Day": "Friday"
          },
          {
            "Counts": 56608,
            "Date": 1659916800000,
            "Day": "Monday"
          },
          {
            "Counts": 3845,
            "Date": 1660003200000,
            "Day": "Tuesday"
          },
          {
            "Counts": 64253,
            "Date": 1660089600000,
            "Day": "Wednesday"
          }
      ],
      OPTIONS: {
        axisPointer: {
          link: {
            xAxisIndex: 'all',
            type: "shadow"
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: true
        }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          y: 'center',
          itemSize: 12,
          feature: {
            mark: {
              show: true,
              title: {
                mark: 'Create line mark',
                markUndo: 'Undo line mark',
                markClear: 'Clear all line Marks'
              },
              lineStyle: {
                width: 2,
                color: '#1e90ff',
                type: 'dashed'
              }
            },
        
            dataView: {
              show: true,
              title: 'Show Data',
              readOnly: false,
              lang: ['Data View', 'Close', 'Refresh']
            },
            magicType: {
              show: true,
              type: ['line', 'bar'],
              title: {
                line: 'Line View',
                bar: 'Bar View'
              }
            },
            restore: {
              show: true,
              title: 'Restore'
            },
            saveAsImage: {
              show: true,
              title: 'Save as Image',
              lang: ['Click Save']
            }
          }
        },
        legend: {
          data: ['Counts',"Days",],
          bottom: 15,
          textStyle: {
            "color": "#6e6e6e"
          }
        },
  
  
        xAxis: {
          nameGap: 10,
          grid: {
            left: "2%",
            right: "2%",
            containLabel: true,
          },
          
          data: [],
          type: 'category',
          name: '',
        
        },
        yAxis: [{
          type: 'value',
          name: '',
  
        }],
    
        
        series: [
          {
            data: [],
            smooth: true,
            name: 'Counts',
            type: 'line',
          },
          {
            data: [],
            type: 'line',
            smooth: true,
            name: 'Days'
          },
          {
            data: [],
            type: 'line',
            smooth: true,
            name: ''
          },
         
        ],
        visualMap: {
          pieces: [{
            gt: 1,
            lt: 3,
            color: 'rgba(0, 180, 0, 0.5)'
          }, 
          {
            gt: 5,
            lt: 7,
            color: 'red'
          }],
          show: false,
          min: 0,
          max: 1,
  
          inRange: {
          color: ['#fbd9d3', '#C4DFB8'],
            lineStyle: {
              color: 'green',
              width: 2
            },
            },
          visualMap: false,
          calculable: true
        },
  
  
      },
  },

  mutations: {
    SET_USER_COUNT(state, payload){
        state.orderChart = payload
      state.OPTIONS.xAxis.data = []
      state.OPTIONS.series[0].data = []
      state.OPTIONS.series[1].data = []
      state.OPTIONS.series[2].data = []
      state.orderChart.forEach(el => {
      state.OPTIONS.xAxis.data.push(el.Date)
      state.OPTIONS.series[0].data.push(el.Counts)
      state.OPTIONS.series[1].data.push(el.Day.toString())
      state.OPTIONS.series[2].data.push(el.Day.toString())
      
      })
    }
  },

  actions: {
    async getPayOffData({commit,state
    }) {
      commit('SET_USER_COUNT', state.orderChart)
    }
  },

  getters: {
   
  },
};
export default userCountAnalysis;