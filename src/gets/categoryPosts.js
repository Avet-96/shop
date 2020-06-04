export async function getRootCategories() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getCategoriesIDs', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
}

export function getCategoriesIDs(id) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getCategoriesIDs', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `categoryID=${id}`

    })
        .then(res => res.json())
}

