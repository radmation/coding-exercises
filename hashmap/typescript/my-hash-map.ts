type Entry<K, V> = {
    key: K,
    value: V
}

class HashMap<K extends string | number, V> {
    private buckets: Array<Array<Entry<K, V>>>;

    constructor(capacity: number = 16) {
        // Same as this: this.buckets = Array(capacity).fill(null);
        this.buckets = Array.from(
            { length: capacity },
            () => []
        );
    }

    private hash(key: K): number {
        const text = String(key); // cast to string
        let hash = 0;

        for (let i = 0; i < text.length; i++) {
            hash = (hash * 31 + text.charCodeAt(i));
            hash = hash >>> 0; // Convert to unsigned integer
        }

        return hash % this.buckets.length;
    }

    /**
     * set()
     *
     * @param key
     * @param value
     *
     * Calculate the bucket index for the key.
     * Retrieve the bucket at that index.
     * Search the bucket for an entry with the same key.
     * If found, update its value and return.
     * Otherwise, append a new key-value entry.
     *
     * TODO: If there is a key set, and the value changes, lets implement a way where update or delete first needs to be called.
     */
    set(key: K, value: V): void {

        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        bucket.push({key: key, value: value});
    }

    /**
     *
     * @param key
     */
    get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }

        return undefined;
    }

    has(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        return bucket.some(entry => entry.key === key);
    }

    delete(key: K): boolean {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        const entryIndex = bucket.findIndex(entry => entry.key === key);

        if (entryIndex === -1) {
            return false;
        }

        bucket.splice(entryIndex, 1);

        return true;
    }
}