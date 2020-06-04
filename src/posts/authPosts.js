import { store } from '../app/app';
import * as actions from '../actions/login-actions';
import NavigationService from '../navigation-service';
import Toast from 'react-native-root-toast'


export function logIn(email, pass, route) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${pass}`
    })
        .then(res => res.json())
        .then(logdata => {
            console.log(logdata)
            if (logdata.system.sErrorMessages) {
                store.dispatch(actions.setLoggedUserId('notloggedin'))
                alert(logdata.system.sErrorMessages)
                throw Error
            } else {
                store.dispatch(actions.setLoggedUserId(logdata.userID))
                console.log('2+', route);
                route === 'Cart' ? NavigationService.navigate('Cart') : NavigationService.navigate('Main')
                // NavigationService.navigate('DeliveryService')
                return logdata.userID
            }
        })
        .then(id => {
            console.log(id)
            fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getInfo', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userID=${id}`
            })
                .then(res => res.json())
                .then(userData => {
                    console.log(userData)
                    store.dispatch(actions.setLoggedUserInfo(userData))
                })
        })

        // .then(route => {

        // console.log('2+', route);
        // route === 'Cart' ? NavigationService.navigate('Cart') : NavigationService.navigate('Main')
        // }
        // )
        .catch(e => e)
        .done
    // store.dispatch(actions.setLoggedUserInfo({userName: 'Vasya'}))
}

// export function register(customerType, salutation, firstname, lastname, email, password, phone, birthday, street, zipcode, city ,country, company, department, vatId, subscribe) {
//     fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/register', {
//         method: 'POST',
//         headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `customerType=${customerType}&salutation=${salutation}&firstname=${firstname}&lastname=${lastname}&email=${email}&password=${password}&phone=${phone}&birthday=${birthday}&billingStreet=${street}&billingZipcode=${zipcode}&billingCity=${city}&billingCountry=${country}&billingCompany=${company}&billingDepartment=${department}&billingVatId=${vatId}&newsletterSubscribe=${subscribe}`
//     })
//     .then(res => res.json())
//     .then(({status}) => {
//         console.log(status)
//         Toast.show(status.text, {
//             shadow: false,
//             backgroundColor: '#505050'
//         })
//         if(status.code==='success') {
//             logIn(email, password)
//         }
//     })
// }
export function register(body, email, password) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
    })
        .then(res => res.json())
        .then(({ status }) => {
            console.log(status)
            console.log(body)
            Toast.show(status.text, {
                shadow: false,
                backgroundColor: '#505050'
            })
            if (status.code === 'success') {
                logIn(email, password)
            }
        })
}

export function resetPassword(email) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/resetPassword', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`
    })
        .then(res => res.json())
        .then(({ status }) => {
            console.log(status)
            Toast.show(status.text, {
                shadow: false,
                backgroundColor: '#505050'
            })
        })
}

export function sendToken(token) {
    fetch('https://teleropa.de//WebiProgCommunicationApplicationUser/changeUserPushNotificationToken', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `pushToken=${token}`
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            Toast.show('Токен отправлен', {
                shadow: false,
                backgroundColor: '#505050'
            })
        })
}