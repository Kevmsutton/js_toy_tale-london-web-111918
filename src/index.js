const toysUrl = `http://localhost:3000/toys`

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyName = document.querySelector('#name-input')
const toyImg = document.querySelector('#img-input')
const toyDiv= document.querySelector('#toy-collection')

let addToy = false

state = {
  toys: []

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


const getToys = () => {
  return fetch(toysUrl)
    .then(resp => resp.json())
      .then(toysData => {
      renderToys(toysData)
      state.toys = toysData
    })
}


const renderToy = (toy) => {
  newToyDiv = document.createElement('div')
  newToyDiv.className = 'card'
  newToyDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar"><img>
  <p>${toy.likes} Likes</p>
  <button data-id=${toy.id} class="like-btn"> Like <3</button>
  <button data-id=${toy.id} class="delete"> Delete  !</button>
  `
  newToyDiv.addEventListener("click", likesIncrease)
  newToyDiv.addEventListener("click", deleteToy)
  toyDiv.append(newToyDiv)
}

const renderToys = (toys) => {
  toys.forEach(toy => renderToy(toy))
}

const likesIncrease = (event) => {
  if(event.target.classList.contains("like-btn"))
  {
  const id = event.target.dataset.id
  likedToy = state.toys.find(toy => toy.id == id)
  likedToy.likes+=1
  toyDiv.innerHTML = ""
  likesToDB(likedToy)
  renderToys(state.toys)

  }
}


const newToySubmit = (event) => {
  event.preventDefault()
  toy = {
    name: toyName.value,
    image: toyImg.value,
    likes: 0
  }
    if (toy.name.length > 3 && toy.image.length > 3){
      state.toys.push(toy)
    }
  toyName.value = ""
  toyImg.value = ""
  // toyDiv.innerHTML = ""
  toyToDB(toy)
  renderToy(toy)
}

toyForm.addEventListener("submit", newToySubmit)


const toyToDB = toy => {
  fetch(`http://localhost:3000/toys/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

const likesToDB = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

const deleteToy = (event) => {
  if (event.target.classList.contains("delete")){
  toyId = event.target.dataset.id
  selectedToy = state.toys.find(toy => toy.id == toyId)
  deleteToyDB(selectedToy)
  }
}


const deleteToyDB = (toy) => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  }).then(() => {
    toyDiv.innerHTML = ""
    getToys()
  })
}


getToys()
