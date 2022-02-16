let TextOut = document.getElementById('input-text');
/// menu btn active
function MenuBtn(id) {
    ArrayBtn = ["JP_btn", "VN_btn", "Case_btn", "Death_btn"]
    let IdSearch = document.getElementById(id);
    for (var i = 0; i < ArrayBtn.length; i++) {
        if (id == ArrayBtn[i]) {
            document.getElementsByClassName('slide-list')[ArrayBtn.indexOf(id)].classList.add('slideActive')
            IdSearch.classList.add('activebtn')
        } else {
            document.getElementById(ArrayBtn[i]).classList.remove('activebtn')
            document.getElementsByClassName('slide-list')[i].classList.remove('slideActive')
        }
    }
    //slide code

    //slide code
    if (id == 'JP_btn') {
        TextOut.textContent = '例:(東京都、大阪府、千葉県)'
    }
}
////////////
let DataJapan = [];
//Data Japan
let ApiJP = 'https://data.corona.go.jp/converted-json/covid19japan-all.json';
fetch(ApiJP)
    .then((response) => {
        return response.json();
    })
    .then((Japan) => {
        for (var i in Japan[0].area) {
            DataJapan.push({ 'name': Japan[0].area[i].name_jp, 'case': Japan[0].area[i].npatients.toLocaleString("en-US") });
        }
    })
    //DataWorld
let DataWorld = [];
let ApiWorld = 'https://data.corona.go.jp/converted-json/occurrence_status_overseas.json';
fetch(ApiWorld)
    .then(response => {
        return response.json();
    })
    .then(World => {
        for (var i in World) {
            DataWorld.push({ 'name': World[i].dataName, 'case': World[i].infectedNum, 'death': World[i].deceasedNum });
        }
    })
    //DataVietNam
let DataVietNam = [];
let ApiVN = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
fetch(ApiVN)
    .then(response => {
        return response.json();
    })
    .then(VietNam => {
        for (var i in VietNam.detail) {
            DataVietNam.push({ 'name': VietNam.detail[i].name.toLocaleString("en-US"), 'case': VietNam.detail[i].cases.toLocaleString("en-US"), 'death': VietNam.detail[i].death.toLocaleString("en-US"), 'today': VietNam.detail[i].casesToday.toLocaleString("en-US") });
        }
    })
    //search
function search() {
    //input
    let KeySearch = document.getElementById('KeySearch').value;
    let KeyIn;
    let Contry;
    // Code Search
    if (Contry == undefined) {
        KeyIn = DataJapan.find((DataJapan, index) => {
            return DataJapan.name == KeySearch;
        })
        if (KeyIn !== undefined) { Contry = '日本' }
    }
    if (Contry !== '日本') {
        KeyIn = DataWorld.find((DataWorld, index) => {
            return DataWorld.name == KeySearch;
        })
        if (KeyIn !== undefined) { Contry = '世界' }
    }
    if (Contry !== '日本' && Contry !== '世界') {
        KeyIn = DataVietNam.find((DataVietNam, index) => {
            return DataVietNam.name == KeySearch;
        })
        if (KeyIn !== undefined) { Contry = 'ベトナム' }
    }


    // text - output
    if (KeySearch == "") {
        TextOut.textContent = `地名を入力下さい`
    } else if (KeyIn != undefined) {
        TextOut.innerHTML = `<i class="bi bi-emoji-sunglasses-fill"></i>${Contry}の中に ${KeySearch} のデータが存じます<i class="bi bi-emoji-sunglasses-fill"></i>`
    } else {
        TextOut.innerHTML = `<i class="bi bi-emoji-frown-fill"></i>“${KeySearch}”のデータが存じません<i class="bi bi-emoji-frown-fill"></i>`
    }
    /// OUTPUT HTML CODE
    let IdOutPut = document.getElementById('search-output')
        //Japan
    if (Contry == '日本') {
        IdOutPut.innerHTML = `
        <div id="output2">
        <div class="search-output-text-name">${KeyIn.name}</div>
        <div class="search-output-text"><p>感染者数</p><p>${KeyIn.case}</p></div>
        </div>
        `
    }
    //Viet Nam
    else if (Contry == '世界') {
        IdOutPut.innerHTML = `
        <div id="output3">
        <div class="search-output-text-name">${KeyIn.name}</div>
        <div class="search-output-text"><p>感染者数</p><p>${KeyIn.case}</p></div>
        <div class="search-output-text"><p>死亡者数</p><p>${KeyIn.death}</p></div>
        </div>
        `
    }
    ///World
    else if (Contry == 'ベトナム') {
        IdOutPut.innerHTML = `
        <div id="output4">
        <div class="search-output-text-name">${KeyIn.name}</div>
        <div class="search-output-text"><p>感染者数</p><p>${KeyIn.case}</p></div>
        <div class="search-output-text"><p>死亡者数</p><p>${KeyIn.death}</p></div>
        <div class="search-output-text"><p>新規</p><p>${KeyIn.today}</p></div>
        </div>
        `
    } else {

    }
}
///Enter Search
document.getElementById('KeySearch').onfocus = () => {
    addEventListener('keypress', (keyclick) => {
        if (keyclick.keyCode == 13) {
            search();
        };
    })
}
let Margin = document.querySelector('#japan-case').clientHeight;
let MarginPx;
if (screen.width >= 1024) {
    MarginPx = Margin + 50;
} else if (screen.width >= 768) {
    MarginPx = Margin * 3
} else if (screen.width < 768) {
    MarginPx = Margin * 6.3
}
document.getElementById('japan-table').style.marginTop = MarginPx + 'px';
document.getElementById('vietnam-table').style.marginTop = MarginPx + 'px';
