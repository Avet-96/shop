import { store } from '../app/app';
import * as actions from '../actions/main-page-actions';


export function getBannerImage() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getHomeBanner', {
        // return fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getBannerImage', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => {
            // console.log('json', dataRes);

            // return dataRes
            // return dataRes.indexTopBanner
            store.dispatch(actions.setTopBanner(dataRes))
                .catch(as => console.log(as))
        })
}

export function getNewestList() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getNewestList', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setNewest(dataRes)))
        .catch(as => console.log(as))
}

export function getOffersList() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getOffersList', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setOffers(dataRes)))
        .catch(as => console.log(as))
}

export function getBrandsList() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getBrandsList', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setBrands(dataRes)))
        .catch(as => console.log(as))
}

export function getCategoriesIDs() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationCategory/getCategoriesIDs', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => console.log(dataRes))
        .catch(as => console.log(as))
}

export function getPopularCategories() {
    fetch('https://teleropa.de/WebiProgCommunicationApplicationFrontend/getPopularCategories', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
        .then(dataRes => store.dispatch(actions.setCategories(dataRes.categories)))
        .catch(as => console.log(as))
}


export function getCountries() {
    return fetch('https://teleropa.de/WebiProgCommunicationApplicationUser/getCountries', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => res.json())
    // .then(dataRes => dataRes)
}
