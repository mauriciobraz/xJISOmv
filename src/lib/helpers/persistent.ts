import { writable, get } from 'svelte/store';

export function persistent<T extends object>(key: string, data: T) {
	const store = writable(data);

	/**
	 * Subscribe to this store.
	 * @param callback Callback that creates a subscription
	 */
	function subscribe(callback: (store: T) => T) {
		return store.subscribe(callback);
	}

	/**
	 * Update value and inform subscribers.
	 * @param callback Callback that returns updated value
	 */
	function update(callback: (store: T) => T) {
		const updatedStore = callback(get(store));
		store.set(updatedStore);

		if (typeof window !== 'undefined')
			localStorage[key] = JSON.stringify(updatedStore);
	}

	/**
	 * Set value and inform subscribers.
	 * @param value Value to set
	 */
	function set(value: T) {
		store.set(value);

		if (typeof window !== 'undefined')
			localStorage[key] = JSON.stringify(value);
	}

	if (typeof window !== 'undefined')
		if (localStorage[key]) set(JSON.parse(localStorage[key]));

	return {
		subscribe,
		update,
		set,
	};
}
