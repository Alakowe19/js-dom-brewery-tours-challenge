document.addEventListener('DOMContentLoaded', () => {
  fetchData() // Fetch data when the DOM is loaded

  const filterByType = document.getElementById('filter-by-type')

  filterByType.addEventListener('change', () => {
      const selectedType = filterByType.value // Get the selected type
      filterBreweriesByType(selectedType)
  })

  const brewerySearchInput = document.getElementById('brewery-search')

  brewerySearchInput.addEventListener('input', () => {
      const searchValue = brewerySearchInput.value.trim().toLowerCase()
      filterBreweriesByName(searchValue)
  })
})

async function filterBreweriesByName(searchValue) {
  try {
      const breweries = document.querySelectorAll('#breweries-list li')

      breweries.forEach(brewery => {
          const name = brewery.querySelector('h2').textContent.toLowerCase()
          if (name.includes(searchValue)) {
              brewery.style.display = 'block'
          } else {
              brewery.style.display = 'none'
          }
      })
  } catch (error) {
      console.error(error)
  }
}

async function fetchData() {
  try {
      const breweriesList = document.getElementById('breweries-list')

      if (!breweriesList) {
          throw new Error('Breweries list element not found')
      }

      breweriesList.innerHTML = ''

      const response = await fetch('https://api.openbrewerydb.org/v1/breweries')

      if (!response.ok) {
          throw new Error('Could not fetch resource')
      }

      const data = await response.json()

      data.forEach(brewery => {
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
          addressSection.append(addressHeading)
          addressSection.append(streetParagraph)
          addressSection.append(cityStatePostalParagraph)

          const phoneSection = document.createElement('section')
          phoneSection.classList.add('phone')
          const phoneHeading = document.createElement('h3')
          phoneHeading.textContent = 'Phone:'
          const phoneParagraph = document.createElement('p')
          phoneParagraph.textContent = brewery.phone || 'N/A'
          phoneSection.append(phoneHeading)
          phoneSection.append(phoneParagraph)

          const linkSection = document.createElement('section')
          linkSection.classList.add('link')
          const websiteLink = document.createElement('a')
          websiteLink.href = brewery.website_url || '#'
          websiteLink.textContent = 'Visit Website'
          websiteLink.target = '_blank'
          linkSection.append(websiteLink)

          li.append(h2)
          li.append(type)
          li.append(addressSection)
          li.append(phoneSection)
          li.append(linkSection)

          breweriesList.appendChild(li)
      })
  } catch (error) {
      console.error(error)
  }
}

async function filterBreweriesByType(selectedType) {
  try {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries')
      if (!response.ok) {
          throw new Error('Could not fetch resource')
      }

      const data = await response.json()
      const breweriesList = document.getElementById('breweries-list')

      // Clear the current list
      breweriesList.innerHTML = ''

      // Filter breweries by the selected type
      const filteredBreweries = data.filter(brewery => {
          return selectedType === '' || brewery.brewery_type === selectedType
      })

      // Render the filtered breweries
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
          addressSection.append(addressHeading)
          addressSection.append(streetParagraph)
          addressSection.append(cityStatePostalParagraph)

          const phoneSection = document.createElement('section')
          phoneSection.classList.add('phone')
          const phoneHeading = document.createElement('h3')
          phoneHeading.textContent = 'Phone:'
          const phoneParagraph = document.createElement('p')
          phoneParagraph.textContent = brewery.phone || 'N/A'
          phoneSection.append(phoneHeading)
          phoneSection.append(phoneParagraph)

          const linkSection = document.createElement('section')
          linkSection.classList.add('link')
          const websiteLink = document.createElement('a')
          websiteLink.href = brewery.website_url || '#'
          websiteLink.textContent = 'Visit Website'
          websiteLink.target = '_blank'
          linkSection.append(websiteLink)

          li.append(h2)
          li.append(type)
          li.append(addressSection)
          li.append(phoneSection)
          li.append(linkSection)

          breweriesList.appendChild(li)
      })
  } catch (error) {
      console.error(error)
  }
}
