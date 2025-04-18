<template>
    <div>
        <h1 class="page-title">Integrating with amCharts</h1>
        <div class="description-blocks first-description-block">
            <p>
                Extend Flexmonster’s visualization functionality by integrating with the
                amCharts library:
                <a href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_vue" target="_blank"
                    class="title-link">Integration with amCharts</a>.
            </p>
        </div>
        <ClientOnly>
          <Pivot
          ref="pivot"
          toolbar
          height="600"
          report="https://cdn.flexmonster.com/github/demo-report.json"
          v-bind:reportcomplete="reportComplete"
          v-bind:shareReportConnection="{
            url: 'https://olap.flexmonster.com:9500',
          }"
          v-bind:beforetoolbarcreated="customizeToolbar"
          licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
          />
        </ClientOnly>
        <div class="chart-container">
            <div id="amcharts-container" style="width: 100%; height: 500px"></div>
        </div>
    </div>
</template>

<script>
// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { defineComponent } from 'vue';

export default /*#__PURE__*/defineComponent({
    name: "WithAmcharts",
    methods: {
        customizeToolbar: function (toolbar) {
            toolbar.showShareReportTab = true;
        },
        reportComplete: function () {
            this.$refs.pivot.flexmonster.off("reportcomplete");
            this.drawChart();
        },

        drawChart: function () {
            //Running Flexmonster's getData method for amCharts
            this.$refs.pivot.flexmonster.amcharts.getData(
                {},
                this.createChart.bind(this),
                this.updateChart.bind(this)
            );
        },

        createChart: function (chartData, rawData) {

            /* Create root element and chart instance */
            this.root = am5.Root.new("amcharts-container");
            let chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
            }));

            /* Apply amCharts theme */
            this.root.setThemes([
                am5themes_Animated.new(this.root),
            ]);

            /* Apply number format from Flexmonster */
            this.root.numberFormatter.set("numberFormat", this.$refs.pivot.flexmonster.amcharts.getNumberFormatPattern(rawData.meta.formats[0]));

            /* Create and configure Y axis */
            let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
                categoryField: this.$refs.pivot.flexmonster.amcharts.getCategoryName(rawData),
                renderer: am5xy.AxisRendererY.new(this.root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                })
            }));

            /* Create and configure X axis */
            let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
                renderer: am5xy.AxisRendererX.new(this.root, {}),
            }));

            xAxis.set("numberFormatter", am5.NumberFormatter.new(this.root, {
                "numberFormat": "#a"
            }));

            /* Create and configure series for a bar chart */
            let series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
                name: this.$refs.pivot.flexmonster.amcharts.getMeasureNameByIndex(rawData, 0),
                xAxis: xAxis,
                yAxis: yAxis,
                sequencedInterpolation: true,
                valueXField: this.$refs.pivot.flexmonster.amcharts.getMeasureNameByIndex(rawData, 0),
                categoryYField: this.$refs.pivot.flexmonster.amcharts.getCategoryName(rawData),
                tooltip: am5.Tooltip.new(this.root, {
                    labelText: '{name}: [bold]{valueX}[/]'
                })
            }));

            /* Create XY cursor */
            chart.set("cursor", am5xy.XYCursor.new(this.root, {
                behavior: "none",
                xAxis: xAxis,
                yAxis: yAxis
            }));

            /* Add data processed by Flexmonster to the chart */
            yAxis.data.setAll(chartData.data);
            series.data.setAll(chartData.data);

            /* Create initial animation */
            series.appear(1000);
            chart.appear(1000, 100);
        },

        updateChart: function (chartData, rawData) {
            this.chart.dispose();
            this.createChart(chartData, rawData);
        },
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
});
</script>
