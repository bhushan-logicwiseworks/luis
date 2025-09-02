import { defaultChartOptions } from 'app/shared/utils/default-chart-options';

export const lineChartOptions = defaultChartOptions({
    grid: {
        show: true,
        strokeDashArray: 3,
        padding: {
            left: 16,
        },
    },
    chart: {
        type: 'area',
        height: 384,
        sparkline: {
            enabled: false,
        },
        zoom: {
            enabled: false,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0.9,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 90, 100],
        },
    },
    colors: ['#008ffb', '#ff9800'],
    dataLabels: {
        enabled: true,
        background: {
            borderWidth: 0,
            dropShadow: {
                enabled: true,
                left: 0,
                top: 0,
                blur: 4,
                opacity: 0.1,
            },
        },
    },
    xaxis: {
        type: 'category',
        labels: {
            show: true,
        },
    },
    yaxis: {
        labels: {
            show: false,
        },
    },
    legend: {
        show: true,
        itemMargin: {
            horizontal: 4,
            vertical: 4,
        },
    },
});
