import {writable} from 'svelte/store';

function createVideosStore() {
	const { subscribe, set, update } = writable({
		files: [],
		currentVideo: undefined,
		index: 0
	});


	return {
		subscribe,
		set,
		save (videos) {
			update(store => {
				if (!videos) return store;

				store.files = videos;
				store.currentVideo = store.files[store.index];

				return store;
			});
		},
		next () {
			update(store => {
				if (store.index + 1 > store.files.length) return store;

				store.index += 1;
				store.currentVideo = store.files[store.index];

				return store;
			});
		},
		previous () {
			update(store => {
				if (store.index - 1 < 0) return store;

				store.index -= 1;
				store.currentVideo = store.files[store.index];

				return store;
			});
		},
		catchError () {
			update(store => {
				store.files = store.files.splice(store.index - 1, 1);
				return store;
			});
		}
	};
}

export const videos = createVideosStore();