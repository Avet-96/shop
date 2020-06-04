
export function getPaymentAndDeliveryConditions() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getPaymentAndDeliveryConditions', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}

export function getReturnConditions() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getReturnConditions', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}

export function getPrivacyPolicy() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getPrivacyPolicy', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}

export function getContacts() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getContacts', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}

export function getCareer() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getCareer', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}