import {HashMap} from "./my-hash-map.ts";


type User = {
    name: string;
    age: number;
};

const users = new HashMap<number, User>();

users.set(101, { name: "Alice", age: 25 });
users.set(102, { name: "Bob", age: 30 });
users.set(103, { name: "Charlie", age: 35 });

console.log(users.get(102));
// { name: "Bob", age: 30 }

console.log(users.has(101));
// true

console.log(users.size);
// 3

users.set(102, { name: "Bob", age: 31 });

console.log(users.get(102));
// { name: "Bob", age: 31 }

console.log(users.size);
// 3 — updating doesn't add a new entry

users.delete(101);

console.log(users.has(101));
// false

console.log(users.size);