const btnFilter = document.querySelector("#btnFilter");
btnFilter.addEventListener("click", showDropDown);

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