// Event listener for changes in the select element
const filterByType = document.getElementById('filter-by-type')
filterByType.addEventListener('change', () => {
    const selectedType = filterByType.value // Get the selected type
    filterBreweriesByType(selectedType) // Call the function to filter breweries
})

async function filterBreweriesByType(selectedType) {
    const response = await fetch('https://api.openbrewerydb.org/breweries?by_state=California')
        .catch(error => {
            console.error('Error fetching data:', error)
            return null // Return null to indicate failure
        })

    if (!response || !response.ok) {
        console.error('Failed to fetch data from the server.')
        return // Exit the function if fetching data failed
    }

    const data = await response.json()

    const breweriesList = document.getElementById('breweries-list')
    breweriesList.innerHTML = '' // Clear the current list

    // Filter breweries by the selected type
    const filteredBreweries = data.filter(brewery => {
        return selectedType === '' || brewery.brewery_type === selectedType
    })

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
    })
}

// Would fetch and render data
filterBreweriesByType()
