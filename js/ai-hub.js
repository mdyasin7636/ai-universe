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
    // const showAll = document.getElementById('show-all')
    // showAll.classList.remove('d-none')
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
  console.log(id)
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => showCardDetails(data))
}

const showCardDetails = card =>{
  console.log(card);
  const modalCards = document.getElementById('modalCards')
  modalCards.innerHTML = `
  <div class="row row-cols-1 row-cols-md-2">
                <div class="border rounded bg-danger-subtle">
                  <h4>ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT technology to simulate human
                    conversation.</h4>
                  <div class="row row-cols-3 m-3">
                    <p class="border rounded bg-white text-success p-4">$10/month Basic</p>
                    <p class="border rounded bg-white text-warning p-4">$50/month Pro</p>
                    <p class="border rounded bg-white text-danger p-4">Contact us Enterprise</p>
                  </div>
                  <div class="row row-cols-2 g-2">
                    <div>
                      <h5>Features</h5>
                      <ul>
                        <li>Customizable responses</li>
                        <li>Multilingual support</li>
                        <li>Seamless integration</li>
                      </ul>
                    </div>
                    <div>
                      <h5>Features</h5>
                      <ul>
                        <li>Customizable responses</li>
                        <li>Multilingual support</li>
                        <li>Seamless integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="border rounded text-center">
                  <div>
                    <img style="width: 25rem;" src="Rectangle 15.png" alt="">
                    <p class="position-absolute border rounded p-2 bg-danger text-white top-0 end-0">94% accuracy</p>
                  </div>
                  <h4>Hi, how are you doing today?</h4>
                  <p>I'm doing well, thank you for asking. How can I assist you today?</p>
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
