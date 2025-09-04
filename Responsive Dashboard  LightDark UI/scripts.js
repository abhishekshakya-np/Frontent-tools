// Dashboard JavaScript - Enhanced Theme Support

// Get CSS variables for chart theming
function getChartColors() {
  const styles = getComputedStyle(document.body);

  return {
    textColor: styles.getPropertyValue("--color-text").trim(),
    borderColor: styles.getPropertyValue("--color-border").trim(),
    textColorLight: styles.getPropertyValue("--color-text-light").trim(),
    textColorMuted: styles.getPropertyValue("--color-text-muted").trim(),
    bgColor: styles.getPropertyValue("--color-bg").trim(),
    bgColorLight: styles.getPropertyValue("--color-bg-light").trim(),
    primary: styles.getPropertyValue("--color-primary").trim(),
    success: styles.getPropertyValue("--color-success").trim(),
  };
}

// Update chart colors when theme changes
function updateChartColors() {
  if (typeof priceChart !== 'undefined') {
    const colors = getChartColors();

    // Update chart options
    priceChart.options.scales.x.ticks.color = colors.textColorMuted;
    priceChart.options.scales.y.ticks.color = colors.textColorMuted;
    priceChart.options.scales.x.grid.color = colors.borderColor;
    priceChart.options.scales.y.grid.color = colors.borderColor;
    priceChart.options.plugins.legend.labels.color = colors.textColor;

    // Update dataset colors
    priceChart.data.datasets[0].borderColor = colors.primary;
    priceChart.data.datasets[0].backgroundColor = colors.primary + '20';

    // Re-render chart
    priceChart.update();
  }
}

// Dates
const labels = Array.from({ length: 28 }, (_, i) => `May ${i + 1}`);

// Prices
const prices = [
  45, 120, 78, 34, 190, 156, 189, 150, 23, 67, 11, 98, 12, 76, 69, 63, 69, 59,
  43, 77, 65, 80, 92, 33, 40, 58, 110, 169,
];
const ctx = document.getElementById("priceChart").getContext("2d");
const colors = getChartColors();

// Default chart with initial colors
const priceChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "",
        data: prices,
        borderColor: colors.textColorMuted,
        backgroundColor: colors.bgColor,
        tension: 0.5,
        pointBackgroundColor: colors.textColorMuted,
        pointBorderColor: colors.textColorMuted,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // This hides the legend
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          color: colors.textColorMuted,
          font: {
            size: 14,
          },
        },
        grid: {
          color: colors.borderColor,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 10,
          color: colors.textColorMuted,
          font: {
            size: 14,
          },
        },
        grid: {
          color: colors.borderColor,
        },
        beginAtZero: true,
      },
    },
  },
});

// Toggle sidebar
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector("aside");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("show-sidebar");
  sidebar.classList.toggle("hide-sidebar");
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    sidebar.classList.remove("show-sidebar");
    sidebar.classList.add("hide-sidebar");
  }
});

// Toggle dark mode
const magicBtn = document.querySelector(".magic-btn");
magicBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const newColors = getChartColors();
  console.log(newColors); // For debugging

  const dataset = priceChart.data.datasets[0];

  // Update dataset colors with new theme colors
  dataset.borderColor = newColors.textColorMuted;
  dataset.backgroundColor = newColors.bgColor;
  dataset.pointBackgroundColor = newColors.textColorMuted;
  dataset.pointBorderColor = newColors.textColorMuted;

  // Update axis titles and tick colors
  priceChart.options.scales.x.ticks.color = newColors.textColorMuted;
  priceChart.options.scales.y.ticks.color = newColors.textColorMuted;

  // Update gridlines color
  priceChart.options.scales.x.grid.color = newColors.borderColor;
  priceChart.options.scales.y.grid.color = newColors.borderColor;

  // Update chart background for tooltips, etc.
  priceChart.options.plugins.tooltip.backgroundColor = newColors.bgColorLight;
  priceChart.options.plugins.tooltip.titleColor = newColors.textColor;
  priceChart.options.plugins.tooltip.bodyColor = newColors.textColorLight;

  // Update the chart
  priceChart.update();
});
