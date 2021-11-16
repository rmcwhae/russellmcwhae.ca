---
title: 'The Upgrade to 4K: LG 27UD68-W Review'
description: High DPI on the desktop is quite nice.
author: Russell McWhae
date: 2016-08-11
draft: 0
category: Tech
---

<script>
  import Image from 'svimg'
  import Caption from '$lib/components/images/Caption.svelte'
</script>

<Image src="/journal-images/LG-screen-and-keyboard.jpg" alt="LG 27UD68-W" class="wide" />

## Table of Contents

## Introduction

My very first smartphone was the iPhone 4, which I purchased in September 2010. I had held out from owning previous generations of the iPhone as the original iPhone was never officially available in Canada, and the iPhones 3G and 3GS were largely iterative, under-the-hood improvements over their respective predecessors. The iPhone 4 introduced a breakthrough new technology previously unseen in any Apple product: the Retina display, a display with twice as many pixels in each linear direction (640 x 960 vs. 320 x 480) on the same-size 3.5-inch screen as before. This quadrupled the total number of pixels within the same physical area, resulting in far sharper text and graphics. Individual pixels could not be seen by the naked eye.

This was to be the way of the future. Gradually, advances in hardware engineering and reductions in manufacturing costs allowed larger Retina displays to be developed: the iPad got a Retina display in March 2012, and the first 15-inch Retina MacBook Pro was announced in June 2012. An Apple-sanctioned, desktop-size Retina display wasn’t to arrive until October 2014 with the 27-inch 5K iMac, though support for external 4K monitors had already begun with the second-generation 15-inch Retina MacBook Pro in the fall of 2013 (“Late 2013”). Was this to finally be the age of desktop Retina displays?

