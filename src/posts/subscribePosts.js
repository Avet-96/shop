import Toast from 'react-native-root-toast'
import NavigationService from '../navigation-service'

export function subscribeToEmail(email) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/subscribeToMail', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`
    })
    .then(res => res.json())
    .then(({status}) => {
        console.log(status)
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        if(status.code==='success'){
            NavigationService.back()
        }
    })
}

export function subscribeToProduct(email, stock, priceDown, sale, productID) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/subscribeToProduct', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&stock=${stock}&price=${priceDown}&pseudo=${sale}&productID=${productID}`
    })
    .then(res => res.json())
    .then(({status}) => {
        console.log(status)
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        if(status.code==='success'){
            NavigationService.back()
        }
    })
}