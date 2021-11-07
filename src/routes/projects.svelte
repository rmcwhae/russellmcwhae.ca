<script>
    import Image from 'svimg'
    import Project from '$lib/components/misc/Project.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    const projects = [
        {
            title: 'Avy Savvy',
            href: 'https://avysavvy.ca',
            description:
                'This is one of the first projects I contributed to at Avalanche Canada, an online tutorial that introduces avalanche risk management to recreational backcountry users.',
            stack: ['Svelte', 'Sapper', 'Sanity'],
        },
        {
            title: 'Dunn Legal Services',
            description:
                'An online presence for a Calgary wills and estates lawyer.',
            href: 'https://dunnlegalservices.com',
            stack: ['Svelte', 'Sapper'],
        },
        {
            title: 'Pirate Battleship',
            description:
                'My final project from the Lighthouse Labs web development boot camp.',
            href: 'https://battleship-lhl.herokuapp.com/',
            repoHref: 'https://github.com/rmcwhae/battleship',
            stack: ['React', 'Phaser', 'Node'],
        },
    ]
    // HACK It would be better to use an each-block below, but `svimg` needs to see an actual <Image> tag during preprocessing to properly detect images to generate thumbnails for.
</script>

<SEO title="Projects" />

<div class="flow">
    <Project project={projects[0]}>
        <Image src="/projects/avysavvy.jpg" alt={projects[0].title} />
    </Project>
    <Project project={projects[1]} reverse>
        <Image src="/projects/dunnlegalservices.jpg" alt={projects[1].title} />
    </Project>
    <Project project={projects[2]}>
        <Image src="/projects/piratebattleship.jpg" alt={projects[2].title} />
    </Project>
</div>
