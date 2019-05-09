const cards = document.querySelectorAll('.card')
const columns = document.querySelectorAll('.column')

cards.forEach(card => {

    card.addEventListener('dragstart', e => {
        e.preventDefault()
    })

    card.addEventListener('mousedown', e => {
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

        card.onmouseup = e => {

            columns.forEach(column => {
                let container = column.getBoundingClientRect()
                if (column != cardParent) {
                    if (e.pageX >= container.left && e.pageX <= container.right
                        && e.pageY >= container.top && e.pageY <= container.bottom) {
                        column.append(card)
                    }
                }
            })

            document.removeEventListener('mousemove', onMouseMove)
            card.onmouseup = null
            card.style.position = null
            card.style.zIndex = null
            card.style.left = null
            card.style.top = null
        }
    })
})
