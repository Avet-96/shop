import Toast from 'react-native-root-toast';



export function addToFavourite(userID, productID) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/addToFavourite', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&productID=${productID}`
    })
    .then(res => res.json())
    .then(({status}) => Toast.show(status.text, {
        shadow: false,
        backgroundColor: '#505050'
    }))
}

export function deleteFavourite(userID, productID) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/deleteFavourite', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&productID=${productID}`
    })
    .then(res => res.json())
    .then(({status}) => Toast.show(status.text, {
        shadow: false,
        backgroundColor: '#505050'
    }))
}

export function deleteAllFavourite(userID) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/deleteAllFavourite', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}`
    })
    .then(res => res.json())
    .then(({status}) => Toast.show(status.text, {
        shadow: false,
        backgroundColor: '#505050'
    }))
}