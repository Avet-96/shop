

const initialState = {
    id: 0,
    images: [],
    productInfo: {
        productName: '',
        productSalePercent: '',
        stock: 0,
        salePrice: 0,
        price: 0,
        companyPrice: 0,
        rate: 0,
        siteURL: '',
        pseudoprice: 0
    },
    productDescription: '',
    productDetails: '',
    productPackage: '',
    productVideo: '',
    productReviews: '',
    productSimilar: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PRODUCT_ID':
            return { ...state, ...{ id: action.payload } }
        case 'SET_CURRENT_PRODUCT_IMAGES':
            return { ...state, ...{ images: action.payload } }
        case 'SET_CURRENT_PRODUCT_INFO':
            return { ...state, ...{ productInfo: action.payload } }
        case 'SET_CURRENT_PRODUCT_DESCRIPTION':
            return { ...state, ...{ productDescription: action.payload } }
        case 'SET_CURRENT_PRODUCT_DETAILS':
            return { ...state, ...{ productDetails: action.payload } }
        case 'SET_CURRENT_PRODUCT_PACKAGE':
            return { ...state, ...{ productPackage: action.payload } }
        case 'SET_CURRENT_PRODUCT_VIDEO':
            return { ...state, ...{ productVideo: action.payload } }
        case 'SET_CURRENT_PRODUCT_REVIEWS':
            return { ...state, ...{ productReviews: action.payload } }
        case 'SET_CURRENT_PRODUCT_SIMILAR':
            return { ...state, ...{ productSimilar: action.payload } }
        default:
            return state;
    }
}