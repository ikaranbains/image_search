// https://api.unsplash.com/search/photos?page=1&query=office
const accessKey = '92TqAu6cfFNM5xjlFX3EW01cWXix4MLqqUWxblc2Tq4';
const input = document.querySelector("#inp");
const search = document.querySelector(".search");
const showMore = document.querySelector(".showMore");
const form = document.querySelector("#inputs");
const resultBox = document.querySelector("#result");
var inpVal = '';
var img;

var page = 1;
search.addEventListener('click', () => { 
    fetchImgs();
});

async function fetchImgs() {
    inpVal = input.value;
    var url = `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${inpVal}&client_id=${accessKey}`;
    var response = await fetch(url);
    var data  = await response.json();
    var mainResult = data.results;

    if(page === 1){
        resultBox.innerHTML = '';
    }

    mainResult.map((elem) => {
        var src = elem.urls.regular;
        var img = new Image();
        img.src = src;
        const a = document.createElement('a');
        a.href = elem.links.html;
        a.target = '_blank';
        a.appendChild(img);
        resultBox.appendChild(a);
    });
    showMore.style.display = 'block';
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    fetchImgs();
});

showMore.addEventListener('click', () => {
    page++;
    fetchImgs();
});