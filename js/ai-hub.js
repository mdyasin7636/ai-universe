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
                  <i class="fa-solid fa-arrow-right pt-3 text-danger" onclick="loadCardDetails('${card.id}')" data-bs-toggle="modal" data-bs-target="#cardDetailModal">
                  </i>
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
  // console.log(id)
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => showCardDetails(data))
}

const showCardDetails = card =>{
  // console.log(card);
  const modalCards = document.getElementById('modalCards')
  modalCards.innerHTML = `
  <div class="row row-cols-1 row-cols-md-2">
                <div class="border rounded bg-danger-subtle">
                  <h4>${card.data.description}</h4>
                  <div class="row row-cols-3 m-3">
                    <div class="border rounded bg-white text-success p-4">
                      <p>${card.data.pricing[0].price ? card.data.pricing[0].price : 'Free of Cost'}</p>
                      <p>${card.data.pricing[0].plan ? card.data.pricing[0].plan : 'Free of Cost'}</p>
                    </div>
                    <div class="border rounded bg-white text-warning p-4">
                      <p>${card.data.pricing[1].price ? card.data.pricing[1].price : 'Free of Cost'}</p>
                      <p>${card.data.pricing[1].plan ? card.data.pricing[1].plan : 'Free of Cost'}</p>
                    </div>
                    <div class="border rounded bg-white text-danger p-4">
                      <p>${card.data.pricing[2].price ? card.data.pricing[2].price : 'Free of Cost'}</p>
                      <p>${card.data.pricing[2].plan ? card.data.pricing[2].plan : 'Free of Cost' }</p>
                    </div>
                  </div>
                  <div class="row row-cols-2 g-2">
                    <div>
                      <h5>Features</h5>
                      <ul>
                        <li>${card.data.features[1].feature_name ? card.data.features[1].feature_name : 'No Data Found'}</li>
                        <li>${card.data.features[2].feature_name ? card.data.features[2].feature_name : 'No Data Found'}</li>
                        <li>${card.data.features[3].feature_name ? card.data.features[3].feature_name : 'No Data Found'}</li>
                      </ul>
                    </div>
                    <div>
                      <h5>Integrations</h5>
                      <ul>
                        <li>${card.data.integrations[0] ? card.data.integrations[0] : 'No Data Found'}</li>
                        <li>${card.data.integrations[1] ? card.data.integrations[1] : 'No Data Found'}</li>
                        <li>${card.data.integrations[2] ? card.data.integrations[2] : 'No Data Found'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="border rounded text-center">
                  <div>
                    <img style="width: 25rem;" src="${card.data.image_link[0]}" alt="">
                    <p class="position-absolute border rounded p-2 bg-danger text-white top-0 end-0">${card.data.accuracy.score*100}% Accuracy</p>
                  </div>
                  <h4>${card.data.input_output_examples[0].input}</h4>
                  <p>${card.data.input_output_examples[0].output}</p>
                </div>
              </div>
  
  `
  
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
