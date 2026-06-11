---
title: 'The Upgrade to 5K: LG 27MD5KL-B Review'
description: A twelve-year dream has come true.
author: Russell McWhae
date: 2026-06-11
draft: 0
category: Tech
---

I have had my eyes on 5K displays ever since they first came into existence. In October 2014, Apple launched the 27-inch “iMac with Retina 5K display,” the highest-resolution desktop-sized screen ever made. I remember ogling the crispness of these displays at the Apple Store in Calgary.

Retina displays have pixels so small that they are effectively invisible to the naked eye. The first such display came with the iPhone 4 in June 2010, a revolutionary advancement which doubled the linear pixel density of its predecessor, the iPhone 3GS, by jumping from 320 x 480 pixels to 640 x 960 pixels on the same 3.5-inch screen. Interface elements were drawn at twice their previous dimensions in order to appear at the same physical size. This means higher resolution and sharpness—the magic of Retina displays.

Mobile technology often lags behind larger devices, but high-resolution screens were an exception to this rule: Retina displays started with mobile screens and took longer to make it to larger devices. Pixel-doubling Retina display upgrades made it to the 9.7-inch iPad in March 2012, and the 15-inch MacBook Pro in June 2012.

With the first Retina iMac in 2014, some clever engineering was required to push the high resolution on a large 27-inch screen: two DisplayPort 1.2 (max 4K at 60Hz) streams were seamlessly merged into a single 5K picture. Graphics interfaces would need some time to catch up before single-cable external 5K would become possible.

As I have always preferred the portability of Mac laptops, owning an iMac—an integrated computer and display—never appealed to me. Many power users share this preference. My setup has always been to pair a laptop with an external display (that is also used by a desktop PC), keyboard, and mouse, giving the best of both worlds: a large screen and dedicated peripherals at home, and the ability to unplug the laptop and take it anywhere. In 2014, I owned a Late 2013 15-inch MacBook Pro with Retina Display paired with an Asus 27-inch 1440p external display, my budget equivalent to the 27-inch 1440p Apple Thunderbolt Display.

Dell released the first external 5K display—the UP2715K for $2,799 (all prices CAD)—shortly after the first 5K iMac, requiring two DisplayPort connections. It cost even more than the 5K iMac, which started at $2,499, never mind that it did not include a computer. 5K was still in its early stages, so I watched and waited.

In June 2016, with 5K monitor prices still out of reach, I bought a 27-inch [LG 4K monitor](/journal/the-upgrade-to-4k) for a more reasonable $550. This stopgap measure ended up becoming my daily driver for the next decade.

If you can manage the upfront sticker shock, external monitors can offer a surprisingly strong value proposition, as they routinely outlast your computer. My “stopgap” 4K monitor has lasted three different MacBook Pros. Such longevity is truly exceptional among gadgets: nothing else I can think of has given me a decade of daily use for $550. It brings my [LG 4K monitor review](/journal/the-upgrade-to-4k) from ten years ago full circle—here’s hoping for many more years yet.

After a long wait—twelve years!—my 5K dream has come true: my eyes are literally on a 5K display while writing this. Here’s how I got one without breaking the bank, and some thoughts on using it.

## A Note on Resolution

The term “5K” can be ambiguous. For the purpose of this piece, I’ll be referring to 27-inch monitors with 5120 (5K) x 2880 resolution. Other 5K monitors do exist, such as “5K2K” ultra-wide monitors with 5120 x 2160 resolution and screen sizes ranging from 39–45 inches. Such monitors, while high resolution, fall short of the unofficial Apple Retina designation of 218+ PPI for desktops.

My 27-inch 4K (3840 x 2160) monitor has a pixel density of 163 PPI, also below that of Apple’s Retina criteria. Rendering macOS on such not-quite-Retina displays often means using a scaled resolution, an ongoing source of contention and confusion that I’d like to clarify next.

On my 4K display, I run it in “2560 x 1440” mode, which comes with the warning “Using a scaled resolution may affect performance.” In this scaled mode, macOS renders a 5120 x 2880 virtual canvas, then downsamples the image on the fly to 3840 x 2160 to match the display’s physical resolution. This is known as non-integer scaling: 3840 pixels divided by the target width of 2560 pixels is 1.5, a floating-point conversion. With 5K, the virtual 5120 x 2880 canvas maps directly onto the display’s 5120 x 2880 physical resolution, requiring no such conversion.

