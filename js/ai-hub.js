const loadCards = () => {
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    toggleSpinner(true)
    fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCards(data.data.tools.slice(0, 6))
        toggleSpinner(false)
    })
}

const showAllData = () => {
  const url =`https://openapi.programming-hero.com/api/ai/tools`
    toggleSpinner(true)
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayCards(data.data.tools)
        toggleSpinner(false)
        const showAll = document.getElementById('show-all')
        showAll.classList.add('d-none')
    })
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('all-cards')
    cardsContainer.innerHTML = "";
    const showAll = document.getElementById('show-all')
    showAll.classList.remove('d-none')
    cards.forEach(card => {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card h-100 p-2 pb-0">
            <img src="${card.image}" class="card-img-top rounded" style="height: 30vh;" alt="...">
            <div class="card-body pb-0">
              <h5 class="card-title">Features</h5>
              <ol>
                <li>${card.features[0]}</li>
                <li>${card.features[1]}</li>
                <li>${card.features[2] ? card.features[2] : 'No Data Found'}</li>
              </ol>
              <hr />
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title">${card.name}</h5>
                  <p> <i class="fa-regular fa-calendar-days"></i> ${card.published_in}</p>
                </div>
                <div>
                  <i class="fa-solid fa-arrow-right pt-3 text-danger" onclick="loadCardDetails()" data-bs-toggle="modal" data-bs-target="#cardDetailModal"></i>
                </div>
              </div>
            </div>
          </div>
        `;
    
        cardsContainer.appendChild(cardDiv)
    });

    const shortByDate = document.getElementById('short-by-date').addEventListener('click', function(){
      sortCardsByDate(cards)
    })

}

const loadCardDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => showCardDetails(data))
}

const showCardDetails = card =>{
  console.log(card)
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

const sortCardsByDate = cards => {
  cards.sort((a, b) => new Date(b.published_in) - new Date(a.published_in))
  displayCards(cards)
}

loadCards ()
