---
title: 'Quotations.app: Vibe Coding My Way Through a Changing Profession'
description: A coding memoir, a side project, and a commentary on the AI age.
author: Russell McWhae
date: 2026-07-30
draft: 0
category: Tech
---

_Note: Here is the [GitHub repo](https://github.com/rmcwhae/Quotations) for my open-source macOS Quotations app. You need Xcode installed to compile and run the app._

Have you ever read a sentence so clever and impactful that you instantly memorized it? One such phrase came to me in Stephen King’s 1986 novel _It_ when one of the main characters removes a rusty nail from a wooden board, and it squeals “like some small unpleasant animal that had been stepped on and didn’t like it.” This kind of figurative language doesn’t fade quickly.

Too much of what we read does fade, however. Immediately after finishing a novel, I can usually recall most of the plot and many of the conversations between the characters. In time, though, the story loses its saturation, and the dialogue diminishes to but a few of the most memorable sound bites.

I like to read. In addition to [tracking](/reading-list) the books I read, I also highlight text or ideas that are insightful or interesting, ranging from a few words to a few paragraphs. I often use such quotations in my own writing, always giving other writers their due credit.

My primary means of collecting such citations has been a mix of Apple Books highlights, iPad[^1] screenshots (of borrowed virtual library books in the Libby app), and iPhone pictures (of print books). Fragmented as it is, this mishmash of screenshots and photos has been my quotation-management “system” for over a decade. As the cliché goes, a picture is worth a thousand words—and I have thousands of literal words in my camera roll.

[^1]: I have most recently swapped the iPad for a Kobo. I took my own advice from [Longitudinal Tech Reviews](/journal/longitudinal-tech-reviews): “If all I really use a tablet for is reading, why not just get a much cheaper dedicated e-reader?”

To better manage such quotations, I started building an app in 2023 called Quotations[^2]. While similar apps already existed (such as [Bookly](https://getbookly.com/), [Readwise](https://readwise.io/), and [The Quotes App](https://thequotes.tools/)), I wanted to make something custom. Off-the-shelf software titles either lacked polish, were too complex, or didn’t do exactly what I wanted. Nor did I wish to pay for any more software subscriptions.

[^2]: A high-school English teacher once insisted that we use the formal word “quotations” instead of “quotes” for text citations. A few other apps already use “quotes” in their naming, so I am claiming the longer version.

As this was before the age of vibe coding (more on this later), I wanted to use the project to practice writing Go code, which we use at work. I’d also been looking for a reason to make a desktop app. [Wails](https://wails.io/) seemed like a good fit for the tech stack. I’d make a custom React front-end that would directly bind Go methods (instead of making JSON API calls as with a web server) and persist data in a local SQLite database. No cloud deployments, no authentication—just a fabulously lightweight, bespoke desktop app.

I wrote the initial database schema—three tables: `authors`, `sources`, and `quotations`, each with one-to-many relationships linked by foreign keys—and server methods in a few hours. I got stalled building the front-end, however. Front-end has historically been a bottleneck in web development, requiring thoughtful design and iteration. My app remained in half-baked limbo for the next few years, while my camera roll accumulated ever more images of text.

Software development is in a perpetual state of flux: the tools and practices are always changing. This has never been more true than in the past two years, with the rise of agentic or “vibe” coding. Now, you can chat with a Large Language Model (LLM) and have it write code for you.

Thanks to vibe coding, I have finished my app. Here’s how I built it, and some thoughts on the changing craft of coding. I’ll also examine the larger implications of the AI age, and how slowing down may be the antidote to today’s AI frenzy.

## Two Decades of Manual Coding

I have been writing code for twenty years, full-time for the last six. In order to more fully understand the current state of software development, let’s first look backwards.

Building websites in the 2000s meant drafting mockups in Photoshop, slicing them into HTML tables, and building custom WordPress themes. (Shoutout to any developers who remember battling Internet Explorer 6 to get a webpage to render correctly.) This I grasped quickly enough, but more involved functionality like JavaScript interactions and dynamic server-side logic seemed overwhelming to me.

With the advent of mobile phones (the iPhone launched in 2007), website development had to expand—or rather shrink—to smaller screen sizes. I read the first edition of Ethan Marcotte’s _Responsive Web Design_ in 2011, with the novel idea of making websites dynamically _respond_ to a device’s width, offering an optimized layout for different screen sizes.

Around this time, I started my short-lived civil engineering career. Part of my job as an engineer-in-training was to create detailed 50-plus-page calculation reports for the design of steel piperacks. We did this in Microsoft Excel, printing the documents, signing them, scanning the signed copies, then uploading them to a SharePoint server[^3].

[^3]: Within the engineering profession, especially civil engineering, there is a strong emphasis on authenticating design drawings and documents. A licensed Professional Engineer (P.Eng) must sign and stamp such documents (ideally using physical means), hence the printing-and-scanning workflow.

For all of its flexibility, Excel lacked the ability to generate a table of contents as you could with Microsoft Word. Some Googling provided a workaround: someone had written a script in Excel Visual Basic for Applications (Excel’s built-in scripting language) to generate a table of contents. I adapted the code to work with our spreadsheets. Incidentally, I found this more satisfying than designing the steel piperacks themselves, foreshadowing my career change. (For a full history of my tech career pivot, see [My Journey into Tech](/journal/my-journey-into-tech).)

Once I embraced my new career direction, I took the Lighthouse Labs web development boot camp in 2019. This helped solidify my knowledge in previously challenging areas like JavaScript, server logic, and databases. The curriculum demystified concepts, teaching us to break complex problems down into sets of smaller, more manageable steps.

Starting out in my software career, I specialized in front-end work. At the time (2020), the common rhetoric among developers was that you could become really advanced in front-end _or_ back-end web development, but rarely was anyone truly advanced in both areas. I liked the front-end due to its visual nature. Progress was highly tangible: new features in web and mobile apps are easy to see and interact with, while the underlying server-side logic often remains invisible.

In 2022, GitHub launched Copilot, an AI-based coding autocomplete assistant. While writing code, Copilot would read your project files—and seemingly your mind—and intelligently suggest code as you typed. Software development has seen countless gimmicks over the years, but Copilot’s consistently helpful suggestions quickly made it an indispensable tool.

A co-worker started using an app called Cursor, an AI-centric port of Microsoft’s Visual Studio Code. I remember being amazed at how quickly he could pump out quality code. Logic and features that previously would have taken days to write were getting done in a fraction of the time. The day-to-day work of software development became less about _writing_ code than about _reviewing_ code. The split between front- and back-end development became fuzzier too: with coding agents able to handle implementation details, such specialization was no longer strictly necessary.

As AI code generation advanced, a wave of existential dread swept through the tech community. Developer Alex Kondov captures this sentiment in his December 2025 piece, [From Today, Programming is Dead](https://thethinkingbuilder.substack.com/p/from-today-programming-is-dead): “if there comes a time when my services are no longer needed, and software engineering remains an artifact of the past, then I’ll happily install drywall knowing I’ve done good work.” While it would seem extreme for every developer to be replaced by machines, AI is undeniably changing the nature of coding.

This brings us to the age of vibe coding.

## Vibe Coding

On February 2, 2025, AI researcher Andrej Karpathy coined the term vibe coding in a landmark [tweet](https://x.com/karpathy/status/1886192184808149383?s=20):

> There’s a new kind of coding I call “vibe coding”, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It’s possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like “decrease the padding on the sidebar by half” because I’m too lazy to find it. I “Accept All” always, I don’t read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I’d have to really read through it for a while. Sometimes the LLMs can’t fix a bug so I just work around it or ask for random changes until it goes away. It’s not too bad for throwaway weekend projects, but still quite amusing. I’m building a project or webapp, but it’s not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.

This was a fundamental change: having AI-written code that “mostly works” meant less need for human-written code.

In civil engineering, we talked about return periods: the average time between events such as windstorms, earthquakes, and floods. For example, you might design a structure to withstand a 1-in-50-year wind event, the kind of severe windstorm that only happens once every 50 years. Vibe coding seems like the kind of technological advancement that has a large return period—a change significant enough that it only happens once in many decades. We will discuss the implications of this soon, but first let’s revisit my Quotations app.

One benefit of vibe coding is that it has made it easier for back-burnered side projects to actually get made. The message here is that procrastination pays off: if you wait long enough, your digital projects will eventually take care of themselves. Kidding aside, let’s examine how capable coding agents have become.

Fiddling around this past winter, I asked a coding agent to port my neglected Quotations app from Wails to Swift, the native language for Apple software. Why not make a fully native app, instead of using a web-based framework stuffed inside a native wrapper?

Because I don’t know Swift, this would be a purer test of vibe coding than using a language I was familiar with. Almost all of my LLM use had been in web-development languages, where I have enough background to know if the generated code follows good patterns or not. I went in as blissfully ignorant of Swift syntax as possible.

(The irony of coding an app designed to increase knowledge retention in quotation memorization while attempting to minimize knowledge in another area—learning the Swift language—is not lost on me.)

I finalized the basic functionality of the app. Often, styles needed tweaking, newly added features contained bugs, or the app stopped compiling, which required further “steering” of the coding agent. In February 2026, Apple added support for chat-based coding agents in Xcode 26.3, giving an alternative interface to Cursor.

I kept adding new features, always by text prompting. One was a desktop widget that rotated through saved quotations. Curiously, deep-linking from the widget to the app (clicking on the current quotation in the widget should open it within the app) tripped up all the coding agents. I had to add some debug code inside the app to sort this out: log the incoming URI destination to see why it wasn’t opening the correct view. This is similar to JavaScript’s `console.log`. Always remember the basics.

I added features like semantic search and a word cloud[^4]. I have never been able to iterate so quickly before. This aspect of software development has not changed: you have an idea and build it with code, iterating and refining as you go. Whether the code was written by a human or a robot is immaterial. Even before the vibe coding age, it was said that coding is the easy part. Knowing _what_ to code is the real problem. How do you make and market a feature or app that people will want to use and benefit from?

[^4]: Semantic search is a wholly new way of searching: instead of simply comparing strings, it attempts to infer the contextual meaning behind a search phrase. This is done by a complicated mathematical process known as vector embedding. While slick as a computer science concept, the true test of semantic search is how well it actually works. In my app, it is of dubious utility, giving a scattered mix of appropriate and irrelevant results.

With inexpensive iteration, visual design is as important as ever: there is little excuse for bad-looking software now. I wanted my app to nod toward printed pages, without relying too heavily on skeuomorphism, like textured parchment backgrounds. I used a tan highlight colour sparingly, trying to make the app look like a good macOS citizen while also having its own unique style.

I’ve wondered how efficient—or not—to make the import process. Slow quotation importing, as with manual text entry, forces you to spend more time looking at each given quotation, lingering over its words (and thus promoting memorization), but friction in the user experience is rarely advisable. I think the best approach is to streamline importing while finding other ways of encouraging recall, like the desktop widget, chatbot, and semantic search.

I put many hours of work into this project despite rarely looking at the code. There is a flow state to be found in vibe coding, though it is different from the intense brown studies of manual coding. Agentic coding involves asking the agent to plan or perform a task, then waiting a few minutes for the task to complete; most of my tasks take no more than fifteen minutes. Similar to how one’s mind drifts at a stoplight—if you wait too long to start moving after the light turns green, people behind start honking—I find my focus shifting elsewhere while awaiting coding agents. It’s a different way of working, more distracted.

## Inflection Point

Long restricted to the domain of science fiction, artificial intelligence has now become a reality. Never in my wildest dreams did I imagine a computer would actually write code, a skill that took me years to master. Coding agents can increasingly write better code than humans too, unless you are doing something quite obscure that a model has not been trained on.

One of the effects of vibe coding has been to lower the barriers to entry for software development. No longer the exclusive domain of tech geeks, anyone can now access high-powered LLMs and write software themselves. What does this mean for developers? Let’s examine two other fields that underwent a similar reduction in barriers to entry: photography and cycling.

First, the democratization of photography. Despite everyone having a camera in their pocket, there remains a need for those who have mastered the craft of photography. We still need professionals like wedding and event photographers, photojournalists, and commercial or product photographers. Given similar equipment, an untrained photographer is unlikely to produce better results than a professional. Similarly, an expert trained in software development will produce better apps than an amateur, assuming similar access to coding agents.

Next is cycling. With the invention of e-bikes, the world of cycling opened up to a wider audience than ever before. After the inevitable gatekeeping by purists—_if you can’t pedal a bike under your own power, you shouldn’t be riding one_—the industry seems to have reached a state of equilibrium. E-bikes are here to stay. Trails are shared by e-bikers and non-e-bikers alike, with more people benefiting from outdoor exercise (points from me). Like e-bike motors, LLMs accelerate software development—but you still need to be able to steer and pedal the bike, while understanding that the consequences of crashes are more severe at higher speeds.

These analogies are not perfect, however. While many photographers prefer “real” cameras over mobile phones, and many bikers refuse to ride e-bikes altogether (like yours truly), AI’s adoption rates are unsurpassably high.

Almost everyone working in the knowledge economy will be impacted by AI. It’s hard to avoid: Internet searches, long the de facto means of accessing information, are now full of AI-generated results[^5]. AI can also help us complete computer-based tasks, as we’ve seen here with vibe coding, unlocking higher levels of productivity than before.

[^5]: Search results often come with disclaimers like “AI can make mistakes. Please double-check responses,” imploring users to verify cited sources. I find myself verifying such sources less and less, though. With so much of our information now coming from black-and-white chat interfaces, the visual design component of websites seems less relevant than before, something I can’t help but lament a little.

The waters become murkier when we look at AI fully automating jobs, however. One example of this is software localization (translation). In my day job, we need to offer our public-facing products in English and French. Professional translators used to perform this task, but AI is now at the point of being good enough to do it. What does this mean for a professional translator whose contracts dry up when all their clients use AI to meet their translation needs?

The notion of robots replacing human workers is not new. In Kurt Vonnegut’s eerily prescient 1952 debut novel _Player Piano_, he warns against unbounded technological advancement. Ten years after a third world war, society has become divided between the ruling upper-class engineers and managers, who oversee the running of automated factories, and the lower class, whose work has largely been replaced by machines.

The protagonist, Doctor Paul Proteus, a talented engineer, becomes disillusioned with his career and status: “Of late, his job, the system, and organizational politics had left him variously annoyed, bored, or queasy.”[^6] In a speech he writes, Paul considers how the Second Industrial Revolution devalued routine mental work, especially that of skilled machine operators. Paul and some other engineers had previously recorded a machinist’s actions via tape recording, the outcome of which was the loss of the machinist’s job.

[^6]: These _Player Piano_ quotations are the first ones coming from my Quotations app.

Katharine, Paul’s secretary, asks him if he thinks there will be a Third Industrial Revolution, in the same way that “the first and second ones must have been sort of inconceivable at one time.” Paul replies:

> “To the people who were going to be replaced by machines, maybe. … In a way, I guess the third one’s been going on for some time, if you mean thinking machines. That would be the third revolution, I guess—machines that devaluate human thinking. Some of the big computers like EPICAC [a fictional supercomputer that is “dead right about everything”] do that all right, in specialized fields.”
>
> “Uh-huh,” said Katharine thoughtfully. … “First the muscle work, then the routine work, then, maybe, the real brainwork.”
>
> “I hope I’m not around long enough to see that final step …”

Vonnegut’s prediction—machines doing “real brainwork”—is effectively here, seventy-odd years after he published the novel. He accurately foreshadowed the existential dread that would accompany computers having human-level intelligence (even if they are not yet “dead right about everything”).

Paul meets the Reverend James J. Lasher, a former minister, and they discuss work and purpose. Lasher had had a congregation before the war, explaining how he “used to tell them that the life of their spirit in relation to God was the biggest thing in their lives, and that their part in the economy was nothing by comparison.” After machines replaced most of the jobs of the working class, however, people found themselves without purpose. Lasher asserts that this loss of work is fundamentally undignifying:

> For generations they’ve been built up to worship competition and the market, productivity and economic usefulness, and the envy of their fellow men—and boom! it’s all yanked out from under them. They can’t participate, can’t be useful any more. Their whole culture’s been shot to hell. … These displaced people need something, and the clergy can’t give it to them—or it’s impossible for them to take what the clergy offers. The clergy says it’s enough, and so does the Bible. The people say it isn’t enough, and I suspect they’re right.

What worried Vonnegut was that unchecked capitalism and technological advancement would negatively impact society, especially those in the lower class. In creating machines to do all of our work, he feared, a sense of dignity and agency would be lost. His message seems as relevant today as it was when he first wrote _Player Piano_.

I recently attended [a lecture](https://www.youtube.com/live/Bt1YaHwYXYA?t=2518s) on AI and ethics by philosopher Meghan Sullivan from the University of Notre Dame. At a focus-group research meeting, a comment made by a software engineer stuck with her:

> You do realize there are only 300 to 400 people on planet Earth right now who matter. They’re the people who are building the frontier models and the vanishingly small number of political leaders that have the capacity to potentially regulate them. They’re the only people that matter. Everybody else—we’re just along for the ride.

Such a fatalistic attitude exemplifies the loss of dignity and agency Vonnegut warned about. Sullivan counters that we all have “little bits of political or economic agency” and that “absolutely everyone matters.”

Sullivan admits that “there are some pretty dire projections” about jobs getting replaced by AI. She explains that this raises not only economic questions but ethical ones, like if it is OK to selectively sacrifice certain segments of the economy—and such workers’ associated livelihoods—in order to unlock growth elsewhere. Sullivan argues that “there are aspects of work that are inherent to what it means to have a good life, … and [it’s] incumbent on us to build an economy where everybody has access to humanizing ways where they can be a part of the economy.” Such an outlook is surely a better ideal to aim toward than the ruthless maximization of economic output at all costs.

This isn’t the first time we’ve been warned about maximizing economic output, either. In Bertrand Russell’s famous 1932 essay, [In Praise of Idleness](https://harpers.org/archive/1932/10/in-praise-of-idleness/), he contends “that a great deal of harm is being done in the modern world by the belief in the virtuousness of _work_, and that the road to happiness and prosperity lies in an organized diminution of work.” Immediately following this is his oft-cited, blunt definition of work:

> Work is of two kinds: first, altering the position of matter at or near the earth’s surface relatively to other such matter; second, telling other people to do so. The first kind is unpleasant and ill paid; the second is pleasant and highly paid.

This equation has changed. Our digital knowledge economy is fundamentally about sending electrons through wires (to take a very reductionist view). If this wasn’t already easy enough compared to physical labour, we now have AI agents that can assist us in our digital tasks.

Russell[^7] argues that technological advancements should be used to reduce labour hours. Instead of working the same amount of hours with higher levels productivity, why not simply work _less_—at least enough to manufacture the necessary amount of goods for everyone to be comfortable—and have more leisure time. This would simultaneously solve the issue of many people being overworked while others are unemployed. He proposes four-hour workdays (one can dream). Imagine if we were to take the productivity gains achieved through AI and _not work_ with the surplus time gained, a modern realization of Russell’s “organized diminution of work.”

[^7]: It feels like I’m writing about myself in the third person.

The pace of AI model improvement over the last two years has left many of us with a feeling of whiplash. I’m not advocating that we should all become modern-day Luddites and oppose technological progress. I am suggesting, though, that we should carefully divide work done by machines and work done by humans, upholding the dignity of the latter.

## Final Words

Vibe coding helped me complete a quotation-management app I had neglected for years. Reading books and collecting quotations is a very time-consuming, manual process, the very antithesis of automation. Yet, such human-performed tasks will become increasingly important in the AI age. While some tasks can and should be automated, work in the humanities necessarily needs to retain a human touch.

In the pre-vibe-coding days of 2023, I argued in my piece [Intentional Inefficiency](/journal/intentional-inefficiency) that “an over-emphasis on productivity can ironically decrease it. In a culture that too easily leads to burnout, practicing intentional inefficiency can be a powerful antidote.” While AI may increase the pace at which digital content like code, images, and text can be _generated_ (to say nothing of tuning out all the AI slop now appearing), the pace at which we _consume_ such content cannot change nearly as drastically. AI won’t magically double your consumption rate: if you read ten books a year before, you’ll still read ten books a year now.

Instead of doomscrolling the latest AI headlines, your time could be better spent picking up a book. Reading, both a leisure pursuit and a means of learning new things, is one of the best ways of slowing down, a countermeasure to the increasingly frenetic pace of modern life. To engage with words and ideas that are the product of someone else’s thinking has been one of the greatest pleasures of my life.

And now I finally have an app to manage all my quotations.
