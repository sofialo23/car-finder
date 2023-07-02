
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
        filterCars(e.target.value, 'brand');
    });

    yearSelect.addEventListener('change', e =>{
        searchValues.year = e.target.value;
    });

    minSelect.addEventListener('change', e =>{
        searchValues.minPrice = e.target.value;
    });

    maxSelect.addEventListener('change', e =>{
        searchValues.maxPrice = e.target.value;
    });

    doorSelect.addEventListener('change', e =>{
        searchValues.doors = e.target.value;
    });

    transSelect.addEventListener('change', e =>{
        searchValues.transmission = e.target.value;
        
    });

    colorSelect.addEventListener('change', e =>{
        searchValues.color = e.target.value;
    })

    
    displayCars(cars);
    yearsMenu();
    brandColor();
    
            //FUNCTIONS
    function displayCars(arr){
        
        arr.forEach(car =>{
            const {brand, model, year, price, doors, color, transmission} = car;
    
            const carHTML = document.createElement('P');
            carHTML.textContent = `
            ${brand} - ${model} - ${year} - ${doors} doors - Transmission: ${transmission}
            `;
            results.appendChild(carHTML);
        })
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

        //GET ALL THE DIFFERENT CAR BRANDS AVAILABLE FROM DB
    function brandColor(){
        //create a set so that brands don't repeat, then convert back to array
        const brands = [...new Set(cars.map(car => car.brand))];
        brands.forEach(brand => {
            const brandHTML = document.createElement('option');
            brandHTML.textContent = brand;
            brandSelect.appendChild(brandHTML);
        })

        const colors = [...new Set(cars.map(car => car.color))];
        colors.forEach(color => {
            const colorHTML = document.createElement('option');
            colorHTML.textContent = color;
            colorSelect.appendChild(colorHTML);
        });

    }

    function filterCars(x, field){
        cleanDisplay();
        const filtered = cars.filter(car => car[field] === x);
        displayCars(filtered);
    }

        //CLEANS THE RESULTS TO AVOID DUPLICATES
    function cleanDisplay(){
        while(results.firstChild){
            results.removeChild(results.firstChild);
        }
    }
});
    