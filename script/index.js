const btnFilter = document.querySelector("#btnFilter");
btnFilter.addEventListener("click", showDropDown);
window.addEventListener("load", getAllCountriesInfo);
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
        <p id="countryName"><strong>${name}</strong></p>
        <div class="details">
            <p>Population: <span>${population}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Capital: <span>${capital}</span></p>
        </div>
    </div>`;
    return div;
}
function addCards(callback, ...data) {
    const sect = document.querySelector("section.countries-cards");
    data.forEach(element => {
        element.forEach(countrie => {
            sect.append(callback(countrie.name.official, countrie.population, countrie.region, countrie.capital, countrie.flags.svg));
        });
       
    });
}
async function getAllCountriesInfo() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    addCards(createCountryCard, data);
    console.log(data);
    return data;
}