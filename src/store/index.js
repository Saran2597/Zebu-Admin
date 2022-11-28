import Vue from 'vue'
import Vuex from 'vuex'
import zebuLogo from '../assets/images/brokerIcon.png'
import service from '../store/httpService'
import router from '@/router'
import commonFunc from '../mixins/commonFunctions'
import orderWindow from './modules/orderWindow'

// modules
import scripInfo from './modules/scripInfo.js'
import uploadFile from './modules/fileUpload.js'
import cMaster from './modules/contractMaster.js'
import sector from './modules/sector.js'
import event from './modules/event.js'
import result from './modules/result.js'
import news from './modules/news.js'
import logs from './modules/logsData.js'
import apiKey from './modules/apikey.js'
import mpin from './modules/mpin.js'
import payment from './modules/paymentInfo.js'
import vendor from './modules/vendor.js'
import edisdata from './modules/edisfile.js'
import query from './modules/query.js'
import mostActive from './modules/mostActive.js'
import auth from './modules/ssoLogin.js'
import adminMessage from './modules/adminMessage'
import orderAnalysis from './modules/orderChart'
import mobileVersion from './modules/mobileVersion'
import userCountAnalysis from './modules/userCount'
// const aliceblueLogo = `https://a3.aliceblueonline.com/img/loginLogo.cedcf4ac.png`
const aliceblueLogo = `https://aliceblueonline.com/assets/favicon.png`
const abmlLogo = require('../assets/images/abmlLogo.svg')
Vue.use(Vuex)
export default new Vuex.Store({

  state: {
    orderChart : [],
    dayCount:[],
    exchangeCount:[],
    pcodeData:[],
    priceCount: [],
    transtypeCount : [],
    userwiseCount:[],
    datewiseCount:[],
    symbolCount :[],
    ordertypeCount:[],
    brokerName: 'Zebu',
   // brokerName: 'Aliceblue',
    // brokerName: 'ABML',
   brokerLogo: zebuLogo,
   // brokerLogo: aliceblueLogo,
    // brokerLogo: abmlLogo,
    loader: false,
    loginDetails: {},
    userLoginDetails: [],
    userBasedLogs: [],
    urlBasedLogs: [],
    snackbar: {
      show: false,
      msg: '',
      color: '',
      timeout: 2000
    },
    isMobileView: false,
    chartDataLoading: false,
    holidays: [],
    search: '',
    daycount: 'Day_Counts',

    // Order Chart

    
    // chart objects
    USERLOGSCHARTDATA: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: '#c7cfd9',
        textStyle: {
          "color": "#000"
        }
      },
      legend: {
        data: ["Mobile", "Web", "API", "Total"],
        bottom: 10,
        textStyle: {
          "color": "#6e6e6e"
        }
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: 60,
        containLabel: true,
      },
      toolbox: {
        feature: {
          magicType: {
            show: true,
            title: '',
            type: ["line", "bar", 'pie']
          },
          restore: {
            show: false
          },
          saveAsImage: {
            show: true,
            title: 'Save'
          },
          right: "16px"
        }
      },
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
      },
      yAxis: [{
        type: 'value',
        name: "Unique users",
        nameLocation: "middle",
        nameGap: 40,
      }],
      series: [{
        name: 'Mobile',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Web',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'API',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Total',
        data: [],
        type: 'line',
        smooth: true,
      }
      ]
    },

    DASHBOARD_USERLOGS_CHARTDATA: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: '#c7cfd9',
        textStyle: {
          "color": "#000"
        }
      },
      legend: {
        data: ["Mobile", "Web", "API", "Total"],
        bottom: 10,
        textStyle: {
          "color": "#6e6e6e"
        }
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: 60,
        containLabel: true,
      },
      toolbox: {
        feature: {
          magicType: {
            show: true,
            title: '',
            type: ["line", "bar", 'pie']
          },
          restore: {
            show: false
          },
          saveAsImage: {
            show: true,
            title: 'Save'
          },
          right: "16px"
        }
      },
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
      },
      yAxis: [{
        type: 'value',
        name: "Unique users",
        nameLocation: "middle",
        nameGap: 40,
      }],
      series: [{
        name: 'Mobile',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Web',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'API',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Total',
        data: [],
        type: 'line',
        smooth: true,
      }
      ]
    },

    TOTALUSERLOGSCHARTDATA: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: '#c7cfd9',
        textStyle: {
          "color": "#000"
        }
      },
      legend: {
        data: ["Mobile", "Web", "API"],
        bottom: 10,
        textStyle: {
          "color": "#6e6e6e"
        }
      },
      grid: {
        left: "4%",
        right: "4%",
        bottom: 60,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: "Total users",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: [{
        name: 'Mobile',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'Web',
        data: [],
        type: 'line',
        smooth: true,
      },
      {
        name: 'API',
        data: [],
        type: 'line',
        smooth: true
      }
      ]
    },
    DAY_COUNTS: {
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
        data: ['COUNTS'],
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
          name: 'COUNTS',
          type: 'line',
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
    DATE_COUNTS: {
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
        data: ['COUNTS','DAY'],
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
          name: 'COUNTS',
          type: 'line',
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'DAY' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: '' 
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
    EXCHANGE_COUNTS: {
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
        data: ['NSE','BSE', 'MCX', 'CDS', 'NFO'],
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
          name: 'NSE',
          type: 'line',
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'BSE' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'MCX' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'NFO' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'CDS' 
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
    PCODE_COUNTS: {
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
        data: ['CO', 'CNC', 'MIS','NRML'],
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
          type: 'line',
          smooth: true,
          name: 'CO' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'CNC' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'MIS' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'NRML' 
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
    PRICE_COUNTS: {
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
        data: ['L', 'M', 'SL','SL-M'],
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
          type: 'line',
          smooth: true,
          name: 'L' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'M' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'SL' 
        },
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'SL-M' 
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
    TRAINSTYPE_COUNTS: {
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
        data: ['BUY', 'SELL'],
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
          name: 'BUY',
          type: 'line',
        },
        
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'SELL' 
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
    USERWISE_COUNTS: {
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
        data: ['Counts', 'USER'],
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
          name: 'USER' 
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
    DATEWISE_COUNTS: {
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
        data: ['Counts'],
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
    TARDING_SYMBOL_COUNTS: {
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
        data: ['Counts', 'Quantity', 'Trading-Symbol'],
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
          name: 'Quantity' 
        },
     
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'Trading-Symbol' 
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
    SET_ORDERTYPE_COUNTS: {
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
        data: ['BO', 'CO', 'REGULAR'],
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
          name: 'BO',
          type: 'line',
        },
        
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'CO' 
        },
     
        {
          data: [],
          type: 'line',
          smooth: true,
          name: 'REGULAR' 
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
    searchData: [],
    ipoData: [],
    sgbData: [],
    totalServiceHitCount: null,
    topViewsLoader: false,
    usersLoader: false,
    appCode: 'T8CSVenrtyR6gGs'
  },

  mutations: {
    SET_LOGINDETAILS(state, payload) {
      state.loginDetails = payload;
    },
    SET_USERLOGINDETAILS(state, payload) {
      state.userLoginDetails = payload;
      state.userLoginDetailsWithoutWeekends = []
      var is_weekend = function (date1) {
        var dt = new Date(date1);
        if (dt.getDay() == 6 || dt.getDay() == 0) {
          return "weekend"
        } else {
          return 'day'
        }
      }
      payload.forEach(el => {
        if (is_weekend(el.date) == 'day') state.userLoginDetailsWithoutWeekends.push(el)
      })
      this.commit('SET_USERLOGSCHARTDATA', state.userLoginDetailsWithoutWeekends)
      this.commit('SET_DASHBOARD_USERLOGS_CHARTDATA', state.userLoginDetails)
    },
    SET_LOADER(state, payload) {
      state.loader = payload;
    },
    SET_USERBASEDLOGS(state, payload) {
      state.userBasedLogs = payload;
    },
    SET_URLBASEDLOGS(state, payload) {
      state.urlBasedLogs = payload;
    },
    SET_USERLOGSCHARTDATA(state, payload) {
      // Unique users
      state.USERLOGSCHARTDATA.xAxis.data = []
      state.USERLOGSCHARTDATA.series[0].data = []
      state.USERLOGSCHARTDATA.series[1].data = []
      state.USERLOGSCHARTDATA.series[2].data = []
      state.USERLOGSCHARTDATA.series[3].data = []
      // total users
      state.TOTALUSERLOGSCHARTDATA.xAxis.data = []
      state.TOTALUSERLOGSCHARTDATA.series[0].data = []
      state.TOTALUSERLOGSCHARTDATA.series[1].data = []
      state.TOTALUSERLOGSCHARTDATA.series[2].data = []

      payload.forEach(element => {
        // unique users
        state.USERLOGSCHARTDATA.xAxis.data.push(commonFunc.methods.getDateString(new Date(element.date), "d-M-y"));
        state.USERLOGSCHARTDATA.series[0].data.push(element.uniqueMobileLogin);
        state.USERLOGSCHARTDATA.series[1].data.push(element.uniqueWebLogin);
        state.USERLOGSCHARTDATA.series[2].data.push(element.uniqueApiLogin);
        state.USERLOGSCHARTDATA.series[3].data.push(element.totalLogin);
        // total users
        state.TOTALUSERLOGSCHARTDATA.xAxis.data.push(commonFunc.methods.getDateString(new Date(element.date), "d-M-y"));
        state.TOTALUSERLOGSCHARTDATA.series[0].data.push(element.totalMobileLogin);
        state.TOTALUSERLOGSCHARTDATA.series[1].data.push(element.totalWebLogin);
        state.TOTALUSERLOGSCHARTDATA.series[2].data.push(element.totalApiLogin);


      })
      state.TOTALUSERLOGSCHARTDATA.xAxis.data.reverse()
      state.TOTALUSERLOGSCHARTDATA.series[0].data.reverse()
      state.TOTALUSERLOGSCHARTDATA.series[1].data.reverse()
      state.TOTALUSERLOGSCHARTDATA.series[2].data.reverse()
      state.USERLOGSCHARTDATA.xAxis.data.reverse()
      state.USERLOGSCHARTDATA.series[0].data.reverse()
      state.USERLOGSCHARTDATA.series[1].data.reverse()
      state.USERLOGSCHARTDATA.series[2].data.reverse()
      state.USERLOGSCHARTDATA.series[3].data.reverse()


    },
    SET_DASHBOARD_USERLOGS_CHARTDATA(state, payload) {
      state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data = []
      state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data = []
      state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data = []
      state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data = []
      state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data = []
      payload.forEach(element => {
        state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data.push(commonFunc.methods.getDateString(new Date(element.date), "d-M-y"));
        state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data.push(element.uniqueMobileLogin);
        state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data.push(element.uniqueWebLogin);
        state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data.push(element.uniqueApiLogin);
        state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data.push(element.totalLogin);
      })
      state.DASHBOARD_USERLOGS_CHARTDATA.xAxis.data.reverse()
      state.DASHBOARD_USERLOGS_CHARTDATA.series[0].data.reverse();
      state.DASHBOARD_USERLOGS_CHARTDATA.series[1].data.reverse();
      state.DASHBOARD_USERLOGS_CHARTDATA.series[2].data.reverse();
      state.DASHBOARD_USERLOGS_CHARTDATA.series[3].data.reverse();

    },
    SET_SNAKBAR(state, payload) {
      state.snackbar.msg = payload.msg;
      state.snackbar.show = payload.show;
      state.snackbar.color = payload.color;
      state.snackbar.timeout = payload.timeout;
    },
    SET_MOBILEVIEW(state, payload) {
      state.isMobileView = payload
    },
    SET_HOLIDAYS(state, payload) {
      state.holidays = payload
    },

    SET_CANONICAL(state, payload) {
      const canonicalUrl = `${location.origin}${payload}`;
      const head = document.getElementsByTagName('head')[0];
      var element = document.querySelector(`link[rel='canonical']`) || null;
      if (element == null) {
        element = document.createElement('link');
        head.appendChild(element);
      }
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', canonicalUrl);
    },
    SET_SEARCH(state, payload) {
      state.search = payload
    },
    SET_SEARCH_DATA(state, payload) {
      state.searchData = payload
    },
    SET_IPO_DATA(state, payload) {
      state.ipoData = payload
    },
    SET_SGB_DATA(state, payload) {
      state.sgbData = payload
    },
    SET_TOTAL_SERVICE_HIT_COUNT(state, payload) {
      state.totalServiceHitCount = payload.reduce((accumulator, object) => {
        return accumulator + parseInt(object.count);
      }, 0);
    },
    SET_TOP_VIEWS_LOADER(state, payload) {
      state.topViewsLoader = payload
    },
    SET_USERS_LOADER(state, payload) {
      state.usersLoader = payload
    },
   
    COUNT_DETAILS_DATA(state, payload) {
      state.orderChart = payload
      state.DATE_COUNTS.xAxis.data = []
      state.DATE_COUNTS.series[0].data = []
      state.DATE_COUNTS.series[1].data = []
      state.orderChart.forEach(el => {
      state.DATE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
      state.DATE_COUNTS.series[0].data.push(el.Counts)
      state.DATE_COUNTS.series[1].data.push(el.Day.toString())
      })
    },
    SET_USER_DAY_COUNT(state,payload){
      state.dayCount = payload
      state.DAY_COUNTS.xAxis.data = []
      state.DAY_COUNTS.series[0].data = []
      state.dayCount.forEach(el => {
        state.DAY_COUNTS.xAxis.data.push(el.Day)
        state.DAY_COUNTS.series[0].data.push(el.Counts)
      })
    },
  
    SET_EXCHANGE_COUNT(state,payload){
      state.exchangeCount = payload
      state.EXCHANGE_COUNTS.xAxis.data = []
      state.EXCHANGE_COUNTS.series[0].data = []
      state.EXCHANGE_COUNTS.series[1].data = []
      state.EXCHANGE_COUNTS.series[2].data = []
      state.EXCHANGE_COUNTS.series[3].data = []
      state.EXCHANGE_COUNTS.series[4].data = []
      state.exchangeCount.forEach(el => {
      state.EXCHANGE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
      state.EXCHANGE_COUNTS.series[0].data.push(el.BSE)
      state.EXCHANGE_COUNTS.series[1].data.push(el.CDS)
      state.EXCHANGE_COUNTS.series[2].data.push(el.MCX)
      state.EXCHANGE_COUNTS.series[3].data.push(el.NFO)
      state.EXCHANGE_COUNTS.series[4].data.push(el.NSE)
    })
  },
  
  SET_PCODE_COUNT(state, payload){
    state.pcodeData = payload
      state.PCODE_COUNTS.xAxis.data = []
      state.PCODE_COUNTS.series[0].data = []
      state.PCODE_COUNTS.series[1].data = []
      state.PCODE_COUNTS.series[2].data = []
      state.PCODE_COUNTS.series[3].data = []
      state.pcodeData.forEach(el => {
      state.PCODE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
      state.PCODE_COUNTS.series[0].data.push(el.CNC)
      state.PCODE_COUNTS.series[1].data.push(el.CO)
      state.PCODE_COUNTS.series[2].data.push(el.MIS)
      state.PCODE_COUNTS.series[3].data.push(el.NRML)
    })
  },
  SET_PRICE_COUNT(state, payload){
    state.priceCount = payload
      state.PRICE_COUNTS.xAxis.data = []
      state.PRICE_COUNTS.series[0].data = []
      state.PRICE_COUNTS.series[1].data = []
      state.PRICE_COUNTS.series[2].data = []
      state.PRICE_COUNTS.series[3].data = []
      state.priceCount.forEach(el => {
      state.PRICE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
      state.PRICE_COUNTS.series[0].data.push(el.L)
      state.PRICE_COUNTS.series[1].data.push(el.M)
      state.PRICE_COUNTS.series[2].data.push(el.SL)
      state.PRICE_COUNTS.series[3].data.push(el.SL-M)
    })
  }, 
  SET_TRANSTYPE(state, payload){
    state.userwiseCount = payload
    state.TRAINSTYPE_COUNTS.xAxis.data = []
    state.TRAINSTYPE_COUNTS.series[0].data = []
    state.TRAINSTYPE_COUNTS.series[1].data = []
    state.userwiseCount.forEach(el => {
    state.TRAINSTYPE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
    state.TRAINSTYPE_COUNTS.series[0].data.push(el.B)
    state.TRAINSTYPE_COUNTS.series[1].data.push(el.S)
  })
  },

  SET_USERWISE_TRANSTYPE(state, payload){
    state.userwiseCount = payload
    state.USERWISE_COUNTS.xAxis.data = []
    state.USERWISE_COUNTS.series[0].data = []
    state.USERWISE_COUNTS.series[1].data = []
    state.userwiseCount.forEach(el => {
    state.USERWISE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
    state.USERWISE_COUNTS.series[0].data.push(el.Counts)
    state.USERWISE_COUNTS.series[1].data.push(el.user_id)
  })
  },
  SET_DATEWISE(state,payload){
    state.datewiseCount = payload
    state.DATEWISE_COUNTS.xAxis.data = []
    state.DATEWISE_COUNTS.series[0].data = []
    state.DATEWISE_COUNTS.series[1].data = []
    state.datewiseCount.forEach(el => {
    state.DATEWISE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
    state.DATEWISE_COUNTS.series[0].data.push(el.Counts)
    state.DATEWISE_COUNTS.series[1].data.push(el.user_id)
  })
  },
  SET_SYMBOL_COUNTS(state, payload){
    state.symbolCount = payload
    state.TARDING_SYMBOL_COUNTS.xAxis.data = []
    state.TARDING_SYMBOL_COUNTS.series[0].data = []
    state.TARDING_SYMBOL_COUNTS.series[1].data = []
    state.TARDING_SYMBOL_COUNTS.series[2].data = []
    state.symbolCount.forEach(el => {
    state.TARDING_SYMBOL_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
    state.TARDING_SYMBOL_COUNTS.series[0].data.push(el.Counts)
    state.TARDING_SYMBOL_COUNTS.series[1].data.push(el.qty)
    state.TARDING_SYMBOL_COUNTS.series[2].data.push(el.trading_symbol)
  })
  },
  SET_ORDER_TYPE(state,payload){
    state.ordertypeCount = payload
    state.SET_ORDERTYPE_COUNTS.xAxis.data = []
    state.SET_ORDERTYPE_COUNTS.series[0].data = []
    state.SET_ORDERTYPE_COUNTS.series[1].data = []
    state.SET_ORDERTYPE_COUNTS.series[2].data = []
    state.ordertypeCount.forEach(el => {
    state.SET_ORDERTYPE_COUNTS.xAxis.data.push(new Date(el.Date).toLocaleDateString("en-US"))
    state.SET_ORDERTYPE_COUNTS.series[0].data.push(el.bo)
    state.SET_ORDERTYPE_COUNTS.series[1].data.push(el.co)
    state.SET_ORDERTYPE_COUNTS.series[2].data.push(el.regular)
  })
  },
  SET_CHART_DATA_LOADING(state, payload){
    state.chartDataLoading = payload
  }
},
  actions: {
 
    async adminLogin({ commit }, payload) {
      try {
        commit('SET_LOADER', true);
        let json = {
          "adminEmail": payload.userName,
          "adminPassword": payload.password
        }
        await service.adminLogin(json).then(response => {
          if (response.status == 200 && response.data.message == 'login Sucessfull') {
            if (response.data.result) {
              localStorage.setItem('userId', response.data.result.adminName)
              localStorage.setItem('sessionId', response.data.result.userSessionId)
              commit('SET_LOGINDETAILS', response.data.result)
              router.push('/dashboard')
            }
          } else {
            commit('SET_SNAKBAR', {
              msg: response.data.message,
              show: true,
              color: 'red lighten-1',
              timeout: 2500
            })
          }
        }).finally(() => {
          commit('SET_LOADER', false)
        })
      } catch (error) {
        commit('SET_LOADER', false)
        commit('SET_SNAKBAR', {
          msg: error,
          show: true,
          color: 'red lighten-1',
          timeout: 2500
        })
      }
    },
    async getUserLogDetails({ commit }, payload) {
      try {
        commit('SET_USERS_LOADER', true)
        await service.getUserLogDetails().then(response => {
          if (response.status == 200 && response.data.stat == 'Ok') {
            if (response.data.result) {
              commit('SET_USERLOGINDETAILS', response.data.result)
            }
          } else {
            commit('SET_USERLOGINDETAILS', [])
          }
        }).finally(() => {
          commit('SET_USERS_LOADER', false)
        })
      }
      catch (error) {
        commit('SET_SNAKBAR', {
          msg: error,
          show: true,
          color: 'red lighten-1',
          timeout: 2500
        })
      }
    },

    async getUserBasedRecords({ commit }) {
      try {
        commit('SET_LOADER', true);
        await service.getUserBasedRecords().then(response => {
          if (response.status == 200 && response.data.stat == 'Ok') {
            if (response.data.result) {
              commit('SET_USERBASEDLOGS', response.data.result)
            } else {
              commit('SET_USERBASEDLOGS', [])
            }
          }
        }).finally(() => {
          commit('SET_LOADER', false)
        })
      } catch (error) {
        commit('SET_SNAKBAR', {
          msg: error,
          show: true,
          color: 'red lighten-1',
          timeout: 2500
        })
      }
    },

    async getUrlBasedRecords({ commit }, payload) {
      try {
        commit('SET_TOP_VIEWS_LOADER', true);
        // commit('SET_LOADER', true);
        await service.getUrlBasedRecords(payload).then(response => {
          if (response.status == 200 && response.data.stat == 'Ok') {
            if (response.data.result)
              commit('SET_URLBASEDLOGS', response.data.result)
            commit('SET_TOTAL_SERVICE_HIT_COUNT', response.data.result)
          } else {
            commit('SET_URLBASEDLOGS', [])
          }
        }).finally(() => {
          // commit('SET_LOADER', false)
          commit('SET_TOP_VIEWS_LOADER', false);
        })
      } catch (error) {
        commit('SET_TOP_VIEWS_LOADER', false);
      }
    },

    async getHolidays({
      commit
    }) {
      commit('SET_LOADER', true);
      await service.getHolidays().then(response => {
        if (response.status == 200) {
          if (response.data.result)
            commit('SET_HOLIDAYS', response.data.result)
        }
      }).finally(() => {
        commit('SET_LOADER', false)
      })
    },

    async getSearchData({
      commit
    }, payload) {
      commit('SET_LOADER', true);
      await service.getSearchData(payload).then(response => {
        if (response.status == 200) {
          commit('SET_SEARCH_DATA', response.data)
        } else commit('SET_SEARCH_DATA', [])
      }).finally(() => {
        commit('SET_LOADER', false)
      })
    },
    async getIpo({
      commit
    }) {
      commit('SET_LOADER', true);
      await service.getIpo().then(response => {
        if (response.status == 200) {
          if (response.data.result)
            commit('SET_IPO_DATA', response.data.result)
          else
            commit('SET_IPO_DATA', [])
        }
      }).finally(() => {
        commit('SET_LOADER', false)
      })
    },
    async getSgb({
      commit
    }) {
      commit('SET_LOADER', true);
      await service.getSgb().then(response => {
        if (response.status == 200) {

          if (response.data.result)
            commit('SET_SGB_DATA', response.data.result)
          else
            commit('SET_SGB_DATA', [])
        }
      }).finally(() => {
        commit('SET_LOADER', false)
      })
    },
    async schedulerOnOff({
      commit
    }, payload) {
      commit('SET_LOADER', true);
      try {
        service.schedulerOnOff(payload).then(response => {
          if (response.status == 200) {
            commit('SET_SNAKBAR', {
              msg: response.data,
              show: true,
              color: 'teal darken-1',
              timeout: 2500
            })
          } else commit('SET_SNAKBAR', {
            msg: response.data,
            show: true,
            color: 'red',
            timeout: 2500
          })
        }).finally(() => {
          commit('SET_LOADER', false)
        })
      } catch (error) {
        commit('SET_LOADER', false)
        commit('SET_SNAKBAR', {
          msg: error,
          show: true,
          color: 'red',
          timeout: 2500
        })
      }
    },
    async getPayOffData({commit,state},payload) {
      await service.getChartAnlaysis(payload).then(response =>{
     
        try {
          if (response.status == 200) {
            if(payload.chart_key[0] == 'Date_Counts'){
              commit('COUNT_DETAILS_DATA', response.data[0].Date_Counts)
            }else if(payload.chart_key[0] == 'Day_Counts') {
              commit('SET_USER_DAY_COUNT', response.data[0].Day_Counts)
              this.commit('COUNT_DETAILS_DATA', [])
            }
            else if(payload.chart_key[0] == 'Exch_Counts'){
              commit('SET_EXCHANGE_COUNT', response.data[0].Exch_Counts)
            }
            else if(payload.chart_key[0] == 'pcode_Counts'){
              commit('SET_PCODE_COUNT', response.data[0].pcode_Counts)
            }
            else if(payload.chart_key[0] == 'prc_type_Counts'){
              commit('SET_PRICE_COUNT', response.data[0].prc_type_Counts)
            }
            else if(payload.chart_key[0] == 'trans_type_Counts'){
              commit('SET_TRANSTYPE', response.data[0].trans_type_Counts)
            }
            else if(payload.chart_key[0] == 'user_wise_order_Counts'){
              commit('SET_USERWISE_TRANSTYPE', response.data[0].user_wise_order_Counts)
            }
            else if(payload.chart_key[0] == 'date_wise_sumof_order'){
              commit('SET_DATEWISE',  response.data[0].date_wise_sumof_order)
            }
            else if(payload.chart_key[0] == 'trading_symbol_Counts'){
              commit('SET_SYMBOL_COUNTS',response.data[0].trading_symbol_Counts)
            }
            else if (payload.chart_key[0] == 'order_type_Counts'){
              commit('SET_ORDER_TYPE',response.data[0].order_type_Counts)
            }
          }
        } catch (error) {
          
        }
      }).finally(() =>{

      })
    },

    async chartCount({commit,state},payload) {
      await service.getChartAnlaysis(payload).then(response =>{
        if (response.status == 200) {
          commit('SET_USER_DAY_COUNT', response.data[0].Day_Counts)
          console.log(response.data[0].Day_Counts)
      }
      }) 
    },


    // async exchangeChart({commit,state},payload) {
    //   await service.getChartAnlaysis(payload).then(response =>{
    //     if (response.status == 200) {
      
    //       commit('SET_EXCHANGE_COUNT', response.data[0].Exch_Counts)
    //       // console.log(response.data[0].Day_Counts)
    //       console.log(response.data[0].Exch_Counts)
    //   }
    //   })
      
    // },
    // async pcodeCounts({commit,state},payload) {
    //   await service.getChartAnlaysis(payload).then(response =>{
    //     if (response.status == 200) {
      
    //       commit('SET_PCODE_COUNT', response.data[0].pcode_Counts)
    //       // console.log(response.data[0].Day_Counts)
    //       console.log(response.data[0].pcode_Counts)
    //   }
    //   })
      
    // },
    // async getDaywiseChart({commit, state}){
    //   commit('SET_USER_DAY_COUNT', state.dayCount)
    //   // commit('SET_ORDER_COUNT', state.orderTypeCounts)
    // }, 
    // async getExchange({commit, state}){
    //   commit('SET_EXCHANGE_COUNT', state.exchangeCount)
    // }
  },

  getters: {
    getBrokerName: state => {
      return state.brokerName
    },
    getUserLoginDetails: state => {
      return state.userLoginDetails
    },
    getUserLoginDetailsWithoutWeekends: state => {
      return state.userLoginDetailsWithoutWeekends
    },
    getLoader: state => {
      return state.loader
    },
    getUserBasedLogs: state => {
      return state.userBasedLogs
    },
    getUrlBasedLogs: state => {
      return state.urlBasedLogs
    },
    GETUSERLOGSCHARTDATA: state => {
      return state.USERLOGSCHARTDATA
    },
    GET_DASHBOARD_USERLOGS_CHARTDATA: state => state.DASHBOARD_USERLOGS_CHARTDATA,
    GETTOTALUSERLOGSCHARTDATA: state => {
      return state.TOTALUSERLOGSCHARTDATA
    },
    getSnackbar: state => {
      return state.snackbar
    },
    getIsMobileView: state => {
      return state.isMobileView
    },
    getHolidays: state => {
      return state.holidays
    },
    getSearch: state => {
      return state.search
    },
    getSearchData: state => {
      return state.searchData
    },
    getIpoData: state => {
      return state.ipoData
    },
    getSgbData: state => {
      return state.sgbData
    },
    getTotalServiceHitCount: state => state.totalServiceHitCount,
    getTopViewsLoader: state => state.topViewsLoader,
    getUsersLoader: state => state.usersLoader,
    getAuthCode: (state) => state.appCode,
    getUserCount: state => state.DATE_COUNTS,
    getDayCount: state => state.DAY_COUNTS,
    getExchangeCount: state => state.EXCHANGE_COUNTS,
    getpCodeCount: state => state.PCODE_COUNTS,
    getpriceCount: state => state.PRICE_COUNTS,
    getTranstypeCount : state => state.TRAINSTYPE_COUNTS,
    getuserwiseTrasntypeCount : state => state.USERWISE_COUNTS,
    getdatewiseCount: state => state.DATEWISE_COUNTS,
    gettradingSymbolCount: state => state.TARDING_SYMBOL_COUNTS,
    getordertypeCount: state => state.SET_ORDERTYPE_COUNTS,
    getChartcountsLoading: state => state.chartDataLoading
  },

  modules: {
    scripInfo,
    uploadFile,
    cMaster,
    sector,
    event,
    result,
    news,
    logs,
    apiKey,
    mpin,
    payment,
    vendor,
    edisdata,
    query,
    mostActive,
    orderWindow,
    auth,
    adminMessage,
    orderAnalysis,
    userCountAnalysis,
    mobileVersion
}
})