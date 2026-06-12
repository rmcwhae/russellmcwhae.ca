<script>
    import Image from 'svimg/Image.svelte'
    import Project from '$lib/components/misc/Project.svelte'
    import SEO from '$lib/components/base/SEO.svelte'

    const projects = [
        {
            title: 'Avy Savvy',
            href: 'https://avysavvy.ca',
            description:
                'This is one of the first projects I contributed to at Avalanche Canada, an online tutorial that introduces avalanche risk management to recreational backcountry users.',
            stack: ['Next.js', 'Sanity'],
        },
        {
            title: 'Dunn Legal Services',
            description:
                'An online presence for a Calgary wills and estates lawyer.',
            href: 'https://dunnlegalservices.com',
            stack: ['HTML'],
        },
        {
            title: 'Pirate Battleship',
            description:
                'My final project from the Lighthouse Labs web development boot camp.',
            repoHref: 'https://github.com/rmcwhae/battleship',
            stack: ['React', 'Phaser', 'Node'],
        },
    ]
    // HACK It would be better to use an each-block below, but `svimg` needs to see an actual <Image> tag during preprocessing to properly detect images to generate thumbnails for.
</script>

<SEO title="Projects" />

<h1 class="mb-3">Projects</h1>

<div class="flow">
    <Project project={projects[0]} reverse>
        <Image src="/projects/avysavvy.jpg" alt={projects[0].title} />
    </Project>
    <Project project={projects[1]}>
        <Image src="/projects/dunnlegalservices.jpg" alt={projects[1].title} />
    </Project>
    <Project project={projects[2]} reverse>
        <Image src="/projects/piratebattleship.jpg" alt={projects[2].title} />
    </Project>
</div>
