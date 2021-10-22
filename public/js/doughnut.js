// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

let ctx3 = document.getElementById('myChart3');
let myChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels:['info'],
        datasets: [{
            label: 'info',
            data: [20, 100],
            backgroundColor: [
                    'rgb(75, 99, 132, 10)',
                    'rgb(75, 192, 192, 10)',
                    'rgb(255, 205, 86, 10)',
                    'rgb(201, 203, 207, 10)',
                    'rgb(54, 162, 235, 10)'
                    ],
        }]
    },
    options: {
        reponsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Spending per category',
            fontSize: 24,
            fontColor: 'grey'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});