export default () => {
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		console.log('Starting service worker...');
		navigator.serviceWorker.register('/github-profiler/service-worker.js', {scope: './'})
			.then(() => {
				console.log('Done. Now you\'re running offline.');
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
