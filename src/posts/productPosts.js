import Toast from 'react-native-root-toast'

export function addReview(productID, name, email, shortDesc, rate, text) {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/addReview', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productID=${productID}&sVoteName=${name}&sVoteMail=${email}&sVoteSummary=${shortDesc}&sVoteStars=${rate}&sVoteComment=${text}`
    })
    .then(res => res.json())
    .then(({status}) => {
        Toast.show(status.text, {
            shadow: false,
            backgroundColor: '#505050'
        })
        console.log(status)
        
    })
}