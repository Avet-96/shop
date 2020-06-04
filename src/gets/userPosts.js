export function getUserInfo(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    })
        .then(res => res.json())
}

export function getUserShippingAddress(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getAddressInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}&type=shipping`
    })
        .then(res => res.json())
}

export function getUserBillingAddress(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getAddressInfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}&type=billing`
    })
        .then(res => res.json())
}

export function getUserPaymentMethod(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getPaymentMethod', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    })
        .then(res => res.json())
}

export function getUserFavourites(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getFavourites', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    })
        .then(res => res.json())
}