In fall 2013, I upgraded my 2007 Santa Rosa MacBook Pro to a then-brand-new Late 2013 15-inch MacBook Pro with Retina Display. Again, I had deliberately avoided the first-gen Retina MacBook Pro, as early adoption of Apple products usually ends in heartbreak. I bought the middle-spec model, which had a few important upgrades over the base model: a discrete NVIDIA GeForce GT 750M graphics card and 16 GB of RAM. This graphics chip could theoretically run an external 4K (3840 x 2160) display at a refresh rate of 60 Hz (4K60). Though macOS lacked support for 4K60 at the time (30 Hz was possible, which is noticeably less fluid than the standard 60 Hz), my Late 2013 Retina MacBook Pro later proved to be the first—and now oldest—Mac capable of running 4K60 thanks to its Thunderbolt 2 ports. Given the expense of 4K monitors in 2013 as well as the lack of software support—it wasn’t until May 2014 that macOS would learn to [play nice with 4K displays](https://www.anandtech.com/show/8023/apple-releases-osx-10-9-3-improved-4k-display)—it would be a while before I started to seriously consider buying a 4K monitor.

While I never owned a 27-inch Apple Thunderbolt display—instead opting for the cheaper ASUS PB278Q with similar 2560 x 1440 (1440p) resolution and 27-inch size—I was determined to hold out for an official Apple desktop-size Retina display until WWDC 2016. Leading up to WWDC 2016, rumours suggesting an Apple 4K or 5K display with a powerful internal GPU circulated; instead, Apple was to discontinue making external displays entirely. The very next day after the WWDC keynote, I went to my local [Memory Express](https://www.memoryexpress.com) to buy a 4K monitor. Enter the LG 27UD68-W.

## LG 27UD68-W

Reviews on this LG monitor were somewhat scarce, save for some customer reviews on Amazon and Brian Stucki’s detailed [write-up](http://www.brianstucki.com/blog/review-imac-5k-with-a-4k-monitor-lg-27ud68/). I had been considering the more well-known Dell P2715Q 4K display as it is officially listed on the [Apple support page for 4K displays](https://support.apple.com/en-ca/HT206587) with Macs unlike the LG, but the cheaper price (about $550 CAD for the LG vs. $930 CAD for the Dell at the time), similar IPS panel with 60 Hz refresh rate, and newer release date of the LG ultimately made the LG the logical choice. The colour scheme of the LG monitor matches quite well with my grey-and-black MacBook Pro. An Apple keyboard and Magic Mouse also work nicely with the white back panel of the LG (this is the “-W” of the name, _white_). The thin bezel is very aesthetically pleasing, and the 27UD68-W is easily one of the best third-party displays to complement a MacBook Pro, iMac or even Mac Pro on a desk. The stand isn’t height adjustable, may be too low for some, and is somewhat flimsy, though these are minor issues and can all be resolved with VESA mounts.

The on-screen display (OSD) is managed by a single joystick on the bottom of the panel with five possible inputs: four cardinal directions and a click. It is good fun to use, though the joystick itself blinks while the monitor is sleeping (brightly enough for light to bleed into nearby vent holes), which cannot be disabled in the OSD. If this monitor is used in a bedroom, some electrical tape may be necessary to dim the blinking. LG makes a macOS app called OnScreen Control that allows you to change various settings without going through the OSD.

<Caption text="OnScreen Control">
<Image src="/journal-images/LG-OnScreen-Control.png" alt="OnScreen Control" />
</Caption>

## Performance

Ever since Apple rewrote the entire macOS GUI to work on Retina displays starting with the first-gen MacBook Pro with Retina Display in 2012, running macOS at [scaled resolutions](https://www.anandtech.com/show/6023/the-nextgen-macbook-pro-with-retina-display-review/6) has come with the warning of reduced performance. To run the LG in “Looks like 2560 x 1440” mode means that macOS is rendering a virtual 5120 x 2880 (5K) image (exactly double 2560 x 1440) then downsampling it to 3840 x 2160 (4K), which is perhaps _more_ work than running a 5K display since no floating-point downsampling is necessary if everything is kept in 5K. (The Late 2013 Retina MacBook Pro can in fact [run a single 5K display](https://macperformanceguide.com/blog/2015/20150618_1334-DellUP2715K-worksOn2013MacBookPro.html) using both Thunderbolt 2 ports.) Interestingly, the 2015 MacBook [defaults to a scaled resolution](https://www.anandtech.com/show/9136/the-2015-macbook-review/7), so the “affect[ed] performance” of scaled resolutions may not be as ominous as it sounds, particularly with a discrete GPU.

Running the 4K display in the default “Looks like 1920 x 1080” mode really isn’t ideal since text and interface elements are huge, and the additional screen real estate of 1440p is missing. I have been running the LG in 1440p mode along with the MacBook Pro’s native display at its default resolution (2880 x 1800 in “Looks like 1440 x 900” mode) for almost two months now, and the setup doesn’t seem to run all that slower or hotter compared to a non-4K 1440p monitor for _most_ tasks.

<Caption text="1440p mode">
<Image src="/journal-images/LG-1440p.png" alt="1440p mode" />
</Caption>

Playing 4K YouTube videos seems to be much more optimized in Safari than in Chrome: fullscreen 4K video playback in Chrome causes an audible fan-speed spike to 5000 RPM or more, whereas 4K playback in Safari is quieter with a max fan speed of around 3600 RPM. (**UPDATE August 3, 2018**: Google has [changed the codec](https://9to5mac.com/2017/01/12/youtube%E2%80%A4com-no-longer-supports-4k-video-playback-in-safari/) of 4K YouTube videos, and 4K YouTube playback is no longer supported in Safari. Back to noisy Chrome for 4K YouTube viewing, _sigh_.)

Other resource-hungry tasks like editing RAW photos in Lightroom 6.6.1 do tend to max out the fans; again, relative to a lower-resolution 1440p monitor, performance is still very similar in terms of frame rates and fan speeds, which is to say that in demanding tasks—4K display vs. 1440p or less—the fans will be _cranked_. The additional resolution of 4K is especially nice for photo editing, one of my main reasons for wanting a 4K display.

Compared to a 27-inch 5K screen, any 27-inch 4K screen will not be quite as sharp. If you put your face right up to the display, text will look the tiniest bit fuzzy. This doesn’t matter, however, since you don’t view a 27-inch display from two inches away. At my typical viewing distance of about 28 ± 4 inches, text and graphics on the LG are _sharp_. As in _be-careful-or-you’ll-cut-yourself_ sharp. Bad joke, but you get the idea. Seriously, this display is a treat to look at. In “Looks like 2560 x 1440” mode—which should be the only mode to run this monitor in—text is ever-so-slightly less crisp than on an Apple 5K iMac display.

Apple put a 4096 x 2304 (true 4K) panel into the 21.5-inch 4K iMac, so it may be alarming to see that the 3840 x 2160 (4K) resolution of “4K” 27-inch displays like the LG equates to _less_ pixels inside a _larger_ display. In practice, however, the lower pixel density of 4K vs. true 4K or 5K is essentially negligible, and while it may not meet Apple’s standards of perfection, it doesn’t command the notorious Apple tax either. (Apple Thunderbolt displays were still selling for $1K CAD right up until they were discontinued, while similar third-party IPS-panel 1440p monitors could be found for a third the cost.)

All of my displays are IPS panels and are calibrated with a DataColor Spyder 4 Pro. Colour on the LG display is therefore what you would expect on a calibrated IPS panel: very good and consistent across wide viewing angles. I’ve seen no dead pixels yet.

External monitors with macOS sometimes display poor colours due to macOS [thinking that they are televisions](http://www.mathewinkson.com/2013/03/force-rgb-mode-in-mac-os-x-to-fix-the-picture-quality-of-an-external-monitor) and using the wrong colour space, for which the remedy is to force RGB mode. I haven’t noticed this issue with my LG or ASUS, even though my MacBook Pro does indeed think that both displays are televisions. Text looks good by default and no different when forcing RGB mode. Perhaps this has something to do with Intel/AMD graphics chips. Lower-end MacBook Pros only have integrated Intel graphics chips, while MacBook Pros with discrete graphics chips force the use of their discrete chips when external monitors are plugged in, as in my case where colours look fine on an NVIDIA chip.

## Quirks

Though my MacBook Pro _can_ run its own display at 2880x1800, the LG at 4K, and my ASUS at 1440p (all at 60 Hz), it did not run them reliably. Having three monitors each with one to three virtual desktops in Mission Control resulted in seemingly random wallpaper shuffling and window repositioning. The triple-monitor setup also caused two kernel panics in what has been an otherwise rock-solid reliable MacBook Pro. The [Apple Hardware Test](https://support.apple.com/en-us/HT201257) found nothing wrong with the computer, and a bit of digging pointed toward Chrome as being the culprit. The true offender was actually the old USB3-to-ethernet adapter I’d been using (its firmware was _years_ out of date). Connecting two external displays occupied both Thunderbolt 2 ports, requiring the USB ethernet adapter rather than the more reliable Thunderbolt-to-ethernet adapter with only one display attached.

Ultimately, I stopped using the triple-display setup with my MacBook Pro. My ASUS monitor is now hooked up to my PC (super nerd note: I [rsync](https://rsync.samba.org) the RAW files for [my photos](https://russellmcwhae.ca/photography) from my MacBook Pro to a 1 TB RAID 1 array on this PC).

The LG squawks if you don’t use one of the included LG HDMI or DisplayPort (DP) cables; however, they didn’t include a mini-DP cable for use with Thunderbolt 2 ports, so buy a reputable mini-DP-to-DP 1.2 cable and disable the warnings.

Technically, the Late 2013 15-inch Retina MacBook Pro doesn’t support 4K60 using single-stream transport (SST) according to the 4K Apple support page—only the Mid 2014 and later 15-inch models do—yet it has worked fine in my case.

Though this doesn’t directly relate to the LG review, here are some findings on Bluetooth interference. Shortly after getting the LG, I started having no end of Bluetooth interference issues with my Magic Mouse. Suspecting a new [USB 3.0 hub to be the culprit](https://support.apple.com/en-ca/HT203729), I removed it, yet the issues persisted. Apple has some other [ideas on sources of interference](https://support.apple.com/en-ca/HT201542), and I was starting to worry that the LG LCD display itself was causing the interference.

I tried everything: disconnecting and reconnecting the mouse, re-pairing the mouse, resetting the NVRAM, resetting the SMC, and not running the laptop in clamshell mode. Restarting my computer would sometimes give up to a few hours of reliable Bluetooth connection, but the issues always returned. It turns out that the source of all this trouble was the monitor cable. When I first got the LG, I carelessly tucked the mini-DP-to-DP cable underneath the laptop that sits raised on my custom laptop stand. Moving the cable a few inches lower to the underneath of the desk eliminated the interference completely.

<Caption text="Display cable interference">
<Image src="/journal-images/LG-interference.jpg" alt="Display cable interference" />
</Caption>

## 4K Gaming

Naturally, 4K gaming is taxing on your system and requires a monster PC. I haven’t bothered trying 4K gaming on my MacBook Pro, but I did a quick trial of Arma III on my desktop PC (Windows 10 Pro 64-bit, Intel Core i5 3570K overclocked to 4.2 GHz, 16 GB RAM, EVGA GeForce GTX 670 4 GB, 256 GB SSD). Frame rates and hardware configurations are beyond the scope of this review, yet I want to offer a subjective take on 4K gaming relative to 1440p gaming: the increased resolution isn’t noticeable.

Gaming on a 27-inch screen results in even larger viewing distances than typical productivity use, so at gaming viewing distances on 27-inch monitors, 4K and 1440p are virtually indistinguishable. If anything, the lower frame rate of 4K on the same hardware results in a worse experience. For immersive gaming, three 1080p monitors might be a better—and cheaper—option.

The GTX 670 was among the bleeding edge of 4K-supporting video cards, and it has a few quirks of its own. Running both 27-inch monitors (4K and 1440p) simultaneously caps the 4K display to 30 Hz. Unplug the 1440p display and the 4K display jumps back up to 60 Hz. Weird, but I’m not upgrading to a newer video card since I rarely game any more.

Interestingly, the GTX 670 theoretically supports 4K60 _only_ over DisplayPort [according to EVGA](https://www.geforce.com/hardware/desktop-gpus/geforce-gtx-670/specifications); however, it actually can run 4K60 over HDMI (be sure to enable “HDMI ULTRA HD Deep Colour” on the LG), despite the refresh rate being officially stated as limited to 30 Hz over HDMI. The benefit of this is that I can connect my MacBook Pro and PC to the LG and switch inputs via the OSD joystick rather than cumbersomely swapping the DisplayPort cable to get 4K60 from both computers. Gotta love it when you get something for nothing!

## Conclusion

Given that I use a laptop as my primary computer, an external 4K display was the cheapest way to get a 27-inch Retina-quality display. If you are in the market for a whole new computer, Apple’s 27-inch 5K iMac regularly trades prices with Dell’s standalone P2715Q 5K display—and includes a computer to boot (pun intended). 4K displays, including those with high-end IPS panels like the LG, have become quite reasonably priced and have moved beyond some of their early growing pains to be reliable enough in daily use.

The LG 27UD68-W is a fantastic upgrade over 1440p and is currently the most affordable IPS 4K display. What it lacks in stand adjustability and connectivity (no USB hub, only two HDMI and one DP inputs), it makes up for with its excellent IPS panel and modern, no-frills design. Apple now [has its eye on LG panels](https://www.macrumors.com/2016/08/29/new-macbook-pro-air-oct-amd-imacs-5k-display-lg/), though a rumoured standalone Apple 5K display will undoubtedly be well above the $550 CAD price point, which you can spend _today_ on this great LG monitor.

**UPDATE August 3, 2018**: Much has changed in the two years since I wrote this review. As expected, Apple/LG released the wide-gamut [UltraFine 5K Display](https://www.macrumors.com/2016/10/27/apple-4k-5k-lg-displays-new-macbook-pro/) in October 2016 for $1700 CAD, while Apple is [rumoured](https://www.macrumors.com/2017/04/04/apple-updates-mac-pro-and-more/) to be re-entering the external display market.

The LG 27UD68-W is no longer available, though its price remained relatively constant over the 2+ years it was on sale—about $550 CAD—thus justifying my relatively early adoption (it’s always regrettable when the price of new tech plummets immediately after you “invest” in it). The 27UD68-W has been superseded by the [27UK600-W](https://www.memoryexpress.com/Products/MX71916), with the only appreciable difference being that the newer model now has HDR 10 support. While the 27UK600-W lacks the crispness of 5K and high-gamut support (only sRGB vs. DCI-P3) of the LG UltraFine, it commands a modest price tag of only $500 CAD.

I am still _very_ happy using my 27UD68-W, and current 4K monitor equivalents like the 27UK600-W remain a budget-friendly way to get a high-DPI 27-inch display.
