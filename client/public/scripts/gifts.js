//script to add to the main element
const renderGifts = async () => {
    const response = await fetch('/gifts')
    const data = await response.json()
    const mainContent = document.getElementById('main-content')
    if (data){
        data.map(gift => {
            const giftDiv = document.createElement('div')
            giftDiv.classList.add("card")

            const topContainer = document.createElement('div')
            topContainer.classList.add("top-container")

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add("bottom-container")

            topContainer.style.backgroundImage = `url(${gift.image})`


            const title = document.createElement('h3')
            title.textContent = gift.name
            bottomContainer.appendChild(title)

            const price = document.createElement('p')
            price.textContent = 'Price: ' +gift.pricePoint
            bottomContainer.appendChild(price)

            const audience = document.createElement('p')
            audience.textContent = 'Great For: '+ gift.audience
            bottomContainer.appendChild(audience)

            const moreInfo = document.createElement('a')
            moreInfo.textContent = "Read More >"
            moreInfo.href = `/gifts/${gift.id}`
            moreInfo.setAttribute('role', 'button')
            bottomContainer.appendChild(moreInfo)
            giftDiv.appendChild(topContainer)
            giftDiv.appendChild(bottomContainer)
            mainContent.appendChild(giftDiv)


        })

    }
    else{
        const noGiftsH2 = document.createElement('h2')
        noGiftsH2.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(noGiftsH2)
    }
}

const renderGift = async() =>{
    const parts = window.location.href.split('/');
    console.log(parts); // View this in your browser's F12 console
    const lastSegment = parts.pop();
    const requestID = parseInt(lastSegment);
    console.log("requested id: " + requestID)
    const response = await fetch('/gifts')
    const data = await response.json()
    const giftContent = document.getElementById('gift-content')
    let gift
    if (data){
        gift = data.find(gift => gift.id === requestID)
        if (gift){
            const giftImage = document.getElementById('image')
            giftImage.src = gift.image

            const name = document.getElementById("name")
            name.textContent = gift.name

            const submittedBy = document.getElementById('submittedBy')
            submittedBy.textContent = 'Submitted by: ' + gift.submittedBy

            const pricePoint = document.getElementById('pricePoint')
            pricePoint.textContent = 'Price: ' + gift.pricePoint

            const audience = document.getElementById('audience')
            audience.textContent = 'Great For: ' + gift.audience

            const description = document.getElementById('description')
            description.textContent = gift.description
            
            document.title = `UnEarthed - ${gift.name}`        

        }
        else{
            const noGifts = document.createElement("h2")
            noGifts.textContent = "No Gifts Available 😞"
            giftContent.appendChild(noGifts)
        }
    }
}

const requestedUrl = window.location.href.split('/').pop()
console.log("requested url" +requestedUrl)
if(requestedUrl > 9){
    window.location.href = '../404.html'
}
else{
    renderGifts()
}
renderGift()