const files = require.context('.',false,/\.js$/);

let configRouters = [];

files.keys().forEach(key => {
    if(key === './vest.js') return
    configRouters = configRouters.concat(files(key).default)
})

console.dir(files)
console.log('keys',files.keys())
console.log('id',files.id)
console.log('resolve',files.resolve(files.keys()[0]))
console.log('module',files(files.keys()[0]))
console.log('configRouters',configRouters)

export default configRouters