---
title: Ruby on Rails in 2019
description: An overview of Ruby on Rails and its current relevance.
date: '2019-09-22'
draft: false
category: Tech
---

<script>
    import Image from 'svimg'
    import Caption from '$lib/components/images/Caption.svelte'
</script>

<Image src="/journal-images/rails-1.jpg" alt="Ruby on Rails" class="wide" />

## Table of Contents

## Introduction

Back-end web developers have an abundant — perhaps overwhelming — selection of server-side frameworks to choose from in 2019: [Express](https://expressjs.com/) on [Node.js](https://nodejs.org/en/); [Django](https://www.djangoproject.com/) on [Python](https://www.python.org/); [Ruby on Rails](https://rubyonrails.org/); [Laravel](https://laravel.com/), [CodeIgniter](https://codeigniter.com/), or [Symfony](https://symfony.com/) on [PHP](https://www.php.net/); and [Spring](https://spring.io/) on [Java](https://www.java.com); among many more. Such server-side frameworks are intended to accelerate the creation of web applications, usually by providing helper libraries that minimize the coding required in development.

Interestingly, Ruby on Rails developers [often rank](https://insights.stackoverflow.com/survey/2019#top-paying-technologies) among the top earners of web developers, despite the relatively low overall popularity of Rails servers. Rails is open source — as is the much [more popular](https://www.similartech.com/compare/php-vs-ruby-on-rails) PHP — yet prides itself on a [unique doctrine](https://rubyonrails.org/doctrine/) that appears to attract fastidious developers.

As a budding developer with some basic PHP and Node.js experience, I became intrigued by Ruby on Rails and wanted to do some research into this _gem_ of a programming language. This article presents my findings on the history of Ruby on Rails, comments on its unique features, and discusses its relevance in 2019 and beyond, including in the job market.

## A brief history of Ruby on Rails

Ruby on Rails was first developed in 2003 by Danish developer [David Heinemeier Hansson](https://dhh.dk/). He derived Rails from his work on the project management application [Basecamp](https://basecamp.com/). Rails was open-sourced in 2004, allowing additional developers to contribute to the project (remarkably, Hansson [continues](https://dhh.dk/#rails) to lead development).

Rails addressed many developer complaints with then-current versions of similar web programming languages (especially PHP), preferring elegant, minimally verbose code. A 2005 webcast by Hansson, “[How to build a blog engine in 15 minutes with Ruby on Rails](https://www.youtube.com/watch?v=Gzj723LkRJY),” famously demonstrated the minimal coding and effort required to get a basic blog running on Rails, enticing many developers away from competing server-side languages.

Ruby on Rails reached one of its first big milestones with a [1.0 release](https://weblog.rubyonrails.org/2005/12/13/rails-1-0-party-like-its-one-oh-oh/) in 2005. It gained further momentum in 2006 when Apple announced that Mac OS X Leopard [would ship](https://weblog.rubyonrails.org/2006/8/7/ruby-on-rails-will-ship-with-os-x-10-5-leopard/) with it:

> The love for Ruby has definitely spread inside Apple and we’ve been thrilled to see the level of interest they’ve taken to get OS X to be a premiere development and deployment platform for Rails.

Ruby on Rails rose in popularity as a server-side language and subsequently underwent many major revisions occurring every few years (from Wikipedia’s “[Ruby on Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails)”):

-   Rails 1.0: December 2005
-   Rails 2.0: December 2007
-   Rails 3.0: August 2010
-   Rails 4.0: June 2013
-   Rails 5.0: June 2016
-   Rails 6.0: August 2019

Rails’ market share reached an [estimated 0.5%](https://w3techs.com/technologies/history_overview/programming_language/ms/y) among all web servers in 2010 and has grown steadily to an estimated 2.7% in 2019 (over [400,000](https://www.similartech.com/compare/php-vs-ruby-on-rails) known websites). Overshadowed by PHP’s consistent 75–80% share, Rails may appear as a niche language; nevertheless, Rails serves as the backbone for many mega-trafficked websites today, including [Github](https://github.com/), [Shopify](https://shopify.com/), [Airbnb](https://airbnb.com/), [Square](https://squareup.com/), and [Kickstarter](https://www.kickstarter.com/). Its source code is still under active development, as evidenced by the very recent release of Rails 6.0; however, an overall sentiment of decline in Rails’ popularity has been observed in recent years:

<Caption text='Monthly popularity in Stack Overflow questions of select web-programming languages. From <a href="https://insights.stackoverflow.com/trends?tags=node.js%2Cruby-on-rails%2Cphp%2Cdjango">Stack Overflow Trends</a>.'>
<Image src="/journal-images/rails-2.png" alt="Monthly popularity in Stack Overflow questions of select web-programming languages." />
</Caption>

As competing technologies gain popularity in the web-application space — Node.js has experienced an especially meteoric rise to eminence — Rails is perhaps facing the same scenario that led to its inception: new languages can offer improved solutions (like cleaner code and less technical baggage) compared to existing, older languages. As Rails continues to age, it will have to tread the line between mature software (which has the advantages of stability, popularity, and familiarity) and legacy software (where support for older environments can stifle innovation and exacerbate cruft in its codebase).

## The Rails way

As a developer, I found Ruby on Rails to have a near-perfect amount of server verbosity. For example, running a simple e-commerce site (from [this repository](https://github.com/lighthouse-labs/jungle-rails), part of the [Lighthouse Labs](https://www.lighthouselabs.ca/) web development boot camp) results in a fantastically concise set of server console outputs, as demonstrated in the following two screenshots:

<Caption text='Front-end view of Jungle Rails.'>
<Image src="/journal-images/rails-3.png" alt="Front-end view of Jungle Rails." />
</Caption>

<Caption text='The corresponding server console for loading the Jungle Rail’s homepage. Just the right amount of verbosity!'>
<Image src="/journal-images/rails-4.png" alt="The corresponding server console for loading the Jungle Rail’s homepage. Just the right amount of verbosity!" />
</Caption>

Upon page load, the server outputs the GET request location (“/”) and time, the controller that was used (the “index” action of “ProductsController”), the templates that were rendered (products/\_product.html.erb, products/index.html.erb, and layouts/\_top-nav.html.erb), and the database queries called by [Active Record](https://guides.rubyonrails.org/active_record_basics.html) (Ruby’s built-in [Object Relational Management](https://en.wikipedia.org/wiki/Object-relational_mapping) \[ORM\] framework). These outputs are quite helpful in development and debugging.

While the ideal amount of server verbosity is entirely subjective, consider that to achieve a similar amount of server output in Node.js, one would have to install the [Morgan](https://github.com/expressjs/morgan) middleware (or similar) as well as choose and configure an ORM framework capable of database query logging. Such a setup is entirely possible — and indeed more customizable than in Rails — but the additional mental energy expended finding, implementing, and tweaking supplementary server middleware is far more intense than Rails’ out-of-the-box solution.

This example illustrates one of the Rails mantras, _convention over configuration_, where choice — i.e., configuration — is sometimes intentionally limited so that developers are freed from expending their energy on trivial settings.

In “[The Rails Doctrine](https://rubyonrails.org/doctrine/),” Hansson argues that Ruby on Rails’ enduring popularity is not merely the result of its initial good timing and technological superiority, but the persisting ideology behind it:

> Ruby on Rails’ phenomenal rise to prominence owed much of its lift-off to novel technology and timing. But technological advantages erode over time, and good timing doesn’t sustain movements alone over the long term.

[The Rails Doctrine](https://rubyonrails.org/doctrine/) features nine pillars ultimately aimed at maximizing programmer happiness, enabling the creation of beautiful code, and providing powerful tools when additional flexibility is required, all while maintaining accountability to the diverse open-source contributor community behind Rails. While these paradigms are hardly unique in software development, Rails has attracted many talented developers to its still-healthy community.

Rails employs a [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (MVC) pattern, a design pattern common in user interfaces where program logic is separated into three individual components: the model (data storage; usually a database), the view (code used to visually render an application to the user), and the controller (logic that routes data between the model and view components). While it took some time to initially wrap my head around this logic, it ultimately became quite intuitive, and Rails’ implementation of the MVC pattern is a major reason behind its rapid development capability. (The above terminal screenshot of the Jungle Rails server shows essential data from the MVC pattern: database queries \[model\], rendered templates \[view\], and processing by “ProductsController” \[controller\].)

Expanding its basic features, Ruby has an extensive library of [gems](https://rubygems.org/) (Rails is itself a [Ruby gem](https://rubygems.org/gems/rails/)) that are frequently used in Rails projects (for example, [bcrypt](https://rubygems.org/gems/bcrypt/), used for password hashing, has over 68,000,000 total downloads). Ruby also has some advanced features such as [metaprogramming](http://rubylearning.com/blog/2010/11/23/dont-know-metaprogramming-in-ruby/).

Asynchronous programming is, unfortunately, lagging in Rails. While Node.js offers excellent asynchronous support—via [callbacks](https://nodejs.dev/javascript-asynchronous-programming-and-callbacks), [promises](https://nodejs.dev/understanding-javascript-promises), and [async/await](https://nodejs.dev/modern-asynchronous-javascript-with-async-and-await)—support in Rails is largely limited to [event-based ActiveRecord callbacks](https://guides.rubyonrails.org/active_record_callbacks.html). Don’t worry if this is over your head—just appreciate that Node.js offers much better support for asynchronous programming, an increasingly popular consideration in web development. (For a good primer on the topic, see Marijn Haverbeke’s “[Asynchronous Programming](https://eloquentjavascript.net/11_async.html).”)

These are a few examples of Rails’ strengths and weaknesses. While a more comprehensive comparison of Rails’ technical differences to other web programming languages is beyond the scope of this article, appreciate that Rails excels in certain areas, yet trails in others. This is to say that Rails is _opinionated_ and can be the best choice in certain — but not all — situations.

In his article, “[Who gives a F\*\*\* about Rails in 2019?](https://naturaily.com/blog/who-gives-f-about-rails)” Wojciech Miśta recommends Rails for most regular web applications, such as e-commerce sites. He cautions against it for other use cases, however: simple sites where Rails would be overkill, massive sites where bleeding-edge performance is necessary (Twitter [famously moved](https://blog.twitter.com/engineering/en_us/a/2011/twitter-search-is-now-3x-faster.html) from Rails to Java in 2011, resulting in 3x faster searching), and applications that integrate machine learning.

One of Rails’ main advantages is still the speed in which new web applications can be prototyped and developed — a spirit that has fortunately been maintained since Hansson’s 2005 webcast, “[How to build a blog engine in 15 minutes with Ruby on Rails](https://www.youtube.com/watch?v=Gzj723LkRJY).”

## Rails developers in 2019

The high salaries commanded by experienced Rails developers can perhaps be attributed to its adoption by certain monolith websites around the early 2010s (again, [Github](https://github.com/), [Shopify](https://shopify.com/), [Airbnb](https://airbnb.com/), [Square](https://squareup.com/), and [Kickstarter](https://www.kickstarter.com/), among others). Rails expertise is required to maintain these — and many other — existing websites.

Sampling the current job market (conducting a worldwide LinkedIn search for “node.js developer,” “PHP developer,” and “rails developer”) provides additional insight into this situation:

<Caption text="Worldwide LinkedIn postings for three web development languages. Performed September 20, 2019.">
<Image src="/journal-images/rails-5.png" alt="Worldwide LinkedIn postings for three web development languages. Performed September 20, 2019." />
</Caption>

Rails developer jobs are roughly an order of magnitude (10x) more scarce than either PHP or Node.js developer jobs! This certainly adds credence to the Rails-niche notion. The low supply of Rails developers may drive up the demand — and thus salaries — for them.

So, should junior developers entering the job market in 2019 learn Rails?

While overall excitement around Rails may be waning, it will not be dying any time soon given its current popularity and steadily growing (if slowly) market share. Though it may be harder than other languages for junior developers to find Rails work, the salary curve will likely ramp up faster.

Consider your ambitions as a developer. Would you prefer to learn an established, opinionated language, usually with a single preferred method to accomplish a given task, or does the flexibility of exploring different methods and determining which is the most optimal sound more appealing (such as in Node.js or PHP)?

For a quick taste of Rails, give it a try: follow the “[Getting Started with Rails](https://guides.rubyonrails.org/getting_started.html)” tutorial to create a basic blog from scratch (bonus points if you can complete it within 15 minutes!).

Remember that much of software development requires continuous learning. It would be naïve to assume that you’ll be programming in the same language for 20+ years, a caveat that applies to any language you choose to learn today.

## Final words

We have seen how Ruby on Rails has established itself as a mature, opinionated web development language. It has managed to remain true to its roots in facilitating the rapid development of web apps for 15 years now. Rails’ unique qualities make it an excellent choice in many web applications, and it continues to offer lucrative salaries to those inclined to master its nuances.

**UPDATE January 17, 2020**: With the growing popularity of single-page applications (SPA) via front-end frameworks such as [React](https://reactjs.org/), [Angular](https://angular.io/), and [Vue](https://vuejs.org/) (among others), the View component of the Model-View-Controller paradigm in server-side framworks has been largely obviated by client-side rendering. Rendering a page on the client side is _usually_ faster than making round-trips to the server to fetch HTML code. SPAs also enable higher responsiveness and interactivity as page loads (equivalent to hitting the Refresh button in your browser) are no longer required. As of Rails 5, Rails can run in [API mode](https://guides.rubyonrails.org/api_app.html), serving as a headless back-end that simply returns JSON data to a front-end framework via [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) API calls. This is another example of Rails adapting to overall trends while still maintaining its core principles of being friendly toward developers.

## References

-   “[The Rails Doctrine](https://rubyonrails.org/doctrine/),” David Heinemeier Hansson.
-   “[Asynchronous Programming](https://eloquentjavascript.net/11_async.html),” Marijn Haverbeke.
-   “[Who gives a F\*\*\* about Rails in 2019?](https://naturaily.com/blog/who-gives-f-about-rails)” Wojciech Miśta.
-   “[Don’t Know Metaprogramming In Ruby?](http://rubylearning.com/blog/2010/11/23/dont-know-metaprogramming-in-ruby/)” Gavin Morrice.
-   “[Historical yearly trends in the usage of server-side programming languages for websites](https://w3techs.com/technologies/history_overview/programming_language/ms/y),” W3Techs.
-   “[Ruby on Rails](https://en.wikipedia.org/wiki/Ruby_on_Rails),” Wikipedia.
