// write your code here
const detailDiv = document.querySelector("div#spice-blend-detail")
const ingredientsContainer = document.querySelector("div.ingredients-container")
const url = 'http://localhost:3000/spiceblends'
const updateTitleForm = document.querySelector('form#update-form')
const ingredientForm = document.querySelector('form#ingredient-form')

function renderFirstSpice() {
    fetch(`${url}/1`)
        .then(res => res.json())
        .then(spiceBlend => {
            const imgTag = detailDiv.querySelector('img')
            const h2Tag = detailDiv.querySelector('h2')
            const ingredientsUl = ingredientsContainer.querySelector('ul')

            imgTag.src = spiceBlend.image
            imgTag.alt = spiceBlend.title
            h2Tag.textContent = spiceBlend.title

            spiceBlend.ingredients.forEach(ingredient => {
                const li = document.createElement('li')
                li.textContent = ingredient.name
                ingredientsUl.appendChild(li)
            })
        })
}

updateTitleForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = event.target.title.value
    const titleObj = { title }

    fetch(`${url}/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(titleObj)
    })
        .then(res => res.json())
        .then(newSpiceBlend => {
            const h2Tag = detailDiv.querySelector('h2')
            h2Tag.textContent = newSpiceBlend.title
        })
})

ingredientForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const name = event.target.name.value
    const ingredientsUl = ingredientsContainer.querySelector('ul')
    const li = document.createElement('li')
    li.textContent = name
    ingredientsUl.appendChild(li)
})


renderFirstSpice()
