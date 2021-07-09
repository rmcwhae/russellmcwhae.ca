export function createTitle(filename) {
	filename = filename.substring(0, filename.indexOf('_'));
	return filename.replace(/-/g, ' ');
}

export function extractDate(filename) {
	return filename.substring(filename.indexOf('_') + 1).replace('-', ' ');
}
