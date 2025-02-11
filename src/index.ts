import dotenv from "dotenv";
import {app} from "./server";
import {dbConnect} from "./functions/dbFunctions";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "8080", 10);

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server connected on port http://localhost:${PORT}`);
});






















// Create a class that accepts a string and returns the reversed string - using a decorator

//Decorator has 3 parameters - 1st (target) hold reference to the prototype of the class, 2nd ()
// function split(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]){
//         const [arg] = args
//         const argSplit = arg.split('');
//         return originalMethod.apply(this, [argSplit]);
//     }
// }

// function reverse(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]){
//         const [arg] = args
//         const argReversed = arg.reverse();
//         return originalMethod.apply(this, [argReversed]);
//     }
// }


// function join(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]){
//         const [arg] = args
//         const argJoined = arg.join('');
//         return originalMethod.apply(this, [argJoined]);
//     }
// }

// class StringManager {
//     @split
//     @reverse
//     @join
//     print(str: string) {
//         console.log(str)
//     }
// }

// const stringManager = new StringManager()
// stringManager.print('hello');


// // Write a function that will reverse an input string

// function reverseString(str: string): string {
//     return str.split('').reverse().join('');
// }

// console.log(reverseString("hello"));


// // Find the first non-repeating character in a string

// function firstUniqueChar(str: string): string | null {
//     const charCount = new Map<string, number>();
//     for (const char of str){
//         charCount.set(char,  (charCount.get(char) || 0) + 1);
//     }
//     for (const char of str){
//         if (charCount.get(char) === 1) return char;
//     }
//     return null;
// }

// console.log(firstUniqueChar("leetcode"));


// // Check if two words are anagrams

// function isAnagram(s1: string, s2: string): boolean {
//     return s1.split('').sort().join('') === s2.split('').sort().join('');
// }

// console.log(isAnagram("listen", "silent")); // return true

/* 
SYSTEM DESIGN QUESTIONS
*/

// How would you design a URL shortening service like Bit.ly?

/* 
Database: Store short_url → original_url mappings.
Hashing Algorithm: Generate unique short URLs (Base62).
Caching: Use Redis for fast lookups.
Rate Limiting: Prevent abuse using API throttling.
*/

// How would you design a real-time chat application

/*
WebSockets (Socket.io) for real-time communication.
Database: Store messages in PostgreSQL or MongoDB.
Scalability: Use Redis pub/sub to sync messages across servers.
*/