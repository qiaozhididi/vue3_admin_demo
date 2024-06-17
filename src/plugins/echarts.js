/**
 * Echarts图表库配置
 */
import * as echarts from "echarts";
//加载地图
import china from "@/assets/json/china.json";

export default {
  // Echarts挂载到Vue全局
  install: (app) => {
    app.config.globalProperties.$line = (element, data) => {
      //加载折线图
      let myChart = echarts.init(document.getElementById(element));
      const option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["隧道数量", "检验合格", "正在施工", "地址预测"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: data,
      };
      myChart.setOption(option);
    };
    app.config.globalProperties.$radar = (element, data) => {
      let myChart = echarts.init(document.getElementById(element));
      const option = {
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 10 },
            { name: "Administration", max: 10 },
            { name: "Customer Support", max: 10 },
            { name: "Development", max: 10 },
            { name: "Marketing", max: 10 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    };
    app.config.globalProperties.$pie = (element, data) => {
      let myChart = echarts.init(document.getElementById(element));
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    };
    app.config.globalProperties.$bar = (element, data) => {
      const myChart = echarts.init(document.getElementById(element));
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };
      myChart.setOption(option);
    };
    app.config.globalProperties.$map = (element, data) => {
      const myChart = echarts.init(document.getElementById(element));
      echarts.registerMap("china", china); //注册地图
      const options = {
        //点击弹窗
        tooltip: {
          triggerOn: "click",
          enterable: true, //是否弹窗
        },
        visualMap: {
          origin: "vertical",
          type: "piecewise",
          pieces: [
            { min: 0, max: 0, color: "#54afad" },
            { min: 0, max: 10, color: "#f234ad" },
            { min: 0, max: 20, color: "#f23553" },
            { min: 0, max: 30, color: "#a21345" },
            { min: 0, max: 100, color: "#123542" },
          ],
        },
        series: [
          {
            name: "中国地图",
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.2,
            label: {
              show: true,
              fontSize: 8,
            },
            itemStyle: {
              areaColor: "#fff",
              borderColor: "#ccc",
              borderWidth: 0.5,
            },
            data: [
              { name: "北京", value: 12 },
              { name: "天津", value: 40 },
              { name: "上海", value: 50 },
              { name: "重庆", value: 20 },
              { name: "河北", value: 30 },
              { name: "河南", value: 10 },
              { name: "云南", value: 0 },
              { name: "辽宁", value: 40 },
              { name: "黑龙江", value: 10 },
              { name: "湖南", value: 100 },
            ],
          },
        ],
      };
      myChart.setOption(options);
    };
  },
};
