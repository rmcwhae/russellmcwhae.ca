import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		target: 'body',
		amp: false,
		adapter: adapter(),
		vite: () => ({})
	}
};

