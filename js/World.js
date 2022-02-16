let WorldApi = "https://data.corona.go.jp/converted-json/occurrence_status_overseas.json";
fetch(WorldApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(World) {
        var i = World.length;
        let WorldCases = []; // so nguoi nhiem 
        let WorldDeath = []; // so nguoi chet
        for (var i in World) {
            WorldCases.push([i, parseFloat((World[i].infectedNum).replace(/,/g, ''))]);
            WorldDeath.push([i, parseFloat((World[i].deceasedNum).replace(/,/g, ''))]);
        };
        WorldCases.sort(function(a, b) {
            return a[1] - b[1];
        });
        WorldDeath.sort(function(c, d) {
            return c[1] - d[1];
        });
        let Wdeath = [],
            wcases = [];
        for (var i in WorldCases) {
            wcases.push({ 'name': World[WorldCases[i][0]].dataName, 'data': WorldCases[i][1] })
        }
        for (var i in WorldDeath) {
            Wdeath.push({ 'name': World[WorldDeath[i][0]].dataName, 'data': WorldDeath[i][1] })
        }
        let BorderWidth = document.querySelector('#tableJP-01').clientWidth * 0.375;
        for (var i = wcases.length - 2; i >= 0; i--) {
            let tr = document.createElement('tr');
            let nametd = document.createElement('th')
            let bgcolor = document.createElement('td')
            let casetd = document.createElement('td');
            casetd.setAttribute('class', 'casetd')
            bgcolor.setAttribute("class", "bg-border")
            if (wcases[i].data < 50000) { bgcolor.style.borderLeftColor = '#88DF16' }
            if (wcases[i].data >= 100000) { bgcolor.style.borderLeftColor = '#A5D71E' }
            if (wcases[i].data >= 250000) { bgcolor.style.borderLeftColor = '#D1D71E' }
            if (wcases[i].data >= 500000) { bgcolor.style.borderLeftColor = '#D7AC1E' }
            if (wcases[i].data >= 1000000) { bgcolor.style.borderLeftColor = '#D78D1E' }
            if (wcases[i].data >= 5000000) { bgcolor.style.borderLeftColor = '#D7621E' }
            if (wcases[i].data >= 10000000) { bgcolor.style.borderLeftColor = '#E84A1A' }
            if (wcases[i].data >= 20000000) { bgcolor.style.borderLeftColor = '#FF0000' }
            bgcolor.style.borderLeftWidth = wcases[i].data / wcases[wcases.length - 2].data * BorderWidth + 'px';
            nametd.textContent = wcases[i].name;
            casetd.textContent = wcases[i].data.toLocaleString('en-US');
            //appendchild table
            tr.appendChild(nametd);
            tr.appendChild(bgcolor)
            tr.appendChild(casetd);
            if (i <= wcases.length - 2) {
                document.getElementById('tableCases-01').appendChild(tr)
                if (i <= wcases.length * 0.75) {
                    document.getElementById('tableCases-02').appendChild(tr)
                    if (i <= wcases.length * 0.5) {
                        document.getElementById('tableCases-03').appendChild(tr)
                        if (i <= wcases.length * 0.25) {
                            document.getElementById('tableCases-04').appendChild(tr)
                        }
                    }
                }
            }
        }
        // death world table
        // get width td.
        for (var i = wcases.length - 2; i >= 0; i--) {
            let tr = document.createElement('tr');
            let nametd = document.createElement('th')
            let bgcolor = document.createElement('td')
            let casetd = document.createElement('td');
            casetd.setAttribute('class', 'casetd')
            bgcolor.setAttribute("class", "bg-border")
                //set dieu kien color background border
            if (Wdeath[i].data < 5000) { bgcolor.style.borderLeftColor = '#88DF16' }
            if (Wdeath[i].data >= 5000) { bgcolor.style.borderLeftColor = '#A5D71E' }
            if (Wdeath[i].data >= 10000) { bgcolor.style.borderLeftColor = '#D1D71E' }
            if (Wdeath[i].data >= 25000) { bgcolor.style.borderLeftColor = '#D7AC1E' }
            if (Wdeath[i].data >= 50000) { bgcolor.style.borderLeftColor = '#D78D1E' }
            if (Wdeath[i].data >= 75000) { bgcolor.style.borderLeftColor = '#D7621E' }
            if (Wdeath[i].data >= 100000) { bgcolor.style.borderLeftColor = '#E84A1A' }
            if (Wdeath[i].data >= 200000) { bgcolor.style.borderLeftColor = '#FF0000' }
            //set border name data = 70% width td table
            bgcolor.style.borderLeftWidth = Wdeath[i].data / Wdeath[Wdeath.length - 2].data * BorderWidth + 'px';
            nametd.textContent = Wdeath[i].name;
            casetd.textContent = Wdeath[i].data.toLocaleString('en-US');
            //appendchild table
            tr.appendChild(nametd);
            tr.appendChild(bgcolor)
            tr.appendChild(casetd);
            if (i <= Wdeath.length - 2) {
                document.getElementById('tableDeath-01').appendChild(tr)
                if (i <= Wdeath.length * 0.75) {
                    document.getElementById('tableDeath-02').appendChild(tr)
                    if (i <= Wdeath.length * 0.5) {
                        document.getElementById('tableDeath-03').appendChild(tr)
                        if (i <= Wdeath.length * 0.25) {
                            document.getElementById('tableDeath-04').appendChild(tr)
                        }
                    }
                }
            }
        }
    })