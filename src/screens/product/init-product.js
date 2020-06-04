import {
    getFullSizeProductImages,
    getProductDescription,
    getProductDetails,
    getProductInfo,
    getProductPackage,
    getProductReviews,
    getProductVideo,
    getSimilarProducts
} from '../../gets/productPosts';



export default initProduct = async (id, actions) => {
    
    const getImages = getFullSizeProductImages(id).then(images => {actions.setProductImages(images.imgURLs); return {imgs: images.imgURLs}})
    const getInfo = getProductInfo(id).then(info => actions.setProductInfo(info))
    const getProducts = getSimilarProducts(id).then(similar => actions.setProductSimilar(similar.productIDs))
    const getDesc = getProductDescription(id).then(description => actions.setProductDescription(description.text))
    const getPackage = getProductPackage(id).then(packageInfo => actions.setProductPackage(packageInfo.data))
    const getDetails = getProductDetails(id).then(details => actions.setProductDetails(details.data))
    const getReviews = getProductReviews(id).then(reviews => actions.setProductReviews(reviews.reviewsItems))
    const getVideo = getProductVideo(id).then(video => actions.setProductVideo(video.data))

    Promise.all([getImages, getInfo, getDesc, getProducts, getPackage, getDetails, getReviews, getVideo]).then((p) => {
        console.log(p)
        actions.setProductID(id)})
    // getFullSizeProductImages(id).then(images => actions.setProductImages(images.imgURLs))
    // getProductInfo(id).then(info => actions.setProductInfo(info))
    // getProductDescription(id).then(description => actions.setProductDescription(description.text))
    // getSimilarProducts(id).then(similar => actions.setProductSimilar(similar.productIDs))
    // getProductPackage(id).then(packageInfo => actions.setProductPackage(packageInfo.data))
    // getProductDetails(id).then(details => actions.setProductDetails(details.data))
    // getProductReviews(id).then(reviews => actions.setProductReviews(reviews.reviewsItems))
    // getProductVideo(id).then(video => actions.setProductVideo(video.data))
    // }).then(() => console.log('done'))
   
    // getPreviewProductImage(id).then(image => console.log(image))
}