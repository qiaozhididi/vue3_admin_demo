/**
 * Echarts图表库配置
 */
import * as echarts from "echarts";

export default {
  // Echarts挂载到Vue全局
  install: (app) => {
    app.config.globalProperties.$line = (element) => {
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
        series: [
          {
            name: "隧道数量",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "检验合格",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "正在施工",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "地址预测",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };
      myChart.setOption(option);
    };
  },
};
