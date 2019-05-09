const card = document.querySelector('.card')
const columns = document.querySelectorAll('.column')

card.addEventListener('dragstart', e => {
    e.preventDefault()
})

card.addEventListener('mousedown', (e) => {
    if (e.button != 0) return

    let cardParent = card.parentElement

    // reiterate card dimensions, and remove padding
    card.style.width = `${card.offsetWidth}px`
    card.style.height = `${card.offsetHeight}px`
    card.style.padding = 0

    let shiftX = e.clientX - card.getBoundingClientRect().left
    let shiftY = e.clientY - card.getBoundingClientRect().top

    card.style.position = 'fixed'
    card.style.zIndex = 10

    let moveAt = (x, y) => {
        card.style.left = `${x - shiftX}px`
        card.style.top = `${y - shiftY}px`
    }

    moveAt(e.pageX, e.pageY)

    let onMouseMove = e => {
        moveAt(e.pageX, e.pageY)
    }

    document.addEventListener('mousemove', onMouseMove)

    card.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove)

        columns.forEach(column => {
            if (column != cardParent) {
                cardParent = column
                console.log(cardParent)
                column.addEventListener('mouseover', moveCard(column))
                column.removeEventListener('mouseover', moveCard)
            } else {

            }
        })

        card.onmouseup = null
        resetStyles()
    }

    let moveCard = parent => {
        parent.append(card)
    }

    let resetStyles = () => {
        card.style.position = null
        card.style.zIndex = null
        card.style.left = null
        card.style.top = null
    }
})