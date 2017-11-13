const ref = require('ref');
const Struct = require('ref-struct');


module.exports.WORD = ref.types.uint16;
module.exports.DWORD = ref.types.uint32;


module.exports.LPVOID = ref.refType(ref.types.void);
// module.exports.LPVOID = ref.types.void;
// module.exports.DWORD_PTR = ref.refType(ref.types.int32);
module.exports.DWORD_PTR = ref.types.uint32;
// module.exports.IntPtr = ref.refType(ref.types.int32);
module.exports.IntPtr = ref.types.uint32;
// module.exports.LPTSTR = ref.refType(ref.types.CString);
module.exports.LPTSTR = ref.types.CString;
// module.exports.LPBYTE = ref.refType(ref.types.byte);
module.exports.LPBYTE = ref.types.byte;
// module.exports.HANDLE = ref.refType(ref.types.int32);
module.exports.HANDLE = ref.types.uint32;

module.exports.BOOL = ref.types.bool;