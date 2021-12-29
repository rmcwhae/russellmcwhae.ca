---
title: What I Use
layout: page
---

These are the tools I use in my professional and creative workflows. Inspired by [uses.tech](https://uses.tech) via the [Syntax](https://syntax.fm/) podcast.

## Software

macOS all the way!

### Editor and Terminal

-   [VS Code](https://code.visualstudio.com/) with the fabulous [JetBrains Mono](https://www.jetbrains.com/lp/mono/) typeface.
-   Previously, I used [Coda 2](https://panic.com/coda/) for quite a few years.
-   [Spaceship ZSH](https://denysdovhan.com/spaceship-prompt/).
-   Locally installed Apache, PHP, and MariaDB. See the [excellent tutorial](https://getgrav.org/blog/macos-catalina-apache-multiple-php-versions) on the Grav blog for setup instructions. Thanks to the use of [Homebrew](https://brew.sh/), this setup no longer breaks during major macOS upgrades (where files like `httpd.conf` and `php.ini` were frequently overwritten, requiring a trip into Time Machine). [Docker](https://www.docker.com/) has effectively make this setup obsolete; however, I’ve maintained this local AMP stack since 2007 across two MacBook Pros and countless OS upgrades, and it’s fun to pretend to be a sysadmin.

### Desktop Apps

-   All the web browsers, including [Brave](https://brave.com/)
-   [Affinity Designer](https://affinity.serif.com/en-us/designer/) for vector work
-   [Docker](https://www.docker.com/)
-   [Paparazzi!](https://derailer.org/paparazzi/) for screenshotting websites. I still prefer a dedicated app for this rather than a browser extension.
-   [SourceTree](https://www.sourcetreeapp.com/) for Git. I sometimes prefer its layout to that of VS Code.
-   [Postman](https://www.postman.com/) for RESTful API design.
-   [TablePlus](https://tableplus.com/) for database visualization. After trying many such apps over the years, this is by far my favourite.
-   [Adobe Creative Cloud](https://www.adobe.com/ca/creativecloud.html) Photography plan, including Lightroom Classic for photo cataloging
-   [Starry Landscape Stacker](https://sites.google.com/site/starrylandscapestacker/home) for photo astro-stacking
-   [Backblaze](https://www.backblaze.com/) for online backups (it even backs up my storage-expansion external SSD!)
-   [SuperDuper!](https://www.shirt-pocket.com/SuperDuper/SuperDuperDescription.html) for local backups (in addition to Time Machine)

## Hardware

-   2019 MacBook Pro 16-inch (8-core Intel Core i9-9880H, 32 GB 2667 MHz DDR4 RAM, AMD Radeon Pro 5500M 4 GB, 1 TB SSD)
-   Previously, a Late 2013 15-inch MacBook Pro with Retina Display (4-core Intel Core i7-4850HQ, 16 GB 1600 MHz DDR3L RAM, NVIDIA GeForce GT 750M 2GB, 512 GB SSD)
-   Before that, a 15-inch mid-2007 MacBook Pro (Intel Core 2 Duo T7500, 4 GB 667MHz DDR2 RAM, NVIDIA GeForce 8600M GT 128 MB, aftermarket OCZ 120 GB SSD). The GPU in this laptop failed, requiring a logic-board replacement.
-   [27-inch LG 27UD68-W 4K Display](/journal/the-upgrade-to-4k)
-   [Ducky One 2 SF](https://www.duckychannel.com.tw/en/Ducky-One2-SF) RGB White mechanical keyboard with Cherry MX Brown switches. Being relatively new to mechanical keyboards, they really are game-changers.
-   Magic Trackpad 2
-   Desktop Windows PC: Intel Core i5-3570K overclocked to 4 GHz, 16 GB RAM, 500 GB SSD, 1 TB hardware RAID 1 array, ~~NVIDIA GeForce GTX 670 4 GB~~ AMD Radeon RX 580 4 GB. I built this in 2012 with the intention of upgrading parts as needed—only a strong need to upgrade has yet to present itself. Let’s see how long this old hardware will last before it gets converted into a Linux box. Used for browser testing and storage. I backup photos from my laptop to my PC’s ~~RAID 1~~ RAID 5 (4 x 1 TB drives) array via `rsync`:

```
alias photobackup="rsync -avzP --exclude '.DS_Store' --delete --backup --backup-dir=\"//Volumes/PhotosfromrMBP/backups/backup_$(date +\%Y-\%m-\%d_\%H-\%M)\" ~/Pictures/ //Volumes/PhotosfromrMBP/"
```

## Camera Gear

### Bodies

-   Sony a6000
-   Sony NEX-6, converted to shoot infrared per [this walkthrough](http://www.ir-photo.net/ir_nex6mod.html)

Though a bit dated now, these bodies work very well for stills and are quite light and compact.

### Lenses

-   Sony E 16 mm f/2.8 pancake: very pocketable but with soft corners
-   Sony/Zeiss E 24 mm f/1.8: wickedly sharp and good in low light
-   Sony FE 50 mm f/1.8: an excellent medium length
-   Sony FE 70–200 mm f/4 G: quite sharp and much lighter than an f/2.8

Lately, I’ve been trying to challenge myself creatively by primarily shooting with a single lens for six months to a year.

### Other

-   GorillaPod
-   Circular polarizing filter
