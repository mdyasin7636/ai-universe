const loadCards = () => {
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCards(data.data.tools))
}

const displayCards = cards => {
    console.log(cards);
    const cardsContainer = document.getElementById('all-cards')
    cards.forEach(card => {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card h-100 p-2 pb-0">
            <img src="${card.image}" class="card-img-top rounded" alt="...">
            <div class="card-body pb-0">
              <h5 class="card-title">${card.name}</h5>
              <ol>
                <li>AI</li>
                <li>AI</li>
                <li>AI</li>
              </ol>
              <hr />
              <div class="d-flex justify-content-between">
                <div>
                  <h5 class="card-title">Card title</h5>
                  <p> <i class="fa-regular fa-calendar-days"></i> Date </p>
                </div>
                <div>
                  <i class="fa-solid fa-arrow-right pt-3 text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        `;
    
        cardsContainer.appendChild(cardDiv)
    })
}

loadCards ()