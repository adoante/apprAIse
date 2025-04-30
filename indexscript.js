document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('leaderboardChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['gibbon', 'guenon', 'spider_monkey', 'siamang', 'chimpanzee'],
            datasets: [{
                label: 'Inference Results',
                data: [1.2, 4.3, 5.5, 12.7, 92.5],
                backgroundColor: ['#00f', '#f00', '#0f0', '#00f', '#f00'],
                borderRadius: 15,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            return `${value}%`;
                        }
                    }
                }
            }
        }
    });
});