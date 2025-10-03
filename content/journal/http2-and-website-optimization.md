---
title: HTTP/2 and Website Optimization
description: A look at the latest iteration of HyperText Transfer Protocol.
date: '2019-09-15'
draft: false
category: Tech
---

<script>
  import Image from 'svimg/Image.svelte'
    import Caption from '$lib/components/images/Caption.svelte'
</script>

## Introduction

Dabbling in web design in the late 2000s as mobile devices were just starting to enter the digital landscape, I developed an appreciation for website optimization. At the time, optimization generally meant shrinking and compressing images (especially with data-limited mobile plans), minimizing page and script file-sizes, and a frequent tip that came up — and [still comes up](https://blog.hubspot.com/marketing/reduce-http-requests) — was that _you should minimize the number of HTTP requests (network requests sent between your browser and a webserver) your page makes._ This meant serving ideally no more than one stylesheet, one JavaScript file (i.e., multiple files concatenated together), and one image sprite (see [CSS Sprites](https://css-tricks.com/css-sprites/)) with your web page to minimize its loading time.

The underlying theory was that over the then-current HTTP/1.1 protocol, each additional HTTP request would add latency and thus page-loading time. Multiple separate files would take longer to download than an equivalent concatenated file.

Fast-forward a decade and the HTTP protocol has undergone a major revision to HTTP/2. HTTP/2 addressed several issues with HTTP/1.1 and aimed to enhance overall performance, simplicity, and robustness of the protocol. As for HTTP requests, concatenating files to minimize total HTTP requests [may no longer be](https://yoast.com/performance-optimization-http2/) considered the best practice.

This article will examine the history of the HTTP protocol to provide context for the updates in HTTP/2 and shed light on how these improvements may be leveraged to optimize page-loading times of websites.

(While not the topic of this article, I still find that there is predominantly a lack of optimization among websites today, with auto-playing videos, gigantic images, annoying popovers, and mobile-draining JavaScript, to say nothing of invasive tracking scripts. HTTP/2 is intended to increase performance over HTTP/1.1, but any performance gains realized by this upgrade can quickly be negated by poor page design.)

## HTTP in a nutshell

Hypertext Transfer Protocol (HTTP) is a fundamental component of how the internet operates. When you visit a website, say [http://example.com](http://example.com/), in your browser (Google Chrome, Safari, Microsoft Edge, Firefox, Opera, etc.), your browser sends an HTTP request that gets routed to the server hosting [example.com](http://example.com/). This HTTP request will look like the following (all of this happens behind the scenes to you as a user):

```
GET / HTTP/1.1
Host: example.com
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_14\_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36
DNT: 1
Accept: text/html,application/xhtml+xml,…
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9,fr;q=0.8
```

From the very first line, we can see that the browser is making a GET request to the “/” (root) URL at [example.com](http://example.com/) via an HTTP/1.1 request (this server has yet to be updated to use HTTP/2). In plain language, the browser is asking to be shown the page at the home or root of [example.com](http://example.com/). Some other information is passed along with this request, though it is not important to understand for now.

Assuming that everything goes well (i.e., that you are connected to the internet, and that the server is running normally), the server will then return an HTTP response that looks like this:

```
HTTP/1.1 200 OK
Content-Encoding: gzip
Accept-Ranges: bytes
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Fri, 13 Sep 2019 19:11:27 GMT
Etag: "1541025663+ident"
Expires: Fri, 20 Sep 2019 19:11:27 GMT
Last-Modified: Fri, 09 Aug 2013 23:54:35 GMT
Server: ECS (sec/9739)
X-Cache: HIT
Content-Length: 606

<!doctype html>
<html>
<head>
    <title>Example Domain</title>
<!-- ... html continues ... -->
```

From here, we see that an HTTP/1.1 response has been sent with the status code of 200 (OK). The HTML code that renders this web page in your browser is also sent. (See [https://http.cat/](https://http.cat/) for a fun representation of the various HTTP status codes.) This is the basic premise of HTTP: a browser (or client) sends an HTTP request to a server, and the server responds in turn with an HTTP response.

Diving a bit deeper, HTTP runs over a TCP/IP connection, a set of network transport protocols for machines to communicate with each other (in our case, your web browser and the server). This gets into networking, which is beyond the scope of this article, but the important point here is to appreciate that _how_ HTTP interacts with TCP can dictate page-loading performance. For example, HTTP/1.1 brought the vital advancement over HTTP/1.0 of maintaining the client-host connection via a request-header ‘keepalive’ flag, wherein subsequent client requests could recycle an existing TCP connection to the server for improved network efficiency (notably, each request had to wait for any previous requests to finish). For a good primer on this, see _Chua Hock-Chuan’s_ [HTTP (HyperText Transfer Protocol)](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html). Such an improvement was prompted by the drive for increased performance, a theme we see repeatedly throughout the history of the HTTP protocol.

## Evolution of the protocol

Following the early days of HTTP/0.9 and HTTP/1.0 in the early-to-mid 1990s, HTTP/1.1 became an official standard around 1999 and achieved widespread adoption. It included some important performance optimizations over its predecessors, such as the aforementioned ‘keepalive’ connections.

After many years of global use, performance limits in HTTP/1.1 were being tested as both users and developers came to expect near-instantaneous response times for websites. In early 2012, the HTTPbis working group — the [Internet Engineering Task Force](https://www.ietf.org/)’s [HTTP Working Group](https://httpwg.org/), a consortium of various HTTP implementers, users, and experts — announced the new HTTP/2 initiative. (For more detail, read _Ilya Grigorik’s_ [Brief History of HTTP](https://hpbn.co/brief-history-of-http/).) HTTP/2 provided many improvements over HTTP/1.1, which we will now explore.

## Advantages of HTTP/2

HTTP/2’s main advantage over HTTP/1.1 is performance. Akamai made a [clever demo](https://http2.akamai.com/demo) illustrating HTTP/2’s **up to 2x** speed increase:

<Caption text="Akamai demo: up to 2x speed increase in HTTP/2.">
<Image src="/journal-images/http2-akamai.png" alt="Akamai demo: up to 2x speed increase in HTTP/2." />
</Caption>

This drastically reduced load time is the result of several new features in HTTP/2:

### Binary

HTTP/2 encodes HTTP requests and responses in binary in contrast to the plaintext encoding of HTTP/1.1. Binary encoding is less error-prone (it more accurately handles whitespace, capitalization, blank lines, and line endings) and is more efficient to parse.

### Request and response multiplexing

HTTP/2 can send multiple resources (HTML files, images, CSS files, JavaScript files, etc.) over a **single** TCP connection. Previously, in HTTP/1.1, between four and eight TCP connections per domain per page could be opened by the browser (with many web pages contacting multiple domains in a practice known as ‘domain sharding’ — more on this later), potentially congesting network traffic, while also being subject to head-of-line blocking (new requests on a given connection had to wait for any previous requests to finish). In HTTP/2, multiplexing enables the asynchronous delivery of responses, heavily speeding up asset delivery to the client. It is assuredly the major reason to upgrade to HTTP/2.

### Stream prioritization

The asynchronous delivery of responses in HTTP/2 over a single TCP connection generates a new question: which requests should be delivered first? For example, a stylesheet should have a higher priority than a small logo file. Stream prioritization allows more important assets to be prioritized and thus delivered faster. Individual streams are assigned a ranking integer between 1 and 256 and can be given dependencies on other streams. This process is largely handled on the browser side but has sadly found [suboptimal implementation](https://calendar.perfplanet.com/2018/http2-prioritization/) in all current browsers.

### HTTP header compression

Sending _less_ data — i.e., compressing the text content of HTTP headers — is always faster, [ceteris paribus](https://en.wikipedia.org/wiki/Ceteris_paribus).

### Server push

In HTTP/1.1, a browser needed to receive and parse an HTML file before subsequently issuing requests for embedded assets (CSS stylesheets, JavaScript files, etc.). HTTP/2 can proactively push such responses to clients.

_Ilya Grigorik and Surma’s_ [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/) goes into more detail on the multiple advantages of HTTP/2.

While performance enhancements are highly desirable in web development, adoption can be hindered by difficult implementation procedures and complex code changes. Fortunately, HTTP/2 is enabled via a server upgrade, which should require no website code modification in the majority of cases (unless more advanced optimization techniques are effected — see the next section, ‘HTTP/2 and site optimization’). HTTP/2 is also backward compatible, so older browsers will still be able to access an HTTP/2-enabled server over HTTP/1.1.

Having remained largely ignorant of the onset of HTTP/2, I was delighted to find that [my website](http://russellmcwhae.ca) was delivered over the HTTP/2 protocol, without any updating or configuring on my part (Yes, my homepage comes in at a hefty 4.8 MB download, contradicting my earlier remark about web-page optimization. For now, this is a case of _do as I say, not as I do_):

<Caption text="My portfolio homepage (a previous version). Note the “h2” under Protocol corresponding to HTTP/2.">
<Image src="/journal-images/http2-site.png" alt="My portfolio homepage. Note the “h2” under Protocol corresponding to HTTP/2." />
</Caption>

As support for HTTP/2 required updates to both web servers and web browsers alike, adoption was low at its inception in 2015 but has since grown substantially: current usage of HTTP/2 sits at [just over 40%](https://w3techs.com/technologies/details/ce-http2/all/all) at the time of this writing. [Most modern browsers](https://caniuse.com/#feat=http2) also started supporting HTTP/2 in 2015. Its use should steadily increase going forward.

## HTTP/2 and site optimization

Here are a few tips on how to leverage HTTP/2 in web development:

- Enable HTTP/2. To verify that your site is running HTTP/2, open your page in Chrome Developer Tools (or equivalent), click the Network tab, reload your page, and see if “h2” appears under Protocol, as in the above screenshot. If your site is not yet running HTTP/2 (which will appear as ‘http/1.1’), your web server may need to be upgraded.
- Stop concatenating assets. The old optimization practice of reducing the total number of HTTP requests made by a page no longer necessarily holds. The general recommendation with HTTP/2 is to deliver small, granular resources with optimized caching policies (such that changes to one file would require clients to re-download only that particular file instead of a massive concatenated file). However, unique situations must be addressed individually, as _Craig Silverstein_ explains in [Forgo JS packaging? Not so fast](http://engineering.khanacademy.org/posts/js-packaging-http2.htm)_._
- Eliminate domain sharding. Domain sharding is the practice of splitting web page resources (images, scripts, etc.) over multiple domains to maximize the number of concurrent TCP requests over HTTP/1.1. This technique has been obviated by multiplexing in HTTP/2.
- Stop inlining assets. Inlining assets is the practice of embedding stylesheets and scripts directly into an HTML page to reduce total HTTP requests. Again, this issue has been largely resolved by HTTP/2 multiplexing.

[HTTP/2 is here, let’s optimize!](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19), a slideshow by _Ilya Grigorik_, gives a great visual overview of these HTTP/2 optimization strategies.

Certain optimization techniques intended for HTTP/1.1 are still considered good practice: minimize Domain Name System (DNS) lookups, use Content Delivery Networks (CDNs), compress assets during transfer, leverage browser caching, and minimize asset filesizes. [HTTP/2 For Web Developers](https://blog.cloudflare.com/http-2-for-web-developers/), by _Ryan Hodson,_ goes into more detail on these techniques.

## What’s next: HTTP/3

HTTP/3, previously known as HTTP-over-QUIC, is the next major revision to the HTTP protocol and aims to further reduce client-server latency and page-load times. It accomplishes this by forgoing the familiar TCP network transport layer for the newer QUIC (Quick UDP Internet Connections) transport layer. QUIC is already being tested on certain websites such as [YouTube](https://www.youtube.com/). For more information on this upcoming standard, see _Tonino Jankov’s_ [What Is HTTP/3 — Lowdown on the Fast New UDP-Based Protocol](https://kinsta.com/blog/http3/).

<Caption text="YouTube network requests in Chrome Developer Tools. Note the “http/2+quic/46” protocol corresponding to HTTP/3.">
<Image src="/journal-images/http2-devtools.png" alt="YouTube network requests in Chrome Developer Tools. Note the “http/2+quic/46” protocol corresponding to HTTP/3." />
</Caption>

## Final words

We have seen how HTTP/2 implements several improvements over its predecessor HTTP/1.1. These translate into better real-world performance on websites. Such advantages coupled with optimized website design deliver ever-better experiences to users and developers alike, a trend that will continue with increasing HTTP/2 adoption and eventually HTTP/3 adoption.

## References

- [5 Ways to Improve Your Website’s PageSpeed Using HTTP/2](https://www.makeuseof.com/tag/ways-improve-websites-pagespeed-using-http2/), _Bernt Fuglseth._
- [Brief History of HTTP](https://hpbn.co/brief-history-of-http/), _Ilya Grigorik_.
- [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2/), _Ilya Grigorik, and Surma_.
- [HTTP/2 For Web Developers](https://blog.cloudflare.com/http-2-for-web-developers/), _Ryan Hodson._
- [What Is HTTP/3 — Lowdown on the Fast New UDP-Based Protocol](https://kinsta.com/blog/http3/), _Tonino Jankov_.
- [Forgo JS packaging? Not so fast](http://engineering.khanacademy.org/posts/js-packaging-http2.htm), _Craig Silverstein._
- [How HTTP/2 Is Changing Web Performance Best Practices](https://blog.newrelic.com/engineering/http2-best-practices-web-performance/), _Clay Smith_.
