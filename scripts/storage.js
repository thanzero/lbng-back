'use strict';
const fs = require('fs');
if (!fs.existsSync('./client/storage')) {
    console.info('path ./client/storage doesn\'t exist. let\'s create it');
    if (!fs.existsSync('./client')) {
        fs.mkdirSync('./client');
    }
    fs.mkdirSync('./client/storage');
    if (fs.existsSync('./client/storage')) { // final check
        console.info('Storage folder created successfuly');
    } else {
        console.error('Problem creating storage folder');
    }
}
