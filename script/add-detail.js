async function handleCardClick() {
    try {
        updatePage();
        const countryName = this.children.item(1).children.item(0);
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName.innerText}?fullText=true`);
        const data = await res.json();
        console.log(data);
        createDetailPage(data[0].flags.svg, data[0].name.common, null, Number(data[0].population).toLocaleString('en-us'), data[0].region, data[0].subregion, data[0].capital, data[0].tld, Object.values(data[0].currencies), Object.values(data[0].languages), data[0]);
        console.log()
    } catch (err) {
        const sect = document.querySelector("section.countries-cards");
        sect.innerHTML = `<p style="text-align: center; width: 100%;">An error occured while fetching...Please check your internet connection and reload the page</p>`
    }
}
function createDetailPage(bckImg, name, natName, population, region, subreg, capital, tld, curr, lang, obj) {
    let currencies = '';
    for (let index = 0; index < curr.length; index++) {
        if(!(index == curr.length - 1))
            currencies += `${curr[`${index}`].name}, `;
        else
            currencies += `${curr[`${index}`].name}`;
    }
    const sect = document.querySelector("section.countries-cards");
    const div = document.createElement("div");
    const nav = document.querySelector("main > nav");
    sect.classList.add("countries-cards-grid");
    div.classList.add("apresentation-flag-img");
    div.style.backgroundImage = `url('${bckImg}')`;
    nav.innerHTML = `<div class="back-container">
                        <div class="back">
                            <i class="fa-solid fa-arrow-left-long"></i>
                            <button id="btnBack">Back</button>
                        </div>
                    </div>`;
    sect.innerHTML = '';
    sect.append(div);
    sect.innerHTML += `
    <div class="apresentation-details">
        <p><strong>${name}</strong></p>
        <div>
            <p>Native Name: <span>${natName}</span></p>
            <p>Population: <span>${population}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Sub Region: <span>${subreg}</span></p>
            <p>Capital: <span>${capital.toString().replace(/[,]/g, `, `)}</span></p>
        </div>
    </div>
    <div class="others-details">
        <p>Top level domain: <span>${tld}</span></p>
        <p>Currecies: <span>${currencies}</span></p>
        <p>Languages: <span>${lang.toString().replace(/[,]/g, `, `)}</span></p>
    </div>`;
    if (obj.hasOwnProperty("borders")) {
        let bcountries = ` <div class="b-countries">
        <p><strong>Border Countries:</strong></p>`;
        obj.borders.forEach(element => {
            fetch(`https://restcountries.com/v3.1/name/${element}`)
            .catch( bcountries += `<div>failed to fetch</div>`)
            .then(res => res.json())
            .then(res => console.log(res))
            
            
        });
        bcountries += `</div>`;
        sect.innerHTML += bcountries;
    }
    handleBtnBackClick();
}

function handleBtnBackClick() {
    const btn = document.querySelector("div.back");
    const nav = document.querySelector("main > nav");
    const sect = document.querySelector("section.countries-cards");
    btn.addEventListener("click", () =>{
        sect.classList.remove("countries-cards-grid");
        updatePage();
        nav.innerHTML = `<div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" name="search" id="field-search" placeholder="Search for a country...">
        </div>
        <div class="filter-container">
            <button id="btnFilter">Filter by Region  <i class="fa-solid fa-angle-down"></i></button>
            <nav>
                <a href="#">Africa</a>
                <a href="#">America</a>
                <a href="#">Asia</a>
                <a href="#">Europe</a>
                <a href="#">Oceania</a>
                <a href="#">All</a>
            </nav>
        </div>`;
        btnFilter = document.querySelector("#btnFilter");
        regions = document.querySelectorAll("nav > a");
        for (const iterator of regions) {
            iterator.addEventListener("click", getAllCountriesInfo);
        }
        searchField = document.querySelector("input[type='search']");
        btnFilter.addEventListener("click", showDropDown);
        searchField.addEventListener("input", searchCountryByName);
        getAllCountriesInfo();
    });
}