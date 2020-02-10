import { writable } from 'svelte/store';

function createTimeStore() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		set,
		rewindRight () {
			update(function (store) {
				return store += 5;
			});
		},
		rewindLeft () {
			update(function (store) {
				return store -= 5;
			})
		}
	};
}

function createDurationStore() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		set
	};
}

function createVolumeStore () {
	const { subscribe, set, update } = writable({
		value: localStorage.volume || 0.5,
		isDisabled: false
	});

	return {
		subscribe,
		set,
		increment () {
			update(function (store) {
				store.value = (store.value + 0.1 > 1) ? 1 : store.value + 0.1;
				localStorage.volume = store.value;
				return store;
			});
		},
		decrement () {
			update(function (store) {
				store.value =  (store.value - 0.1 < 0) ? 0 : store.value - 0.1;
				localStorage.volume = store.value;
				return store;
			});
		},
		toggleVolume () {
			update(function (store) {
				store.value = store.isDisabled ? localStorage.volume : 0;
				store.isDisabled = !store.isDisabled;
				return store;
			});
		},
		input (volume) {
			update(function (store) {
				store.value = volume;
				localStorage.volume = volume;
				return store;
			});
		}
	};
}

function createPausedStore () {
	const { subscribe, set, update } = writable(true);

	return {
		subscribe,
		set,
		toggle () {
			update(paused => !paused);
		}
	};
}

function createUIStore () {
	const { subscribe, set, update } = writable({
		isWide: false,
		isFullScreen: false,

		showControlsTimeout: undefined,
		showControls: false,

		playerContainer: undefined
	});

	return {
		subscribe,
		set,
		toggleFullScreen() {
			update(function (store) {
				store.isFullScreen
					? document.exitFullscreen().catch(err => Promise.resolve(err))
					: store.playerContainer.requestFullscreen();

				store.isFullScreen = !store.isFullScreen;
				return store;
			});
		},
		toggleWideScreen () {
			update(function (store) {
				store.isWide = !store.isWide;
				return store;
			});
		},
		toggleControls() {
			update(function (store) {
				clearTimeout(store.showControlsTimeout);
				store.showControlsTimeout = setTimeout(() => {
					update(function (store) {
						store.showControls = false;
						return store;
					});
				}, 2500);
				store.showControls = true;

				return store;
			});
		}
	};
}

export const time = createTimeStore();
export const duration = createDurationStore();
export const volume = createVolumeStore();
export const paused = createPausedStore();
export const UI = createUIStore();
