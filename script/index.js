let btnFilter = document.querySelector("#btnFilter");
let regions = document.querySelectorAll("nav > a");
let searchField = document.querySelector("input[type='search']");
const btnSwitchTheme = document.querySelector("#btnDarkMode");
btnSwitchTheme.addEventListener("click", switchTheme);
btnFilter.addEventListener("click", showDropDown);
searchField.addEventListener("input", searchCountryByName);
window.addEventListener("load", () =>{
    getAllCountriesInfo()
    for (const iterator of regions) {
        iterator.addEventListener("click", getAllCountriesInfo);
    }
});
function switchTheme() {
    const styles = document.querySelector("link#stylesheet");
    if (styles.dataset.theme == 'light') {
        styles.setAttribute('href', 'styles/dark-mode.css');
        styles.dataset.theme = 'dark';
    }else{
        styles.setAttribute('href', 'styles/style.css');
        styles.dataset.theme = 'light';
    }
}
function showDropDown() {
    const navOpt = document.querySelector("div.filter-container > nav");
    if (navOpt.style.display == '') {
        navOpt.style.display = 'flex';
        navOpt.style.animation = 'slideDown 1s ease';
    }else{
        navOpt.style.animation = 'slideUp 1s ease';
        setTimeout(() => {
            navOpt.style.display = '';
        }, 1000);
    }   
}
function createCountryCard(name, population, region, capital, img) {
    const div = document.createElement("div");
    div.classList.add("card");
    const divImg = document.createElement("div");
    divImg.classList.add("country-flag-img");
    divImg.style.backgroundImage = `url(${img})`;
    div.append(divImg);
    div.innerHTML += `
    <div class="card-details">
        <p><strong>${name}</strong></p>
        <div class="details">
            <p>Population: <span>${Number(population).toLocaleString('en-us')}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Capital: <span>${capital}</span></p>
        </div>
    </div>`;
    return div;
}
function addCards(CountryCard, ...data) {
    const sect = document.querySelector("section.countries-cards");
    sect.innerHTML = ''
    data.forEach(element => {
        element.forEach(countrie => {
            sect.append(CountryCard(countrie.name.official, countrie.population, countrie.region, countrie.capital, countrie.flags.svg));
        });
    });
}
async function getAllCountriesInfo() {
    try{
        let res = null;
        let data = null;
        if (this === window) {
            updatePage();
            res = await fetch(`https://restcountries.com/v3.1/all`);
        }else{
            btnFilter.innerHTML =`${this.innerText} <i class="fa-solid fa-angle-down"></i>`;
            showDropDown();
            updatePage();
            if (this.innerText.toLowerCase() == 'all') {
                res = await fetch(`https://restcountries.com/v3.1/all`);
            }else{
                res = await fetch(`https://restcountries.com/v3.1/region/${this.innerText}`)
            }
        }
        data = await res.json();
        addCards(createCountryCard, data);
        const cards = document.querySelectorAll(".card");
        for (const iterator of cards) {
            iterator.addEventListener("click", handleCardClick);
        }
    }catch{
        const sect = document.querySelector("section.countries-cards");
        sect.innerHTML = `<p style="text-align: center; width: 100%;">An error occured while fetching...Please check your internet connection and reload the page</p>`
    }
}
async function searchCountryByName() {
    try {
        updatePage();
        let res = null;
        let data = null;
        if (this.value.trim() == ''){
            res = await fetch(`https://restcountries.com/v3.1/all`);
        }else{
            res = await fetch(`https://restcountries.com/v3.1/name/${this.value.trim()}`);
        }
        data = await res.json();
        addCards(createCountryCard, data);
        const cards = document.querySelectorAll(".card");
        for (const iterator of cards) {
            iterator.addEventListener("click", handleCardClick);
        }
    } catch (error) {
        const sect = document.querySelector("section.countries-cards");
        if (error.message.toLowerCase() == 'failed to fetch') {
            sect.innerHTML = `<p style="text-align: center; width: 100%;">An error occured while fetching...Please check your internet connection and reload the page</p>`;
        } else {
            sect.innerHTML = `<p style="text-align: center; width: 100%;">Sorry! Results not found.</p>`;
        }
    }
}
function updatePage() {
    const sect = document.querySelector("section.countries-cards");
    sect.innerHTML = `
    <div class="spin-container">
        <div class="spinner">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>`;
}