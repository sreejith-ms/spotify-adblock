const currentHost = window.location.host;
const domNode = document.getElementsByClassName('track-info__name ellipsis-one-line')[0];
const callback = (mutationsList, observer) => {
	const audioStatus = document.querySelectorAll('.volume-bar button')[0].getAttribute('aria-label');
	if (audioStatus === 'Unmute') {
		toggleMute();
	}
	mutationsList.forEach(mutation => {
		console.log('changes', mutation);
		let url = mutation.target.getAttribute('href');
		if (url === null || url === undefined) {
			const anchorElement = mutation.target.getElementsByTagName('a');
			if (anchorElement.length) {
				url = anchorElement[0].href;
			}
		}
		console.log('url', url);
		if (!url || (url.includes('https://') && !url.includes(currentHost))) {
			toggleMute();
			document.querySelectorAll('.volume-bar')[0].classList.remove('volume-bar--disabled');
		}
	});
};
const toggleMute = () => document.querySelectorAll('.volume-bar button')[0].click();
const observer = new MutationObserver(callback);
observer.observe(domNode, { attributes: true, childList: true, subtree: true });
