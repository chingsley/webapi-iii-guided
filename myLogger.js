const myLogger = (args) => {
    if (Array.isArray(args)) {
        console.log('\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        for (let i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n')
    } else {
        throw new TypeError('function myLogger expects an array as argument');
    }
};

module.exports = { myLogger };