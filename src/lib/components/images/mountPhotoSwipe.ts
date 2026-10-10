import type PhotoSwipeLightbox from 'photoswipe/lightbox'
import './photoswipe-caption.css'

/**
 * Open a PhotoSwipe lightbox for image links inside `gallery`.
 * PhotoSwipe is loaded only in the browser.
 */
export async function mountPhotoSwipe(
    gallery: string | HTMLElement
): Promise<PhotoSwipeLightbox> {
    const { default: Lightbox } = await import('photoswipe/lightbox')
    const { default: PhotoSwipe } = await import('photoswipe')
    await import('photoswipe/dist/photoswipe.css')

    const lightbox = new Lightbox({
        pswpModule: PhotoSwipe,
        gallery,
        children: 'a',
        zoomSVG: '',
    })

    lightbox.addFilter('thumbEl', (thumbnail, itemData) => {
        if (itemData.thumbCropped && itemData.element) return itemData.element
        // PhotoSwipe's typings require an element, but it passes through
        // a missing thumbnail unchanged at runtime
        return thumbnail as HTMLElement
    })

    lightbox.on('uiRegister', () => {
        const pswp = lightbox.pswp
        if (!pswp) return

        pswp.ui?.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: '',
            onInit: (el) => {
                pswp.on('change', () => {
                    const currSlideElement = pswp.currSlide?.data?.element
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
