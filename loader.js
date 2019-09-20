var fs = require('fs');

var globalConfig = require('./config');

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig.webpath);

for (var i = 0 ; i < files.length ; i++) {
    var temp = require(`./${globalConfig.webpath}/${files[i]}`);

    if(temp.path) {
        for (var [key,value] of temp.path) {
            pathMap.set(key,value);
        }
    } else {
        throw new Error(`url path 异常：${temp.path}`)
    }

    controllerSet.push(temp);
}
module.exports = pathMap;