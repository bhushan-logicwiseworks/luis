import { ApexOptions } from 'app/shared/components/chart/chart.component';

export const gaugeChartOptions: ApexOptions = {
    chart: {
        type: 'radialBar',
        offsetY: -10,
        sparkline: {
            enabled: true,
        },
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: '#e7e7e7',
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    offsetY: -2,
                    fontSize: '1.2rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#000',
                    fontWeight: 700,
                },
            },
        },
    },
    grid: {
        padding: {
            top: -10,
        },
    },
    fill: {
        colors: ['#5c77ff'],
    },
    labels: ['Results'],
};
