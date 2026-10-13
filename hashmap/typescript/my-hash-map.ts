type Entry<K, V> = {
    key: K,
    value: V
}

export class HashMap<K extends string | number, V> {
    private buckets: Array<Array<Entry<K, V>>>;
    private count = 0;

    private readonly maxLoadFactor = 0.75;

    constructor(capacity: number = 16) {
        if (!Number.isInteger(capacity) || capacity < 1) {
            throw new Error("Capacity must be a positive integer");
        }
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
            // TODO: Should we parameterize the 31?
            hash = (hash * 31 + text.charCodeAt(i));
            hash = hash >>> 0; // Convert to unsigned integer
        }

        return hash % this.buckets.length;
    }

    private resize(newCapacity: number): void {
        const oldBuckets = this.buckets;

        this.buckets = Array.from(
            { length: newCapacity },
            () => []
        );

        for (const bucket of oldBuckets) {
            for (const entry of bucket) {
                const newIndex = this.hash(entry.key);
                this.buckets[newIndex].push(entry);
            }
        }
    }

    get size(): number {
        return this.count;
    }

    /**
     * set()
     *
     * Calculate the bucket index for the key.
     * Retrieve the bucket at that index.
     * Search the bucket for an entry with the same key.
     * If found, update its value and return.
     * Otherwise, append a new key-value entry.
     * Update our count to keep track of items in hashmap.
     * Resize if our bucket gets "too full", hard coded to 75%.
     *
     * TODO: If there is a key set, and the value changes, lets implement a way where update or delete first needs to be called.
     */
    set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Update an exiting entry's value by key.
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        // Insert new entry.
        bucket.push({key: key, value: value});

        // Increment our count. Keep track of items in hashmap.
        this.count++;

        // Resize at 75% capacity. Double capacity.
        if (this.count / this.buckets.length > 0.75) {
            this.resize(this.buckets.length * 2);
        }
    }

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
        this.count--; // Decrement our count.

        return true;
    }
}