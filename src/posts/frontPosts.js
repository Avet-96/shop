import Toast from 'react-native-root-toast'

import NavigationService from '../navigation-service'

export function partnerRequest(companyName, name, address, post, phone, fax, email, site, comment, companyDescription, city) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/partnerRequest', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `companyName=${companyName}&name=${name}&address=${address}&post=${post}&phone=${phone}&fax=${fax}&email=${email}&site=${site}&comment=${comment}&companyDescription=${companyDescription}&city=${city}`
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


export function askQuestion(productID, name, surname, gender, phone, email, questionText) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/askQuestion', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${productID}&name=${name}&surname=${surname}&gender=${gender}&email=${email}&questionText=${questionText}&phone=${phone}`
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
        // NavigationService.navigate('Main', {reload: true}) 
    })
}

export function addFeedback(gender, name, surname, email, mailSubject, mailText) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/addFeedback', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `gender=${gender}&name=${name}&surname=${surname}&email=${email}&mailSubject=${mailSubject}&mailText=${mailText}`
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
        // NavigationService.navigate('Main', {reload: true}) 
    })
}