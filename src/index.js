// write your code here
const detailDiv = document.querySelector("div#spice-blend-detail")
const ingredientsContainer = document.querySelector("div.ingredients-container")
const ingredientsList = ingredientsContainer.querySelector('ul')
const imgContainer = document.querySelector('div#spice-images')
const url = 'http://localhost:3000/spiceblends'
const updateTitleForm = document.querySelector('form#update-form')
const ingredientForm = document.querySelector('form#ingredient-form')

function renderAllSpices() {
    fetch(`${url}`)
        .then(res => res.json())
        .then(allSpiceBlends => {
            allSpiceBlends.forEach(spiceBlend => {
                const img = document.createElement('img')
                img.src = spiceBlend.image
                img.alt = spiceBlend.title
                img.dataset.id = spiceBlend.id
                imgContainer.append(img)
            })
        })
}

function highlightSpice(spiceId) {
    fetch(`${url}/${spiceId}`)
        .then(res => res.json())
        .then(spiceBlend => {
            const imgTag = detailDiv.querySelector('img')
            const h2Tag = detailDiv.querySelector('h2')
            imgTag.src = spiceBlend.image
            imgTag.alt = spiceBlend.title
            h2Tag.textContent = spiceBlend.title
            ingredientForm.dataset.id = spiceBlend.id

            ingredientsList.innerHTML = ''

            fetch(`http://localhost:3000/ingredients`)
                .then(res => res.json)
                .then(ingredientsArr => {
                    console.log(ingredientsArr)
                    // ingredientsArr.forEach(ingredient => {
                    //     if (ingredient.spiceBlendId === `${spiceBlend.id}`) {
                    //         const li = document.createElement('li')
                    //         li.textContent = ingredient.name
                    //         ingredientsList.append(li)
                    //     }
                    // })
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

imgContainer.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
        highlightSpice(event.target.dataset.id)
    }
})




highlightSpice(1)
renderAllSpices()
