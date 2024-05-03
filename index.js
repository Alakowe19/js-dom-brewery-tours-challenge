// Event listener for changes in the select element, not click this time around but change
const filterByType = document.getElementById('filter-by-type') //getting my Element
filterByType.addEventListener('change', () => {
    const selectedType = filterByType.value; // Get the selected type
    filterBreweriesByType(selectedType); // Call the function to filter breweries
})

// I did Event listener for select state form submission, for the search area
const selectStateForm = document.getElementById('select-state-form');
selectStateForm.addEventListener('submit', async (event) => {
    event.preventDefault() // this function would prevnt the default submission behaviour

    const selectedState = document.getElementById('select-state').value; // This would get the selected state that I got from my htm element 'select state'
    await filterBreweriesByState(selectedState) // Call the function to filter breweries by state, pause the execution of filterBreweriesByState until data is fetch from API. well, let me say until promise is kept/returned
});

async function filterBreweriesByType(selectedType = '') {
    const response = await fetch('https://api.openbrewerydb.org/breweries?by_state=California')
        .catch(error => {
            console.error('Error fetching data:', error)
            return null // Return null to indicate failure
        });

    if (!response || !response.ok) {
        console.error('Failed to fetch data from the server.')
        return; // Exit the function if fetching data failed
    }

    const data = await response.json() // saved as data reads the response stream from a Fetch API request and returns a promise that resolves with the result of parsing the body text as JSON. very necessary for my asyc function 

    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = '' // Clear the current list

    // Filter breweries by the selected type
    const filteredBreweries = data.filter(brewery => {
        return selectedType === '' || brewery.brewery_type === selectedType
    });

    // Rendering the filtered breweries
    filteredBreweries.forEach(brewery => {
        const li = document.createElement('li')

        const h2 = document.createElement('h2')
        h2.textContent = brewery.name

        const type = document.createElement('div')
        type.textContent = brewery.brewery_type
        type.classList.add('type')

        const addressSection = document.createElement('section')
        addressSection.classList.add('address')
        const addressHeading = document.createElement('h3')
        addressHeading.textContent = 'Address:'
        const streetParagraph = document.createElement('p')
        streetParagraph.textContent = brewery.street;
        const cityStatePostalParagraph = document.createElement('p')
        cityStatePostalParagraph.innerHTML = `<strong>${brewery.city}, ${brewery.state} ${brewery.postal_code}</strong>`;
        addressSection.appendChild(addressHeading)
        addressSection.appendChild(streetParagraph)
        addressSection.appendChild(cityStatePostalParagraph)

        const phoneSection = document.createElement('section')
        phoneSection.classList.add('phone')
        const phoneHeading = document.createElement('h3')
        phoneHeading.textContent = 'Phone:'
        const phoneParagraph = document.createElement('p')
        phoneParagraph.textContent = brewery.phone || 'N/A'
        phoneSection.appendChild(phoneHeading)
        phoneSection.appendChild(phoneParagraph)

        const linkSection = document.createElement('section')
        linkSection.classList.add('link');
        const websiteLink = document.createElement('a')
        websiteLink.href = brewery.website_url || '#'
        websiteLink.textContent = 'Visit Website'
        websiteLink.target = '_blank'
        linkSection.appendChild(websiteLink)

        li.appendChild(h2)
        li.appendChild(type)
        li.appendChild(addressSection)
        li.appendChild(phoneSection)
        li.appendChild(linkSection)

        breweriesList.appendChild(li)
    })
}

async function filterBreweriesByState(selectedState) { //passed slectedState as an argument / parameter here
    const response = await fetch(`https://api.openbrewerydb.org/breweries?by_state=${selectedState}`)
        .catch(error => {
            console.error('Error fetching data:', error)
            return null; // Return null to indicate failure
        });

    if (!response || !response.ok) {
        console.error('Failed to fetch data from the server.')
        return; // Exit the function if fetching data failed
    }

    const data = await response.json()

    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = '' // Clear the current list

    // Rendering the breweries
    data.forEach(brewery => { // Used forEach loop for iteration 
        const li = document.createElement('li')

        const h2 = document.createElement('h2')
        h2.textContent = brewery.name

        const type = document.createElement('div')
        type.textContent = brewery.brewery_type
        type.classList.add('type')

        const addressSection = document.createElement('section')
        addressSection.classList.add('address')
        const addressHeading = document.createElement('h3')
        addressHeading.textContent = 'Address:'
        const streetParagraph = document.createElement('p')
        streetParagraph.textContent = brewery.street
        const cityStatePostalParagraph = document.createElement('p')
        cityStatePostalParagraph.innerHTML = `<strong>${brewery.city}, ${brewery.state} ${brewery.postal_code}</strong>`
        addressSection.appendChild(addressHeading)
        addressSection.appendChild(streetParagraph)
        addressSection.appendChild(cityStatePostalParagraph)

        const phoneSection = document.createElement('section')
        phoneSection.classList.add('phone')
        const phoneHeading = document.createElement('h3')
        phoneHeading.textContent = 'Phone:'
        const phoneParagraph = document.createElement('p')
        phoneParagraph.textContent = brewery.phone || 'N/A'
        phoneSection.appendChild(phoneHeading)
        phoneSection.appendChild(phoneParagraph)

        const linkSection = document.createElement('section')
        linkSection.classList.add('link')
        const websiteLink = document.createElement('a')
        websiteLink.href = brewery.website_url || '#'
        websiteLink.textContent = 'Visit Website'
        websiteLink.target = '_blank'
        linkSection.appendChild(websiteLink)

        li.appendChild(h2)
        li.appendChild(type)
        li.appendChild(addressSection)
        li.appendChild(phoneSection)
        li.appendChild(linkSection)

        breweriesList.appendChild(li)
    });
}

// Initial call to fetch and render data
filterBreweriesByType()
