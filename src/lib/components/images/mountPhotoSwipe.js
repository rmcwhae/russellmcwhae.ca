import './photoswipe-caption.css'

/**
 * Open a PhotoSwipe lightbox for image links inside `gallery`.
 * PhotoSwipe is loaded only in the browser.
 *
 * @param {string | Element} gallery
 */
export async function mountPhotoSwipe(gallery) {
    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox')
    const { default: PhotoSwipe } = await import('photoswipe')
    await import('photoswipe/dist/photoswipe.css')

    const lightbox = new PhotoSwipeLightbox({
        pswpModule: PhotoSwipe,
        gallery,
        children: 'a',
        zoomSVG: '',
    })

    lightbox.addFilter('thumbEl', (thumbnail, itemData) => {
        if (itemData.thumbCropped && itemData.element) return itemData.element
        return thumbnail
    })

    lightbox.on('uiRegister', function () {
        lightbox.pswp.ui.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: '',
            onInit: (el) => {
                lightbox.pswp.on('change', () => {
                    const currSlideElement = lightbox.pswp.currSlide?.data?.element
                    const captionHTML =
                        currSlideElement
                            ?.querySelector('img')
                            ?.getAttribute('alt') ?? ''
                    el.innerHTML = captionHTML
                    el.classList.toggle('no-caption', !captionHTML)
                })
            },
        })
    })

    lightbox.init()
    return lightbox
}
