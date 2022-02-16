fetch('https://data.corona.go.jp/converted-json/covid19japan-npatients.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(cased) {
        fetch('https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(death) {
                let curesApi = 'https://data.corona.go.jp/converted-json/covid19japan-ncures.json';
                fetch(curesApi)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(cures) {
                        const JPSum = {
                            labels: ['感染者数', '死亡者数', '院治療中'],
                            datasets: [{
                                label: '# of Votes',
                                data: [cased[cased.length - 1].adpatients, death[death.length - 1].ndeaths, cures[cures.length - 1].ncures],
                                borderWidth: 1,
                                backgroundColor: ['#FFFF00', '#CB4335', '#287bff'],
                            }]
                        };

                        function handleLeave(evt, item, legend) {
                            legend.chart.JPSum.datasets[0].backgroundColor.forEach((color, index, colors) => {
                                colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                            });
                            legend.chart.update();
                        }

                        function handleHover(evt, item, legend) {
                            legend.chart.JPSum.datasets[0].backgroundColor.forEach((color, index, colors) => {
                                colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
                            });
                            legend.chart.update();
                        }
                        const sumjp = document.getElementById('japan-canvas').getContext('2d');
                        const SUMJP = new Chart(sumjp, {
                            type: 'pie',
                            data: JPSum,
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
                        const DayJP = [];
                        const DataDayCase = [];
                        const DataDayDeath = [];
                        const DataToDay = [];
                        for (var i = 7; i > 0; i--) {
                            DayJP.push((cased[cased.length - i].date).substring(8, 10) + '日');
                            DataDayCase.push(cased[cased.length - i].adpatients);
                            DataDayDeath.push((death[death.length - i].ndeaths - death[death.length - (i + 1)].ndeaths));
                            DataToDay.push(cures[cures.length - i].ncures - cures[cures.length - (i + 1)].ncures)
                        }
                        let casenewtoday = cased[cased.length - 1].adpatients;
                        if (casenewtoday < 0) {
                            casenewtoday = `${casenewtoday.toLocaleString("en-AU")}`
                        } else {
                            casenewtoday = `+${casenewtoday.toLocaleString("en-AU")}`
                        }
                        document.getElementById('japan-case-text').innerHTML = `<p>感染者数</p>
                        <p><span>${cased[cased.length - 1].npatients.toLocaleString("en-AU")}</span><span>( ${casenewtoday})</span></p>`
                        const DataCase = {
                            labels: DayJP,
                            datasets: [{
                                label: '新感染者数:',
                                data: DataDayCase,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }]
                        };
                        const casejp = document.getElementById('casejp').getContext('2d');
                        const CASEJP = new Chart(casejp, {
                            type: 'line',
                            data: DataCase,
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
                        let covernewday = cures[cures.length - 1].ncures - cures[cures.length - 2].ncures;
                        if (covernewday < 0) {
                            covernewday = `${covernewday.toLocaleString("en-AU")}`
                        } else {
                            covernewday = `+${covernewday.toLocaleString("en-AU")}`
                        }
                        document.getElementById('japan-today-text').innerHTML = `<p>入院治療</p>
                        <p><span>${cures[cures.length - 1].ncures.toLocaleString("en-AU")}</span><span>( ${covernewday})</span></p>`
                        const DateToDay = {
                            labels: DayJP,
                            datasets: [{
                                label: '新入院治療',
                                data: DataToDay,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }]
                        };
                        const todayjp = document.getElementById('todayjp').getContext('2d');
                        const ToDayJP = new Chart(todayjp, {
                            type: 'line',
                            data: DateToDay,
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
                        let deathnewday = death[death.length - 1].ndeaths - death[death.length - 2].ndeaths;
                        if (deathnewday < 0) {
                            deathnewday = `${deathnewday.toLocaleString("en-AU")}`
                        } else {
                            deathnewday = `+${deathnewday.toLocaleString("en-AU")}`
                        }
                        document.getElementById('japan-death-text').innerHTML = `<p>死亡者数</p>
                        <p><span>${death[death.length - 1].ndeaths.toLocaleString("en-AU")}</span><span>( ${deathnewday})</span></p>`
                        const DateDeath = {
                            labels: DayJP,
                            datasets: [{
                                label: '新死亡者数',
                                data: DataDayDeath,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }]
                        };
                        const deathjp = document.getElementById('deathjp').getContext('2d');
                        const DEATHJP = new Chart(deathjp, {
                            type: 'line',
                            data: DateDeath,
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
                    });
            })
    })
let ApiUrl = 'https://data.corona.go.jp/converted-json/covid19japan-all.json';
fetch(ApiUrl)
    .then((response) => {
        return response.json();
    })
    .then((ApiData) => {
        var cases = [];
        for (var i in ApiData[0].area) {
            cases.push([i, ApiData[0].area[i].npatients]);
        }
        cases.sort(function(a, b) {
            return a[1] - b[1];
        })
        let CaseAll = [];
        for (var i = cases.length - 1; i >= 0; i--) {
            let NameJP = ApiData[0].area[cases[i][0]].name_jp;
            let DataJP = cases[i][1];
            CaseAll.push([NameJP, DataJP])
        }
        let BorderWidth = document.querySelector('#tableJP-01').clientWidth * 0.5;
        console.log(BorderWidth)
        for (var i = 0; i < CaseAll.length; i++) {
            let tr = document.createElement('tr');
            let nametd = document.createElement('th')
            let bgcolor = document.createElement('td')
            let casetd = document.createElement('td');
            casetd.setAttribute('class', 'casetd')
            bgcolor.setAttribute("class", "bg-border")
                //set dieu kien color background border
            if (CaseAll[i][1] < 5000) { bgcolor.style.borderLeftColor = '#88DF16' }
            if (CaseAll[i][1] >= 5000) { bgcolor.style.borderLeftColor = '#A5D71E' }
            if (CaseAll[i][1] >= 10000) { bgcolor.style.borderLeftColor = '#D1D71E' }
            if (CaseAll[i][1] >= 25000) { bgcolor.style.borderLeftColor = '#D7AC1E' }
            if (CaseAll[i][1] >= 50000) { bgcolor.style.borderLeftColor = '#D78D1E' }
            if (CaseAll[i][1] >= 75000) { bgcolor.style.borderLeftColor = '#D7621E' }
            if (CaseAll[i][1] >= 100000) { bgcolor.style.borderLeftColor = '#E84A1A' }
            if (CaseAll[i][1] >= 200000) { bgcolor.style.borderLeftColor = '#FF0000' }
            bgcolor.style.borderLeftWidth = CaseAll[i][1] / CaseAll[0][1] * BorderWidth + 'px';
            nametd.textContent = CaseAll[i][0];
            casetd.textContent = CaseAll[i][1].toLocaleString('en-US');
            //appendchild table
            tr.appendChild(nametd);
            tr.appendChild(bgcolor)
            tr.appendChild(casetd);
            if (i <= CaseAll.length / 3) {
                document.getElementById('tableJP-01').appendChild(tr)
            }
            if (CaseAll.length / 3 < i && i <= CaseAll.length * 2 / 3) {
                document.getElementById('tableJP-02').appendChild(tr)
            }
            if (CaseAll.length * 2 / 3 < i && i < CaseAll.length) {
                document.getElementById('tableJP-03').appendChild(tr)
            }
        }
    })