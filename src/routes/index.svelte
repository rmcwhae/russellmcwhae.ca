<script>
    import Carousel from '$lib/components/Carousel.svelte'

    const images = [
        { path: '/test.png', id: 'image1' },
        { path: '/begbie.jpg', id: 'image2' },
        { path: '/arrowlake.jpg', id: 'image3' },
    ]
</script>

<div class="full-width">
    <Carousel
        {images}
        imageSpacing={0}
        controlColor={'white'}
        controlScale={1}
        displayControls={false}
        autoplay={true}
        autoplaySpeed={5000}
    />
</div>

<p>
    I take&nbsp;<a href="photography">photos</a>, print&nbsp;<a href="calendars"
        >calendars</a
    >,
    <a href="journal">write</a>, and&nbsp;build&nbsp;<a href="about">websites</a
    >.
</p>
