const ffi = require('ffi');
const ref = require('ref');

const user32 = new ffi.Library("user32", {
    "FindWindowA": ["uint32", ["string", "string"]],
    "GetWindowThreadProcessId": ["int32", ['int32', 'pointer']]
});

module.exports = {
    findWindow: (windowName) => {
        return user32.FindWindowA(null, windowName);
    },
    getWindowThreadProcessId: (wind) => {
        let outPid = ref.alloc('int');
        let threadId = user32.GetWindowThreadProcessId(wind, outPid);
        return {
            threadId: threadId,
            processId: outPid.deref()
        }
    }
}