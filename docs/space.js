(function (window, document, data, undefined) {
	window.CreateFloatingEmote = () => {
		const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (noMotion.matches) {
			return;
		}

		const gimmickElement = document.getElementById('gimmick');
		const emojiData = data.fun.emoji[Math.floor(Math.random() * data.fun.emoji.length)];
		const size = (Math.random() * (Math.random() > 0.99 ? 20 : 2)) + 1;
		const opacity = size > 4 ? 0.75 : (Math.min(2, size - 1) / 2 * 0.3 + Math.random() * 0.2 + 0.1);

		let emote = document.createElement('img');
		emote.className = 'emote floating-emote';
		emote.src = `/emote/${emojiData[0]}.png`;
		emote.style.width = `${size}em`;
		emote.style.height = `${size}em`;
		emote.style.top = `${Math.random() * 120 - 10}vh`;
		emote.style.animationDelay = `${Math.random() * 2.5}s,0s`;
		emote.style.animationDuration = `${(Math.random() - 0.5) * 2 + 5}s,${(Math.random() - 0.5) * 5 + 30}s`;
		emote.style.opacity = opacity;
		emote.addEventListener('animationend', () => {
			emote.remove();
		});

		gimmickElement.appendChild(emote);
	}

	document.addEventListener('DOMContentLoaded', () => {
		const neptune = document.getElementById('mask');
		neptune.addEventListener('click', CreateFloatingEmote);
		neptune.addEventListener('keypress', CreateFloatingEmote);

		const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

		if (!noMotion.matches) {
			const special = setInterval(() => {
				if (!document.hasFocus()) {
					return;
				}

				if (Math.random() < data.fun.rate || location.search == '?emotetest') {
					CreateFloatingEmote();
				}
			}, location.search == '?emotetest' ? 100 : data.fun.interval);

			noMotion.addEventListener('change', () => {
				if (noMotion.matches) {
					clearInterval(special);
				}
			})
		}
	});
})(window, window.document, window.NEPTUNE, undefined);
