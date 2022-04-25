const { add, sub } = require('date-fns');

export function contracteStarDate() {

    const today = new Date()
    const dateThailand = add(today, { hours: 7 })
    const [day, month, year] = dateThailand.toUTCString().substr(5, 16).split(' ')
    return (`${day} ${month} ${year}`)

}


export function billingStartDate() {

    const today = new Date()
    let dateThailand = add(today, { hours: 7 })
    dateThailand = add(dateThailand, { months: 2 })
    dateThailand = sub(dateThailand, { days: 10 })
    const [day, month, year] = dateThailand.toUTCString().substr(5, 16).split(' ')
    return (`${day} ${month} ${year}`)

}
