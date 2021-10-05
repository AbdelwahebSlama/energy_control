function main(x) {
  console.log('main function load ');

  window.onload = function () {
    console.log("LOADED");

    //Configuration variables
    var updateInterval = 40 //in ms
    var numberElements = 200;

    //Globals
    var updateCount = 0;

    // Chart Objects
    var xAccelChart = $("#xAccelChart");
    var yAccelChart = $("#yAccelChart");
    var zAccelChart = $("#zAccelChart");
    var rollChart = $("#rollChart");
    var pitchChart = $("#pitchChart");
    var yawChart = $("#yawChart");
    //chart instances & configurationAppareil

    var commonOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              millisecond: 'mm:ss:SSS'
            }
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {display: false},
      tooltips: {
        enabled: false
      }
    };
    var xAccelChartInstance = new Chart(xAccelChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "X Acceleration",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Acceleration - X",
          fontSize: 18
        }
      })
    });

    var yAccelChartInstance = new Chart(yAccelChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "Y Acceleration",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Acceleration - Y",
          fontSize: 18
        }
      })
    });

    var zAccelChartInstance = new Chart(zAccelChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "Z Acceleration",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Acceleration - Z",
          fontSize: 18
        }
      })
    });

    var rollChartInstance = new Chart(rollChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "Roll",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Roll",
          fontSize: 18
        }
      })
    });

    var pitchChartInstance = new Chart(pitchChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "Pitch",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Pitch",
          fontSize: 18
        }
      })
    });

    var yawChartInstance = new Chart(yawChart, {
      type: 'line',
      data: {
        datasets: [{
          label: "Yaw",
          data: 0,
          fill: false,
          borderColor: '#343e9a',
          borderWidth: 1
        }]
      },
      options: Object.assign({}, commonOptions, {
        title: {
          display: true,
          text: "Yaw",
          fontSize: 18
        }
      })
    });

    function addData(data) {
      if (data) {
        xAccelChartInstance.data.labels.push(new Date());
        xAccelChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['xA'])
        });
        yAccelChartInstance.data.labels.push(new Date());
        yAccelChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['yA'])
        });
        zAccelChartInstance.data.labels.push(new Date());
        zAccelChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['zA'])
        });
        rollChartInstance.data.labels.push(new Date());
        rollChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['roll'])
        });
        pitchChartInstance.data.labels.push(new Date());
        pitchChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['pitch'])
        });
        yawChartInstance.data.labels.push(new Date());
        yawChartInstance.data.datasets.forEach((dataset) => {
          dataset.data.push(data['yaw'])
        });
        if (updateCount > numberElements) {
          xAccelChartInstance.data.labels.shift();
          xAccelChartInstance.data.datasets[0].data.shift();
          yAccelChartInstance.data.labels.shift();
          yAccelChartInstance.data.datasets[0].data.shift();
          zAccelChartInstance.data.labels.shift();
          zAccelChartInstance.data.datasets[0].data.shift();
          rollChartInstance.data.labels.shift();
          rollChartInstance.data.datasets[0].data.shift();
          pitchChartInstance.data.labels.shift();
          pitchChartInstance.data.datasets[0].data.shift();
          yawChartInstance.data.labels.shift();
          yawChartInstance.data.datasets[0].data.shift();
        } else updateCount++;
        xAccelChartInstance.update();
        yAccelChartInstance.update();
        zAccelChartInstance.update();
        rollChartInstance.update();
        pitchChartInstance.update();
        yawChartInstance.update();
      }
    };

    function updateData(dataTest) {
      console.log("Update Data");
      // $.getJSON("accelGenerator.php", addData);
      addData(x)
      console.log('test.js data ', x)
      setTimeout(updateData, updateInterval);
    }

    updateData();
  }


}
