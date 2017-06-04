export default () => {
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		console.log('Starting service worker...');
		navigator.serviceWorker.register('/github-profiler/service-worker.js', {scope: './'})
			.then((reg) => {
				console.log('Done. Now you\'re running offline.');
				reg.onupdatefound = () => {
					console.log('Updating service worker...');
					const installingWorker = reg.installing;
					installingWorker.onstatechange = () => {
						if (installingWorker.state === 'installed' && navigator.serviceWorker && navigator.serviceWorker.controller) {
							console.log('Done! Reloading page...');
							window.location.reload();
						}
					};
				};
			})
			.catch((err) => {
				console.log(err);
			});
	}
};
