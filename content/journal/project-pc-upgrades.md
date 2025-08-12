---
title: Project PC Upgrades
description: In tech, a lot happens in ten years.
author: Russell McWhae
date: 2023-03-08
draft: 0
category: Tech
---

<script>
  import Image from 'svimg/Image.svelte'
  import Caption from '$lib/components/images/Caption.svelte'
</script>

Recently, I got to experience one of tech’s truisms while upgrading my project PC: “We overestimate how much progress we can make in a year, and underestimate how much we can make in a decade” (via [Daring Fireball](https://daringfireball.net/linked/2023/02/20/camera-phone-progress)).

I have run a Windows desktop computer in various iterations for more than 15 years, the most recent—if indeed a decade can be considered “recent”—being a custom tower I built back in January 2013. It was a then-mid-range gaming PC, featuring a third-generation Intel Core i5-3570K, 16 GB DDR3 RAM, an EVGA GeForce 670 GTX video card, and a 256 GB SSD.

My plan for the computer was to upgrade individual components as needed down the road, but I ended up doing so less often than expected. It aged surprisingly well, and in [April 2020](/journal/adventures-in-low-end-pc-gaming), I put in a bigger, faster hard drive and a more powerful video card—a Radeon RX 580, bought used just before the pandemic GPU shortage caused prices to spike—for a net cost of $100. This established a new vision for my project PC: a functional-but-less-than-cutting-edge computer, only to be upgraded in the case of exceptional hardware deals.

As a teenage gamer, I remember looking forward to being old enough that my means would permit me to buy better and faster hardware, running games at ever higher framerates with all available eye-candy settings cranked. And yet, when my disposable income did increase, my interest in gaming did not sustain itself. I attribute this to a few reasons: age (24 is apparently the ideal age for competitive e-sports players, after which reflexes slowly diminish), and other interests (it turns out mountain pursuits eat up a _lot_ of time).

My waning interest in PC gaming perhaps mirrors that of the industry at large. “Gamergate” illuminated the toxicity of online gaming around 2015—it turns out it’s _not_ OK to be a petty, vindictive, foul-mouthed jerk online. Then the crypto craze caused GPU prices to enter the ionosphere, with new video cards fetching up to triple their MSRP thanks to opportunistic scalpers. A growing number of millennials have similarly noted diminished interest in gaming, finding it less appealing than when they were younger (for example, see the video [How to Enjoy Games Again](https://www.youtube.com/watch?v=2jIfE25DUhU)).

With my light gaming habits, I happily waited out the GPU shortage, which eventually returned to reason this summer (see [The GPU shortage is over](https://www.theverge.com/2022/7/1/23191634/nvidia-amd-gpu-shortage-over-3080-3070-3060-radeon-rx-6900-6800)).

It was finally time to upgrade. My ten-year-old PC lacked the hardware support to run Windows 11, so a major upgrade—motherboard, CPU, and RAM at a minimum—would be necessary. As someone who works with computers, I had some curiosity about Redmond’s latest offering, especially its ability to [run Linux GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps), basically giving two operating systems in one.

Other reasons to upgrade included downsizing (I have an upcoming move and have hauled around my bulky ATX case a few too many times), and, not being able to eat solid food for a number of weeks, I needed a project.

Researching is almost as much fun as actually getting new hardware. There are various questions to consider: Intel or AMD for the processor? NVIDIA or AMD (or even Intel) for the discrete GPU? Which components are OK to cheap out on? Which components do I buy new, and which do I roll the dice in the second-hand market with?

To answer those questions—and thus summarize hours of research—in order: Intel for the processor (twelfth gen delivered the best incremental performance gains in a while), NVIDIA for the GPU (more liquidity in the used market), RAM is good to not overspend on, and everything new except the GPU (especially motherboards: an open-box Newegg mobo was DOA).

While I could pay top dollar for brand-new hardware, that would defeat the vision of the frugal project PC. I also find the used market endlessly entertaining. Tolerating expectedly flaky people can lead to the occasional score (current count of trips across Calgary where I returned empty-handed: three).

Intel’s latest processors, the thirteenth-generation Core series, arrived in early January. While a ten-year-ten-generation upgrade would make for a slick post title, I opted for a slightly cheaper ($144.99 CAD) twelfth-generation processor, the Core i3-12100F. The newer Core i3-13100F was negligibly faster for twenty extra dollars ($164.99) and may have been tricky to boot without a BIOS update.

For a motherboard, I went with the ASRock B660M-ITX/AC, and populated it with 16 GB of DDR4 RAM, and a 1 TB Western Digital WD_BLACK SN770 M.2 SSD. Unlike my previous ATX motherboard, almost every slot and input was connected in this build—there is something satisfying about using only what you need, and little else. These are all practical parts without gimmicky RGB.

To house these components, I wanted a small-form-factor case. The smallest mini-ITX cases require premium small-form-factor (SFX) power supplies (usually pricey) and can limit your size of GPU. It’s subjective, but I prefer vertical cases over horizontal ones (like the Cooler Master NR200P), so I ended up buying the well-reviewed NXZT H1 (v2) on sale for $269.99 (down from $569.99). It’s terrific value for the cost: a well-engineered mini case, a 600W SFX power supply (with pre-routed cables!), and an all-in-one liquid cooler for under $300 (before tax and shipping).

The NXZT H1 can hold surprisingly large graphics cards: up to 324 mm long and 58 mm thick. This permits all but the most monstrous current-gen GPUs. My arbitrary budget for video cards has always been around $400. The standout performance-for-price option here was an AMD Radeon 6650 XT ($400 new, excluding tax), but I’ve previously had good experiences buying used GPUs and wanted to see if I could stretch my dollar further in the second-hand market.

I’ve tried to represent both Team Red (AMD) and Team Green (NVIDIA) equally over the years. AMD cards include an ATI Radeon HD 5770 (2010), an AMD Radeon RX 580 (2020), and an AMD Radeon Pro 5500M (2020, in my MacBook Pro). NVIDIA cards include a GeForce 8600M GT (2007, in a MacBook pro, replaced under extended warranty), a GeForce GT 750M (2013, in a MacBook pro), and a GeForce GTX 670 (2012). NVIDIA’s dominance in recent years has translated into more availability in the used market, so I perused said market on a recent trip to the city and found an MSI GeForce 3060 Ti for $425. It’s dusty and has an unknown history (probably crypto mining), but I can live with those for the discounted price (instead of $600-700 new).

With all the components acquired, it was build time. This was a smooth process, thanks to NZXT’s pre-routed cables, taking maybe an hour working carefully. Note that the case fans ran full blast until installing the NZXT CAM software in Windows.

<Caption text='The completed build.'>
<Image src="/journal-images/nzxt.jpg" alt="The completed build." />
</Caption>

The next step was testing. The biggest improvement I first noticed was the decrease in fan noise. Launching a CPU or GPU benchmark—which would cause my old PC to sound like a jet-engine spooling—are virtually indistinguishable from idle in this new machine. Terrific!

Initially, I’d wondered if a four-core processor would be adequate in 2023. The Core i3-12100F delivers exceptionally strong value for its price, matching or exceeding previous-generation six-core processors (see [this benchmark](https://cpu.userbenchmark.com/Compare/Intel-Core-i5-11400F-vs-Intel-Core-i3-12100F/4111vs4125)). It even outperforms my eight-core laptop (see [this benchmark](https://cpu.userbenchmark.com/Compare/Intel-Core-i3-12100F-vs-Intel-Core-i9-9880H/4125vsm750169)). (For reference, the Core i3-12100F is [about 40% faster](https://cpu.userbenchmark.com/Compare/Intel-Core-i5-3570K-vs-Intel-Core-i3-12100F/1316vs4125) than my outgoing Core i5-3570K, but presumably much more power efficient) There is a question of how much longevity the entry-level Core i3 will have. A thirteenth-gen Core i5 would likely last longer, but I can upgrade down the road when they drop in price.

In the few games I play, this new PC handily smokes my old one. Arma III can run at 4K and maximum settings without any stuttering or lag. I’m curious to try ray-tracing in The Witcher III’s next-gen update.

When it comes to gaming, my favorite games involve either simulation (Arma III) or storytelling (Half-Life 2; STAR WARS Jedi: Fallen Order). Lately, though, I’ve found books to more adequately satisfy my need for storytelling escapism, so I suspect my gaming demands will continue to be modest.

Expenses on this build came to $564.28 for the CPU, RAM, motherboard, and SSD; $425 for the GPU; and $324.97 for the case (taxes and shipping included). Subtract $505 in credit-card points, $200 for selling the old tower, and the total out-of-pocket cost was $609.25 (about $447 USD). Not bad as full price for these specs would be closer to $1800.

Given my moderate requirements for computing power, I’m thrilled with how this project turned out. It’s faster, quieter, and smaller than my old project PC, a delightful outcome to a rare nine-generation gadget upgrade.

Here’s to another ten years of economical computing.
