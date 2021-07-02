<script>
	const calendars = [
		{
			year: 2021,
			filename: '2021calendar.pdf',
			image: '.jpg',
			filesize: 2
		},
		{
			year: 2020,
			filename: '2020calendar.pdf',
			image: '.jpg',
			filesize: 2
		},
		{
			year: 2019,
			filename: '2019calendar.pdf',
			image: '.jpg',
			filesize: 2
		},
		{
			year: 2018,
			filename: '2018calendar.pdf',
			image: '.jpg',
			filesize: 2
		},
		{
			year: 2017,
			filename: '2017calendar.pdf',
			image: '.jpg',
			filesize: 1
		},
		{
			year: 2016,
			filename: '2016calendar.pdf',
			image: '.jpg',
			filesize: 7
		},
		{
			year: 2015,
			filename: '2015calendar.pdf',
			image: '.jpg',
			filesize: 2
		}
	];
	const [current, ...rest] = calendars;
</script>

<h1>Calendars</h1>

<h2>
	<a href={'pdf/' + current.filename} target="_blank" rel="noopener noreferrer nofollow"
		>{current.year}</a
	>
</h2>

<h3>Previous Calendars</h3>

{#each rest as calendar}
	<li>
		<a href={'pdf/' + calendar.filename} target="_blank" rel="noopener noreferrer nofollow"
			>{calendar.year}</a
		>
		({calendar.filesize} MB PDF)
	</li>
{/each}

<p>
	Initially created as Christmas gifts for family and friends, these calendars are an effort to do
	more with my photography. It’s hard to stand out in the crowded, high-volume world of online
	photography, so printing can be a way to make photography less ephemeral. Calendars provide a
	high-density collection of photographs in an affordable physical product.
</p>
<p>
	I design the calendars in Adobe Indesign with the <a
		href="http://calendarwizard.sourceforge.net"
		target="_blank"
		rel="noopener noreferrer nofollow">Calendar Wizard</a
	>
	plugin to create the basic table layout before heavy customization. There’s a steep learning curve,
	but the result is highly original. I then send a print-ready PDF to
	<a href="https://www.dhq.ca" target="_blank" rel="noopener noreferrer nofollow"
		>Digital Headquarters Imaging Centre</a
	> for printing and binding.
</p>

<style>
	/* your styles go here */
</style>
