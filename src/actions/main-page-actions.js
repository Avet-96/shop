export const setBrands = (brands) => {
    //ACTION CREATOR
    return {
        type: 'SET_BRANDS',
        payload: brands
    }
}

export const setCategories = (categories) => {
    //ACTION CREATOR
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const setNewest = (newest) => {
    //ACTION CREATOR
    return {
        type: 'SET_NEWEST',
        payload: newest
    }
}

export const setOffers = (offers) => {
    //ACTION CREATOR
    return {
        type: 'SET_OFFERS',
        payload: offers
    }
}

export const setTopBanner = (topbanner) => {
    //ACTION CREATOR
    return {
        type: 'SET_TOPBANNER',
        payload: topbanner
    }
}