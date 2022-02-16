fetch('https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST')
    .then(response => {
        return response.json();
    })
    .then(VNData => {
        fetch('https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST').then(response => {
            return response.json();
        }).then(VNTinh => {
            //output canvas fr
            const VNSum = {
                labels: ['感染者数', '退院治療', '死亡者数'],
                datasets: [{
                    label: '# of Votes',
                    data: [VNData.canhiem[6].quantity, VNTinh.recovered, VNTinh.deceased],
                    borderWidth: 1,
                    backgroundColor: ['#FFFF00', '#287bff', '#CB4335'],
                }]
            };

            function handleLeave(evt, item, legend) {
                legend.chart.VNSum.datasets[0].backgroundColor.forEach((color, index, colors) => {
                    colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                });
                legend.chart.update();
            }

            function handleHover(evt, item, legend) {
                legend.chart.VNSum.datasets[0].backgroundColor.forEach((color, index, colors) => {
                    colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
                });
                legend.chart.update();
            }
            const sumVN = document.getElementById('vietnam-canvas').getContext('2d');
            const SUMVN = new Chart(sumVN, {
                type: 'pie',
                data: VNSum,
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            onHover: handleHover
                        }
                    }
                }
            });
            //output text table 4fr
            const DayVN = [];
            const DataDay = [];
            const DataRecover = [];
            const DataDeath = [];
            for (var i = 0; i < 7; i++) {
                DayVN.push(VNData.canhiem[i].day.substring(0, 2) + '日');
                DataDay.push(VNData.canhiem[i].quantity);
                DataRecover.push(VNData.cakhoi[i].quantity);
                DataDeath.push(VNData.catuvong[i].quantity)
            }
            document.getElementById('vietnam-case-text').innerHTML = `<p>感染者数</p>
            <p><span>${VNTinh.infected.toLocaleString("en-AU")}</span><span>(+ ${VNData.canhiem[6].quantity.toLocaleString("en-AU")})</span></p>`;
            const CanvasToDay = {
                labels: DayVN,
                datasets: [{
                    label: '新感染者数:',
                    data: DataDay,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
            const todayvn = document.getElementById('todayvn').getContext('2d');
            const TodayVN = new Chart(todayvn, {
                type: 'line',
                data: CanvasToDay,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        }
                    }
                }
            });
            document.getElementById('vietnam-recover-text').innerHTML = `<p>退院治療</p>
            <p><span>${VNTinh.recovered.toLocaleString("en-AU")}</span><span>(+ ${VNData.cakhoi[6].quantity.toLocaleString("en-AU")})</span></p>`;
            const CanvasRecover = {
                labels: DayVN,
                datasets: [{
                    label: '新感染者数:',
                    data: DataRecover,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
            const recover = document.getElementById('recover').getContext('2d');
            const Recover = new Chart(recover, {
                type: 'line',
                data: CanvasRecover,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        }
                    }
                }
            });
            document.getElementById('vietnam-death-text').innerHTML = `<p>死亡者数</p>
            <p><span>${VNTinh.deceased.toLocaleString("en-AU")}</span><span>(+ ${VNData.catuvong[6].quantity.toLocaleString("en-AU")})</span></p>`;
            const CanvasDeath = {
                labels: DayVN,
                datasets: [{
                    label: '新感染者数:',
                    data: DataDeath,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };
            const deathvn = document.getElementById('deathvn').getContext('2d');
            const DEATH = new Chart(deathvn, {
                type: 'line',
                data: CanvasDeath,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        }
                    }
                }
            });

            //table
            let tinh63 = VNTinh.detail.length - 1;
            let BorderWidth = document.querySelector('#tableVN-01').clientWidth * 0.5;
            document.getElementById('vietnam-table').style.maxHeight = (screen.height - document.querySelector('.boxfr').clientHeight - 100) + 'px'
            console.log(BorderWidth)
            for (var i = 0; i < tinh63; i++) {
                let tr = document.createElement('tr');
                let nametd = document.createElement('th')
                let bgcolor = document.createElement('td')
                let casetd = document.createElement('td');
                casetd.setAttribute('class', 'casetd')
                bgcolor.setAttribute("class", "bg-border")
                if (VNTinh.detail[i].cases < 5000) { bgcolor.style.borderLeftColor = '#88DF16' }
                if (VNTinh.detail[i].cases >= 5000) { bgcolor.style.borderLeftColor = '#A5D71E' }
                if (VNTinh.detail[i].cases >= 10000) { bgcolor.style.borderLeftColor = '#D1D71E' }
                if (VNTinh.detail[i].cases >= 25000) { bgcolor.style.borderLeftColor = '#D7AC1E' }
                if (VNTinh.detail[i].cases >= 50000) { bgcolor.style.borderLeftColor = '#D78D1E' }
                if (VNTinh.detail[i].cases >= 75000) { bgcolor.style.borderLeftColor = '#D7621E' }
                if (VNTinh.detail[i].cases >= 100000) { bgcolor.style.borderLeftColor = '#E84A1A' }
                if (VNTinh.detail[i].cases >= 200000) { bgcolor.style.borderLeftColor = '#FF0000' }
                bgcolor.style.borderLeftWidth = VNTinh.detail[i].cases / VNTinh.detail[0].cases * BorderWidth + 'px';
                nametd.textContent = VNTinh.detail[i].name;
                casetd.textContent = VNTinh.detail[i].cases.toLocaleString('en-US');
                tr.appendChild(nametd);
                tr.appendChild(bgcolor)
                tr.appendChild(casetd);
                if (i <= tinh63 / 3) {
                    document.getElementById('tableVN-01').appendChild(tr)
                } else if (tinh63 / 3 < i && i <= tinh63 * 2 / 3) {
                    document.getElementById('tableVN-02').appendChild(tr)
                } else {
                    document.getElementById('tableVN-03').appendChild(tr)
                }
            }
        })
    })