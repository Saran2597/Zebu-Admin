import { mapGetters } from "vuex";
export default {
    data: () => ({}),
    computed: {
        ...mapGetters('logs', {
            webUserCount: "getWebUserCount",
            mobileUserCount: "getMobileUserCount",
            apiUserCount: "getApiUserCount",
            userLogCount: "getUserLogCount",
        }),
    },
    methods: {
        // downloadCsv (page, data) {
        //     if (data.length != 0) {
        //         var html = document.getElementById("tableData").outerHTML;
        //         this.exportToCsv(html, `${page}.csv`);
        //     }
        // },
        //  createCSV(array){
        //     var keys = Object.keys(array[0]); //Collects Table Headers

        //     var result = ''; //CSV Contents
        //     result += keys.join(','); //Comma Seperates Headers
        //     result += '\n'; //New Row

        //     array.forEach(function(item){ //Goes Through Each Array Object
        //       keys.forEach(function(key){//Goes Through Each Object value
        //         result += item[key] + ','; //Comma Seperates Each Key Value in a Row
        //       })
        //       result += '\n';//Creates New Row
        //     })

        //     return result;
        //   },


        // download_csv (csv, filename) {
        //     var csvFile;
        //     var downloadLink;
        //     // CSV FILE
        //     csvFile = new Blob([csv], { type: "text/csv" });
        //     // Download link
        //     downloadLink = document.createElement("a");
        //     // File name
        //     downloadLink.download = filename;
        //     // We have to create a link to the file
        //     downloadLink.href = window.URL.createObjectURL(csvFile);
        //     // Make sure that the link is not displayed
        //     downloadLink.style.display = "none";
        //     // Add the link to your DOM
        //     document.body.appendChild(downloadLink);
        //     // Lanzamos
        //     downloadLink.click();
        // },

        // format date
        getDateString (date, format) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                // var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                getPaddedComp = function (comp) {
                    return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
                },
                formattedDate = format,
                o = {
                    "y+": date.getFullYear(), // year
                    "M+": months[date.getMonth()], //month
                    "d+": getPaddedComp(date.getDate()), //day
                    "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
                    "H+": getPaddedComp(date.getHours()), //hour
                    "m+": getPaddedComp(date.getMinutes()), //minute
                    "s+": getPaddedComp(date.getSeconds()), //second
                    "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
                    "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
                };
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    formattedDate = formattedDate.replace(RegExp.$1, o[k]);
                }
            }
            return formattedDate;
        },
        getDayFromDate (date) {
            var dt = new Date(date);
            if (dt.getDay() == 0) {
                return 'Sunday'
            } else if (dt.getDay() == 1) {
                return 'Monday'
            } else if (dt.getDay() == 2) {
                return 'Tuesday'
            } else if (dt.getDay() == 3) {
                return 'Wednesday'
            } else if (dt.getDay() == 4) {
                return 'Thursday'
            } else if (dt.getDay() == 5) {
                return 'Friday'
            } else if (dt.getDay() == 6) {
                return 'Saturday'
            }
        },
        // async JSONToCSVConvertor (JSONData, ReportTitle, ShowLabel) {
        //     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        //     var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        //     var CSV = '';
        //     //Set Report title in first row or line

        //     CSV += ReportTitle + '\r\n\n';

        //     //This condition will generate the Label/Header
        //     if (ShowLabel) {
        //         var row = "";

        //         //This loop will extract the label from 1st index of on array
        //         for (var index in arrData[0]) {

        //             //Now convert each value to string and comma-seprated
        //             row += index + ',';
        //         }

        //         row = row.slice(0, -1);

        //         //append Label row with line break
        //         CSV += row + '\r\n';
        //     }

        //     //1st loop is to extract each row
        //     for (var i = 0; i < arrData.length; i++) {
        //         var row = "";

        //         //2nd loop will extract each column and convert it in string comma-seprated
        //         for (var index in arrData[i]) {
        //             row += '"' + arrData[i][index] + '",';
        //         }

        //         row.slice(0, row.length - 1);

        //         //add a line break after each row
        //         CSV += row + '\r\n';
        //     }

        //     if (CSV == '') {
        //         alert("Invalid data");
        //         return;
        //     }

        //     //Generate a file name
        //     var fileName = "MyReport_";
        //     //this will remove the blank-spaces from the title and replace it with an underscore
        //     fileName += ReportTitle.replace(/ /g, "_");

        //     //Initialize file format you want csv or xls
        //     var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        //     // Now the little tricky part.
        //     // you can use either>> window.open(uri);
        //     // but this will not work in some browsers
        //     // or you will not get the correct file extension    

        //     //this trick will generate a temp <a /> tag
        //     var link = document.createElement("a");
        //     link.href = uri;

        //     //set the visibility hidden so it will not effect on your web-layout
        //     link.style = "visibility:hidden";
        //     link.download = fileName + ".csv";

        //     //this part will append the anchor tag and remove it after automatic click
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        // },
        // sumValues () {
        //     return 500;
        // },

        /***Method to create and download CSV File */

        downloadUnicodeCSV(objArray) {
            var arr = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            var str =`${Object.keys(arr[0]).map((value) => `"${value}"`).join(',')}` + '\r\n';
            var csvContent = arr.reduce((st, next) => {
            st += `${Object.values(next).map((value) => `"${value}"`).join(',')}` + '\r\n';
            return st;
            }, str);
            var element = document.createElement('a');
            element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
            // console.table(csvContent)
            element.target = '_blank';
            element.download = 'Document.csv';
            element.click();
          },

          ruppesFormat (num) {
            var n1, n2;
            num = num + "" || "";
            // works for integer and floating as well
            n1 = num.split(".");
            n2 = n1[1] || null;
            n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
            num = n2 ? n1 + "." + n2 : n1;
            return num;
        },

        getDate(){
            const obj = {date};

const date = new Date(obj.date * 1000); 

console.log(new Intl.DateTimeFormat('en-GB').format(date));
        }
    },
};
