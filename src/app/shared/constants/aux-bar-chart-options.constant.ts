import { ApexOptions } from 'apexcharts';

export function generateChartOptions(data: { x: any[]; y: any[]; res: any[] }, tooltipColor: string): ApexOptions {
    return {
        chart: {
            type: 'bar',
            height: 200,
            toolbar: {
                show: false,
            },
        },
        series: [
            {
                data: data.y,
            },
        ],
        annotations: {
            xaxis: [
                {
                    x: 700,
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            color: '#fff',
                            background: '#00E396',
                        },
                    },
                },
            ],
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: true,
        },
        xaxis: {
            categories: data.res,
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            reversed: false,
            axisTicks: {
                show: false,
            },
        },
        tooltip: {
            theme: tooltipColor,
        },
    };
}
