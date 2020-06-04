import Toast from 'react-native-root-toast';
import NavigationService from '../navigation-service'

export function makeReturn(returnData) {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/makeReturn', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `returnData=${returnData}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        if(status.code==='success') {
            NavigationService.back()
        }
        console.log(status)

    })
    .catch(console.log)
}