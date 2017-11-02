const ffi = require('ffi');
const ref = require('ref');
const { WORD, DWORD, DWORD_PTR, LPVOID, IntPtr, LPTSTR, LPBYTE, HANDLE } = require('./types')
const Struct = require('ref-struct');

let SystemInfo = Struct({
    'wProcessorArchitecture': WORD,
    'wReserved': WORD,
    'dwPageSize': DWORD,
    'lpMinimumApplicationAddress': DWORD,
    'lpMaximumApplicationAddress': DWORD,
    'dwActiveProcessorMask': DWORD,
    'dwNumberOfProcessors': DWORD,
    'dwProcessorType': DWORD,
    'dwAllocationGranularity': DWORD,
    'dwProcessorLevel': WORD,
    'dwProcessorRevision': WORD
});
let SystemInfoPtr = ref.refType(SystemInfo);

let StartupInfo = Struct({
    "cb": DWORD,
    "lpReserved": LPTSTR,
    "lpDesktop": LPTSTR,
    "lpTitle": LPTSTR,
    "dwX": DWORD,
    "dwY": DWORD,
    "dwXSize": DWORD,
    "dwYSize": DWORD,
    "dwXCountChars": DWORD,
    "dwYCountChars": DWORD,
    "dwFillAttribute": DWORD,
    "dwFlags": DWORD,
    "wShowWindow": WORD,
    "cbReserved2": WORD,
    "lpReserved2": LPBYTE,
    "hStdInput": HANDLE,
    "hStdOutput": HANDLE,
    "hStdError": HANDLE
})
let StartupInfoPtr = ref.refType(StartupInfo);


let SecurityAttributes = Struct({
    "nLength": DWORD,
    "lpSecurityDescriptor": LPVOID,
    "bInheritHandle": ref.types.bool
})
let SecurityAttributesPtr = ref.refType(SecurityAttributes);

let ProcessInformation = Struct({
    "hProcess": IntPtr,
    "hThread": IntPtr,
    "dwProcessId": ref.types.uint,
    "dwThreadId": ref.types.uint
})
let ProcessInformationPtr = ref.refType(ProcessInformation);

const kernel32 = new ffi.Library("Kernel32", {
    "OpenProcess": ["int32", ["ulong", "byte", "ulong"]],
    "GetSystemInfo": ["void", [SystemInfoPtr]],
    "GetStartupInfoA": ["void", [StartupInfoPtr]],
    "CreateProcessA": ["bool", ["CString", LPTSTR, SecurityAttributesPtr, SecurityAttributesPtr, "bool", DWORD, DWORD, "CString", StartupInfo, ProcessInformationPtr]]
});


module.exports = {
    openProcess: (processId) => {
        return kernel32.OpenProcess(2097151, 0, processId);
    },
    getSystemInfo: () => {
        // let info = ref.alloc(SystemInfoPtr);
        let info = ref.alloc(SystemInfo);
        kernel32.GetSystemInfo(info);
        return info.deref();
    },
    getStartupInfo: () => {
        let info = ref.alloc(StartupInfo);
        kernel32.GetStartupInfoA(info);
        return info.deref();
    },
    createProcess: (filePath, startupInfo) => {
        let processInformation = ref.alloc(ProcessInformation);
        let ok = kernel32.CreateProcessA(filePath, null, null, null, false, 0x00000001 + 0x00000002, 0, null, startupInfo, processInformation);
        return {
            isOk: ok,
            processInformation: processInformation
        }
    }

}