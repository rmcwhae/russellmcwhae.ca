<script>
    import Project from '$lib/components/misc/Project.svelte'
    import SEO from '$lib/components/base/SEO.svelte'
    import AvySavvy from '$static/projects/avysavvy.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import DunnLegalServices from '$static/projects/dunnlegalservices.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'
    import PirateBattleship from '$static/projects/piratebattleship.jpg?w=300;500;700;900;1200;1600;2000;3000&format=webp&srcset'

    const projects = [
        {
            title: 'Avy Savvy',
            href: 'https://avysavvy.ca',
            description:
                'This is one of the first projects I contributed to at Avalanche Canada, an online tutorial that introduces avalanche risk management to recreational backcountry users.',
            stack: ['Svelte', 'Sapper'],
            src: AvySavvy,
        },
        {
            title: 'Dunn Legal Services',
            description:
                'An online presence for a Calgary wills and estates lawyer.',
            href: 'https://dunnlegalservices.com',
            stack: ['Svelte', 'Sapper'],
            src: DunnLegalServices,
        },
        {
            title: 'Pirate Battleship',
            description:
                'My final project from the Lighthouse Labs web development boot camp: a Battleship clone.',
            href: 'https://battleship-lhl.herokuapp.com/',
            repoHref: 'https://github.com/rmcwhae/battleship',
            stack: ['React', 'Phaser'],
            src: PirateBattleship,
        },
    ]
</script>

<SEO title="Projects" />

<div class="flow">
    {#each projects as { title, description, href, repoHref, src, stack }, index}
        <Project
            {title}
            {description}
            {href}
            {repoHref}
            {src}
            {stack}
            {index}
        />
    {/each}
</div>
