// практичне
// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');
//
// users = [
//     { name: 'olya', gender: 'female', age: 21 },
//     { name: 'igor', gender: 'male', age: 19 },
//     { name: 'petro', gender: 'female', age: 14 },
//     { name: 'vasya', gender: 'male', age: 22 },
//     { name: 'anna', gender: 'female', age: 222 },
//     { name: 'bohdan', gender: 'male', age: 30 },
//     { name: 'taras', gender: 'female', age: 13 },
//     { name: 'ivan', gender: 'male', age: 15 },
//     { name: 'sasha', gender: 'female', age: 77 },
//     { name: 'oleksiy', gender: 'male', age: 26 },
// ];
//
// for (const user of users) {
//     const filePath = path.join(__dirname, 'users');
//     writeUser(filePath, user);
// }
//
// async function writeUser(filePath, user) {
//     try {
//         fsPromises.writeFile(path.join(filePath, user.name), JSON.stringify(user));
//     } catch (e) {
//         console.log(e);
//     }
// }
const file = fs.createReadStream(path.join(__dirname,'data.txt'));
console.log(file)
file.on('data', chunk => {
    console.log(chunk, file);
})
