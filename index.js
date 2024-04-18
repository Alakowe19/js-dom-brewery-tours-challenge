/*
async function fetchData() {
    try {
      const breweryList = document.getElementById('breweries-list');
      console.log(breweryList)
  
      const li = document.createElement('li')
      li.classList.add('your-class-name')
  
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries')
      if (!response.ok) {
          throw new Error('Could not fetch resource')
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
*/


async function fetchData() {
    try {
      const breweriesList = document.getElementById('breweries-list');
  
      if (!breweriesList) {
        throw new Error('Breweries list element not found')
      }
  
      breweriesList.innerHTML = ''
  
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries')
  
      if (!response.ok) {
        throw new Error('Could not fetch resource')
      }
  
      const data = await response.json()
        console.log(data)
        //data here
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
        addressSection.append(addressHeading);
        addressSection.append(streetParagraph);
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
  
  document.addEventListener('DOMContentLoaded', fetchData)
  