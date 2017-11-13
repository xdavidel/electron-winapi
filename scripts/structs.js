const ffi = require('ffi');
const { WORD, DWORD, DWORD_PTR, LPVOID, IntPtr, LPTSTR, LPBYTE, HANDLE, BOOL } = require('./types')
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

let SecurityAttributes = Struct({
    "nLength": DWORD,
    "lpSecurityDescriptor": LPVOID,
    "bInheritHandle": BOOL
})

let ProcessInformation = Struct({
    "hProcess": HANDLE,
    "hThread": HANDLE,
    "dwProcessId": DWORD,
    "dwThreadId": DWORD
})

let ExceptionRecord = Struct({
    "exceptionCode": DWORD,
    "exceptionFlags": DWORD,
    "exceptionRecordPtr": DWORD,
    "exceptionAddress": DWORD,
    "numberParameters": DWORD,
    "exceptionInformationPtr": DWORD
})

let MoreInfo = Struct({
    "exception": ExceptionRecord,
    "dwFirstChance": DWORD
})

let DebugEvent = Struct({
    "dwDebugEventCode": DWORD,
    "dwProcessId": DWORD,
    "dwThreadId": DWORD,
    "moreInfo": MoreInfo
})

module.exports.SystemInfo = SystemInfo;

module.exports.StartupInfo = StartupInfo;

module.exports.SecurityAttributes = SecurityAttributes;

module.exports.ProcessInformation = ProcessInformation;

module.exports.ExceptionRecord = ExceptionRecord;

module.exports.MoreInfo = MoreInfo;

module.exports.DebugEvent = DebugEvent;