With 4K, the secondary downsampling step puts additional overhead on the GPU, meaning that a 5K screen—with more physical pixels—is counter-intuitively _more_ performant than running a 4K screen at a scaled resolution. How much is the impact? AppleInsider [estimates](https://appleinsider.com/inside/macos/tips/what-is-display-scaling-on-mac-and-why-you-probably-shouldnt-worry-about-it) a negligible 1–3% drop in GPU performance. Anecdotally, I have used a scaled resolution on my 4K screen for a decade now without issue, even when using older hardware like my 2013 15-inch MacBook Pro.

Furthermore, note that certain Mac laptops come with scaled resolutions _by default_. For example, my 2019 16-inch MacBook Pro came with a native resolution of 3072 x 1920. Exact pixel doubling would mean a workspace that “looks like” 1536 x 960, yet Apple defaulted the “looks like” resolution to 1792 x 1120 in order to increase the apparent screen real estate. I actually overrode this default to use “looks like” 1536 x 960 as I found the interface elements too small at the higher-resolution setting.

Essentially, Retina resolution comes down to a combination of a display’s size, pixel density, and viewing distances. If the underlying pixel density is high enough, as in Apple’s laptops, using a scaled resolution is fine. If, as with a 4K 27-inch monitor, the pixel density cannot match that of an equivalent pixel-doubled display, non-integer scaling will result in text and interface elements that appear slightly more pixelated.

In contrast to macOS, Windows handles display scaling using a vector-based approach. When you select a fractional scaling factor like 150% (the Windows equivalent of running a 27-inch 4K monitor at “looks like 2560 x 1440”), no downsampling step is required. Instead, Windows instructs applications to render text and UI elements natively to match the screen’s physical pixels. This means that text on Windows remains mathematically sharp regardless of the scaling factor, though it still cannot overcome the physical pixel-density advantage of a true 5K display.

Apple’s cutoff—218+ PPI on desktops—may seem arbitrarily high, but Apple is often seen as the Ferrari of computer brands: uncompromising design, with a correspondingly high price tag.

## History of 5K Displays

Ever since the release of the first 5K iMac in 2014, consumers demanded a 5K Apple-built external display. However, Apple continued selling their 1440p Thunderbolt Display until June 2016. Then, instead of releasing a standalone 5K display, Apple exited the display market. This is when I bought my LG 4K monitor.

Apple partnered with LG to release the 21.5-inch (4K) and 27-inch (5K) Thunderbolt displays for Macs starting later in 2016. The launch price of the 27-inch 27MD5KA was $1,800, a thousand dollars less than Dell’s 2014 UP2715K. Reviews were mixed: the high resolution was nice, but the displays had some issues like signal interference around WiFi routers. In 2019, LG released a slightly updated version of the 27-inch model, the 27MD5KL-B for $1,700, with upgraded Thunderbolt 3/USB-C ports but otherwise similar hardware.

Also in 2019, Apple returned to the display market, releasing the Pro Display XDR, a 6K, 32-inch screen starting at $6,299. If this pricing wasn’t outrageous enough, a stand was an extra $1,299. This was out of reach for everyone but a subset of wealthy professionals—an apparent overcorrection after Apple’s three-year hiatus from the display market.

In 2022, Apple launched the long-awaited standalone 5K display: the Apple Studio Display, for $1,999. While it finally gave consumers what they desired, the panel specs were largely unchanged from the original 5K iMac in 2014: an IPS panel with a 60Hz refresh rate. Some niceties included an integrated webcam and better-than-average integrated speakers, but it was nonetheless an elevated price to pay for aging panel technology.

High-end displays are a niche product that may never achieve mainstream adoption and sales volumes. When Apple discontinued the 27-inch 5K iMac in March 2022, they replaced it with a 24-inch iMac—a screen size presumably adequate for most users, but a downgrade for enthusiasts. After years of using 27-inch screens, I would find it hard to go back to a smaller size.

In March 2026, Apple refreshed the Studio Display. Now costing $2,099, the Studio Display still has a similar panel to the 2022 model—again, largely unchanged since 2014—with modest upgrades like Thunderbolt 5 instead of 4, and a better webcam.

A higher-end sibling model was announced too: the 27-inch 5K Studio Display XDR. Notably, this dropped in size and resolution from the 2019 Pro Display XDR (6K/32 inch). The Studio Display XDR comes with more recent innovations including a mini-LED panel that has 2304 local dimming zones (darker blacks and less bloom), HDR (better contrast), and a 120 Hz refresh rate (more fluid motion). While such a display would be a treat to use, the cost is still prohibitive, starting at $4,499.

Many third-party manufacturers have started selling 5K displays. Prices range from $830 to $1,729, all less than Apple’s offerings. Currently shipping options include:

- **ASUS ProArt Display PA27JCV** ($999): 60Hz IPS, Mac-focused
- **ASUS ROG Strix 5K XG27JCG** ($999): dual-mode IPS, 5K@180Hz / 1440p@330Hz, gaming-focused
- **BenQ PD2730S** ($1,729): 60Hz IPS, Thunderbolt 4
- **Samsung ViewFinity S9** (~$1,000): 60Hz IPS, Thunderbolt 4 (harder to find)
- **ViewSonic ColorPro VP2788-5K** ($1,170): 60Hz IPS, Thunderbolt 4

A few other 5K monitors have either been announced or are not yet widely available (at least in Canada):

- **AOC AGON PRO AGP277KX** (price unknown): dual-mode IPS, 5K@180Hz / 1440p@350Hz
- **Hisense GX Ultra** (price unknown): glossy dual-mode mini-LED, 5K@180Hz / 1440p@330Hz, China only
- **KTC H27P3** (~$830): dual-mode IPS, 5K@60Hz / 1440p@120Hz
- **Kuycon G27P** (~$1,250): 60Hz IPS
- **LG Ultra Gear Evo AI 27GM950B-B** (~$1,400): dual-mode mini-LED, 5K@180Hz / 1440p@330Hz
- **MSI MAG 271KPD7** (price unknown): dual-mode IPS, 5K@75Hz / 1440p@300Hz
- **MSI MPG 271KRAW16** (price unknown): dual-mode mini-LED, 5K@165Hz / 1440p@330Hz

If you can find one—I could not—KTC’s H27P3 is the best value offering of all the 5K displays, apparently available for as little as $830. This list is not comprehensive. The site [RetinaDisplays.com](https://retinadisplays.com/) maintains a list of 4K, 5K, and 6K monitors that meet Apple’s 218+ PPI Retina requirement.

The latest innovations with 5K monitors are higher refresh rates and mini-LED backlights. Apple offers these in the high-end Studio Display XDR. Many such monitors offer a dual-mode capability: the resolution can be halved to 1440p, doubling the frame rates. This is most useful for gamers playing high-FPS e-sports titles. Mini-LED backlights, usually with 2304 “local-dimming zones,” allow groups of backlights behind dark areas of the image to be dimmed or turned off, offering deeper blacks and improved contrast—though not quite to the level of OLED, which turns off individual pixels.

I am particularly intrigued by the LG Ultra Gear Evo AI 27GM950B-B, estimated to cost $1,400. On paper, its panel specs match those of the $4,499 Apple Studio Display XDR: a mini-LED panel with high refresh rates. While it may not include goodies like a built-in webcam or Thunderbolt connectivity, it would be around one third of the cost.

The demand for affordable 5K monitors is high enough that a fascinating cottage industry has developed. It has become possible to convert many of the 2014–2019 5K iMacs into standalone displays by gutting their old internals and replacing them with aftermarket conversion boards. Quinn Nelson of Snazzy Labs made a video about this, [I Turned a $200 iMac Into a $1,600 Studio Display!](https://www.youtube.com/watch?v=5q3SdtiLAPk) (USD prices):

> Non-integer scaling on macOS drives me insane. Text at 4K on a 27-inch display is just a little fuzzy, enough that it may _vuelve loco_ [Spanish for going crazy]. And I know that I’m pathetic, but, you know, I want an Apple monitor, ideally on the cheap. The thing is—I’ve already got one. It’s just inconveniently attached to this worthlessly old and slow 2014 computer.

I saw someone selling such a converted iMac in Vancouver for $600. It went quickly.

Many of the 5K monitors shipping today still use 60Hz IPS panels, similar to the original 5K iMac. Apple’s Studio Display is the most egregious example of this: in 2026, spending over $2,000 on panel technology largely unchanged from 2014 makes little sense.

If so many new 5K displays are based on dated hardware, why not buy _dated hardware_?

## LG 27MD5KL-B Review

Vancouver’s oh-so-liquid used market delivered yet again. I recently saw an LG 27MD5KL-B, one of the Apple/LG 5K displays from 2019, come up for $900. After a few weeks of presumably little interest, the seller dropped the price to $450. Unable to resist such a low price after years of waiting—this was the cheapest 5K monitor I have ever seen—I grabbed it.

The monitor is in decent shape: no major scratches on the screen or body. There is, however, a small, circular blemish toward the left side of the screen, about 1mm in diameter. It’s particularly noticeable when the screen is displaying light colours—not a dealbreaker but a minor annoyance.

While a bit dated now, I don’t mind the look of the 27MD5KL-B. It has a sleek, all-black industrial design, with no buttons. macOS itself handles the brightness and volume adjustment. The integrated speakers are expectedly cheesy, but, as I use external speakers, this is not an issue. New monitors may have slimmer bezels (and less of a forehead), but this makes little difference in day-to-day use.

A single Thunderbolt 3 cable connects to your computer, with power delivery to charge your laptop. This allows you to connect up to three USB-C devices directly to the monitor. I understand now why Apple displays use Thunderbolt: a single cable eliminates the clutter of multiple cables, dongles, or docks. After years of routinely dealing with three or four cables, this is a delightful improvement that I appreciate more than I thought I would.

The screen itself is gorgeous. While mini-LED and OLED panels are known for deeper blacks, the black levels on the 27MD5KL-B are noticeably darker than my LG 4K monitor (both are IPS panels). My MacBook Pro M2’s screen has a mini-LED panel with local dimming, and the 27MD5KL-B does not look drastically worse.

There is an integrated 1080p webcam on the monitor. Its video output is unsurprisingly soft, but I use it out of convenience. I now keep my laptop in clamshell mode, connecting it to two external displays (more on this in a minute).

The display has a glossy finish, which I find a delightful upgrade compared to the matte finish on my aging LG 4K monitor. There has long been a debate about glossy versus matte displays, with some users preferring the richer colours of glossy displays, while others prefer the diminished reflections of matte displays. Such divisions usually seem to amount to little more than differences in personal taste—my inclination is glossy. Photo editing on this screen is just fabulous. It’s like looking at a glossy print magazine. Every time I move in closer to pixel peep, which happens often enough in my various tasks (photo editing, software development, writing), I am amazed by the clarity of the image.

Another upgrade over my older 4K monitor is a wider colour gamut. The 27MD5KL-B covers 99% of the DCI-P3 colour space, meaning it displays about 25% more of the visible spectrum than my LG 27UD68-W (which tops out at 99% sRGB). In theory, greens and reds should appear more vibrant, but when mirroring the desktop to edit the same photo in Lightroom across both displays, I see almost no difference in these hues. I haven’t yet bothered with calibration, as the colours look great out of the box.

Specs matter—but only to a point. While the 5K display is an upgrade over my 4K display in almost every way, I’m more concerned with what it’s like to use day after day than with a spec-sheet comparison. With this in mind, is a 5K monitor an unnecessary indulgence, or is it a useful tool offering tangible workflow benefits?

My verdict aligns with Nelson’s: after ten years of non-integer scaling on macOS, a true Retina desktop display is the upgrade I have been waiting for. It’s just terrific. The screen is so, so sharp. Single-cable Thunderbolt is the chef’s kiss on top of an already massive upgrade (though I do need to use the HDMI port for wiring up the second display). I have zero disappointment after more than a decade of expectation—and no buyer’s remorse either, given the discounted price I paid. It would be hard to go back to a non-Retina desktop display on macOS.

I have set up both of my 27-inch LG monitors side by side. On the left is the 5K monitor, connected via Thunderbolt to my MacBook Pro; on the right is my 4K monitor, used as a secondary display for my Mac or the primary display for my PC. As the PC lacks Thunderbolt, it cannot connect directly to the 5K monitor. Instead of sharing a keyboard, I have dedicated keyboards and mice for each computer, physically shifting my desk chair laterally to align with whichever side of the desk I want to use (since we aren’t supposed to sit still for too long anyway).

This highlights some ergonomic issues with dual 27-inch displays. As the displays are so wide, having them both aligned in a straight line means having to twist your neck quite far to see the extreme edges. To alleviate this, you can either angle them toward you (janky unless you have a corner desk), position one screen vertically (it would need to be my primary PC screen, which isn’t ideal), or try my dual-peripherals approach (more items on the desk). Each of these options involves some amount of compromise, which is likely the reason why ultrawide monitors are gaining popularity.

---

## Wrap-up

A truly perfect monitor does not exist. Given today’s technology, my specs for such a hypothetical monitor would be a 32-inch 6K OLED monitor (even deeper blacks than mini-LED) with a high refresh rate (180Hz or more), and Thunderbolt 5 connectivity. Obviously, the price on such a monitor—especially if made by Apple—would be outrageous.

Even if such a monitor existed, I wouldn’t pay for it. Given the demonstrated longevity of my old LG 4K monitor—not to mention those DIY 5K iMac conversions—I have no qualms about buying used. Readers of previous musings such as _[Longitudinal Tech Reviews](/journal/longitudinal-tech-reviews)_ and _[Behind the Curve](/journal/behind-the-curve)_ will know of my propensity for value and staying power over novelty. My MO for tech purchases—and essentially all other purchases, too—has always been to maximize utility while minimizing cost.

In this light, upgrading from a ten-year-old 4K monitor to a seven-year-old 5K monitor is the perfect embodiment of my tech philosophy. It ticks every box: no retail sticker shock, tangible usability improvements, and the satisfaction of over a decade of large-screen Retina expectations. This 5K display is one of my favourite tech purchases in years.
