export function getCurrentOrders(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getCurrentOrders', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    }).then(res => res.json())
}

export function getDoneOrders(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getDoneOrders', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    }).then(res => res.json())
}

export function getDeniedOrders(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getDeniedOrders', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    }).then(res => res.json())
}

export function getReturnOrders(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getReturnOrders', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${id}`
    }).then(res => res.json())
}

export function getOrderDetails(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getOrderDetails', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `orderID=${id}`
    }).then(res => res.json())
}

export function getReturnData(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getReturnData', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `orderID=${id}`
    }).then(res => res.json())
}

export function getDeliverySuppliers() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getDeliverySuppliers', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(res => res.json())
}