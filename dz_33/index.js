//Task 1
const path = require('path');
const fs = require('fs');

// const dir_18_name = path.join(__dirname, '18.00');
// const dir_20_name = path.join(__dirname, '20.00');
//
// moveStudentFromDir(dir_18_name, dir_20_name, 'male');
// moveStudentFromDir(dir_20_name, dir_18_name, 'female');
//
// function moveStudentFromDir(dirName, destination, genderCriteria) {
//     fs.readdir(dirName, (err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//
//         for (const file of files) {
//             moveStudents(dirName, destination, file, genderCriteria);
//         }
//     });
// }
//
// function moveStudents(oldDir, NewDir, studentName, genderCriteria) {
//     let currentStudentPath = path.join(oldDir, studentName);
//     let currentStudent = require(currentStudentPath);
//
//     if (currentStudent.gender === genderCriteria) {
//         let newStudentPath = path.join(NewDir, studentName)
//         fs.rename(currentStudentPath, newStudentPath, err => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// }
//Task 2
const garbageDir = path.join(__dirname, 'Garbage');
const destinationDir = path.join(__dirname, 'significantInfo')
moveFiles(garbageDir);

function moveFiles(currentPath) {
    fs.readdir(currentPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        for (const file of files) {
            const fileName = path.join(currentPath, file);
            fs.stat(fileName, (err, stats) => {
                if (stats.isDirectory()) {
                    moveFiles(fileName);
                    fs.rmdir(fileName, { recursive: true }, err1 => {
                        if (err1) {
                            console.log(err1);
                        }
                    });
                }
                else {
                    fs.rename(fileName, path.join(destinationDir, file), err => {
                        if (err) {
                            console.log(error);
                        }
                    });
                }
            })
        }
    })
}
