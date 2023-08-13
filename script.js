
document.addEventListener('DOMContentLoaded', ()=>{

            //SELECTORS
    
    const brandSelect = document.querySelector('#brand');
    const yearSelect = document.querySelector('#year');
    const minSelect = document.querySelector('#min-price');
    const maxSelect = document.querySelector('#max-price');
    const doorSelect = document.querySelector('#doors');
    const transSelect = document.querySelector('#trans');
    const colorSelect = document.querySelector('#color');
    const results = document.querySelector('#results');
    let searchValues = {
        brand: '',
        year: '',
        minPrice: '',
        maxPrice: '',
        doors: '',
        transmission: '',
        color: '',
    }
            //EVENTS

    brandSelect.addEventListener('change', e =>{
        searchValues.brand = e.target.value;
        filterCars();
    });

    yearSelect.addEventListener('change', e =>{
        searchValues.year = parseInt(e.target.value);
        filterCars();
    });

    minSelect.addEventListener('change', e =>{
        searchValues.minPrice = e.target.value;
        filterCars();
    });

    maxSelect.addEventListener('change', e =>{
        searchValues.maxPrice = e.target.value;
        filterCars();
    });

    doorSelect.addEventListener('change', e =>{
        searchValues.doors = e.target.value;
        filterCars();
    });

    transSelect.addEventListener('change', e =>{
        searchValues.transmission = e.target.value;
        filterCars();
        
    });

    colorSelect.addEventListener('change', e =>{
        searchValues.color = e.target.value;
        filterCars();
    })

    
    displayCars(cars);
    yearsMenu();
    brandColor();
    
            //FUNCTIONS

            //DISPLAY ALL THE CARS WITH OR W/O FILTERS APPLIED
    function displayCars(cars){
        cleanDisplay();
        cars.forEach(car =>{
            const {brand, model, doors, transmission, price, color, year} = car;
           
            // const carHTML = document.createElement('P');
            // carHTML.textContent = `
            // ${brand} - ${model} - ${year} - ${doors} doors - Transmission: ${transmission} - Price $${price}
            //   - color: ${color}`;
            // results.appendChild(carHTML);
            const row = document.createElement('TR');
            row.innerHTML = `
            <td>${brand}</td>
            <td>${model}</td>
            <td>${year}</td>
            <td>${doors}</td>
            <td>${transmission}</td>
            <td>$${price}</td>
            <td>${color}</td>
            `
            results.appendChild(row);
        })
    }

        //DISPLAY A MESSAGE IF THERE ARE NO RESULTS FOR THAT SEARCH
    function displayEmpty(){
        cleanDisplay();
        const errorHTML = document.createElement('P');
        errorHTML.textContent = 'There are no results for your search, please change your specifications';
        results.appendChild(errorHTML);

    }
        //DISPLAY THE LAST 10 YEARS IN THE YEAR SELECT MENU 
    function yearsMenu(){
        const max = new Date().getFullYear();
        const min = max - 10;
        
        for(let i = max; i >= min; i--){
            const yearHTML = document.createElement('option');
            yearHTML.textContent = i;
            yearSelect.appendChild(yearHTML);
        }
    }

        //GET ALL THE DIFFERENT CAR BRANDS AND COLORS AVAILABLE FROM DB
    function brandColor(){
        //CREATE A SET SO THAT BRANDS DON'T REPEAT, THEN CONVERT BACK TO ARRAY
        const brands = [...new Set(cars.map(car => car.brand))];
        brands.forEach(brand => {
            const brandHTML = document.createElement('option');
            brandHTML.textContent = brand;
            brandSelect.appendChild(brandHTML);
        })
        //DO THE SAME AS ABOVE WITH THE COLORS
        const colors = [...new Set(cars.map(car => car.color))];
        colors.forEach(color => {
            const colorHTML = document.createElement('option');
            colorHTML.textContent = color;
            colorSelect.appendChild(colorHTML);
        });

    }
        //APPLIES ALL THE FILTERS FROM THE SELECT MENU
    function filterCars(){
        const result = cars.filter(filterBrand).filter(filterYear).filter(filterMin).filter(filterMax).filter(filterDoors).filter(filterTrans).filter(filterColor);
        
        if(result.length){
            displayCars(result);
        }
        else{
            displayEmpty();
        }
        
    }


        //FILTER CARS BY BRAND
    function filterBrand(car){
        if(searchValues.brand){
            return searchValues.brand === car.brand;
        }
        else{
            return car;
        }
    }
        //FILTER CARS BY YEAR
    function filterYear(car){
        if(searchValues.year){
            return searchValues.year === car.year;
        }
        else{
            return car;
        }
    }

        //FILTER CARS WITH PRICE HIGHER THAN MINIMUM PRICE
    function filterMin(car){
        console.log(car.minPrice);
        if(searchValues.minPrice){
            return car.price >= searchValues.minPrice;
        }
        else{
            return car;
        }
    }

        //FILTER CARS WITH PRICE LOWERS THAN MAXIMUM PRICE
    function filterMax(car){
        if(searchValues.maxPrice){
            return car.price <= searchValues.maxPrice;
        }
        else{
            return car;
        }
    }
        //FILTER CARS BY THE NUMBER OF DOORS
    function filterDoors(car){
        if(searchValues.doors){
            return car.doors == searchValues.doors;
        }
        else{
            return car;
        }
    }

        //FILTER CARS BY TRANSMISSION
    function filterTrans(car){
        if(searchValues.transmission){
            return searchValues.transmission === car.transmission;
        }
        else{
            return car;
        }
    }
        //FILTER CARS BY COLOR
    function filterColor(car){
        if(searchValues.color){
            return searchValues.color === car.color;
        }
        else{
            return car;
        }
    }

        //CLEANS THE RESULTS TO AVOID DUPLICATES
    function cleanDisplay(){
        while(results.firstChild){
            results.removeChild(results.firstChild);
        }
    }
});
    