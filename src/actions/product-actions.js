
export const setProductID = (id) => {
    return {
        type: 'SET_CURRENT_PRODUCT_ID',
        payload: id
    }
}

export const setProductImages = (urls) => {
    return {
        type: 'SET_CURRENT_PRODUCT_IMAGES',
        payload: urls
    }
}

export const setProductInfo = (info) => {

    return {
        type: 'SET_CURRENT_PRODUCT_INFO',
        payload: info
    }
}

export const setProductDescription = (description) => {

    return {
        type: 'SET_CURRENT_PRODUCT_DESCRIPTION',
        payload: description
    }
}

export const setProductDetails = (details) => {

    return {
        type: 'SET_CURRENT_PRODUCT_DETAILS',
        payload: details
    }
}

export const setProductPackage = (packageInfo) => {

    return {
        type: 'SET_CURRENT_PRODUCT_PACKAGE',
        payload: packageInfo
    }
}

export const setProductVideo = (video) => {

    return {
        type: 'SET_CURRENT_PRODUCT_VIDEO',
        payload: video
    }
}

export const setProductReviews = (reviews) => {

    return {
        type: 'SET_CURRENT_PRODUCT_REVIEWS',
        payload: reviews
    }
}

export const setProductSimilar = (similar) => {
    return {
        type: 'SET_CURRENT_PRODUCT_SIMILAR',
        payload: similar
    }
}

