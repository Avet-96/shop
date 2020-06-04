import Toast from 'react-native-root-toast'
import NavigationService from '../navigation-service'


export function changeDeliveryAddress(userID, customerType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, country, phone) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserShippingAddress', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&customer_type=${customerType}&company=${company}&department=${department}&vatId=${vatId}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&street=${street}&zipcode=${zipcode}&city=${city}&country=${country}&phone=${phone}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        NavigationService.navigate('PersonalData', {reload: true}) 
    })
}

export function changePaymentAddress(userID, customerType, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, country, phone) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserBillingAddress', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&customer_type=${customerType}&company=${company}&department=${department}&vatId=${vatId}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&street=${street}&zipcode=${zipcode}&city=${city}&country=${country}&phone=${phone}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        NavigationService.navigate('PersonalData', {reload: true}) 
    })
}

export function changePassword(userID, password) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserPassword', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&password=${password}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })  
    })
}

export function changeUserInfo(userID, name, surname, birthDate, gender) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/changeUserInfo', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userID=${userID}&gender=${gender}&name=${name}&surname=${surname}&birthday=${birthDate}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        NavigationService.navigate('PersonalData', {reload: true}) 
        console.log(status)})
}