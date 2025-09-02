import { ApexOptions } from '../components/chart/chart.component';
import { mergeDeep } from './merge-deep';

export const defaultChartOptions = (options: Partial<ApexOptions> = {}): ApexOptions =>
    mergeDeep(
        {
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0,
                },
            },
            chart: {
                parentHeightOffset: 0,
                type: 'area',
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true,
                },
            },
            labels: [],
            dataLabels: {
                enabled: false,
                style: {
                    fontFamily: 'inherit',
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2.5,
            },
            fill: {
                gradient: {},
            },
            xaxis: {
                type: 'numeric',
                labels: {
                    show: false,
                    style: {
                        cssClass: 'text-secondary fill-current text-xs font-medium',
                        fontFamily: 'inherit',
                    },
                },
                axisBorder: {
                    show: true,
                    color: '#EEEEEE',
                },
                axisTicks: {
                    show: false,
                },
                floating: false,
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        cssClass: 'text-secondary fill-current text-xs font-medium',
                        fontFamily: 'inherit',
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            legend: {
                position: 'top',
                fontFamily: 'inherit',
                horizontalAlign: 'left',
                offsetX: -18,
                itemMargin: {
                    horizontal: 0,
                    vertical: 12,
                },
                markers: {
                    shape: 'circle',
                    size: 6,
                },
                labels: {
                    colors: ['var(--text-secondary)'],
                },
            },
            tooltip: {
                x: { show: false },
            },
        },
        options
    );
