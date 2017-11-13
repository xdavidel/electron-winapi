const ffi = require('ffi');
const ref = require('ref');
const { WORD, DWORD, DWORD_PTR, LPVOID, IntPtr, LPTSTR, LPBYTE, HANDLE, BOOL } = require('./types')
const { SystemInfo, StartupInfo, SecurityAttributes, ProcessInformation, DebugEvent } = require('./structs')

const INFINITE = 0xFFFFFFFF;

const kernel32 = new ffi.Library("Kernel32", {
    "OpenProcess": ["int32", ["ulong", "byte", "ulong"]],
    "GetSystemInfo": ["void", [ref.refType(SystemInfo)]],
    "GetStartupInfoA": ["void", [ref.refType(StartupInfo)]],
    "CreateProcessA": [BOOL,
        ["CString",
            ref.refType(LPTSTR),
            ref.refType(SecurityAttributes),
            ref.refType(SecurityAttributes),
            BOOL,
            DWORD,
            DWORD,
            ref.types.CString,
            StartupInfo,
            ref.refType(ProcessInformation)
        ]],
    "WaitForDebugEventEx": [BOOL, [ref.refType(DebugEvent), DWORD]],
    "ContinueDebugEvent": [BOOL, [DWORD, DWORD, DWORD]],
    "GetLastError": [DWORD, []],
    "CloseHandle": [BOOL, [HANDLE]],
    "DebugActiveProcess": [BOOL, [DWORD]]

});


module.exports = {
    openProcess: (processId) => {
        return kernel32.OpenProcess(2097151, 0, processId);
    },
    getSystemInfo: () => {
        let info = ref.alloc(SystemInfo);
        kernel32.GetSystemInfo(info);
        return info.deref();
    },
    getStartupInfo: () => {
        let pStartupInfo = ref.alloc(StartupInfo);
        kernel32.GetStartupInfoA(pStartupInfo);
        return pStartupInfo.deref();
    },
    createProcess: (filePath, startupInfo) => {
        let pProcessInformation = ref.alloc(ProcessInformation);
        let pCommandLine = null//ref.alloc(ref.types.CString);
        let ok = kernel32.CreateProcessA(filePath, pCommandLine, null, null, false, 0x1 + 0x2, null, null, startupInfo, pProcessInformation);
        return {
            isOk: ok,
            processInformation: pProcessInformation.deref()
        }
    },
    waitForDebugEvent: () => {
        let pDebugEvent = ref.alloc(DebugEvent);
        let ok = kernel32.WaitForDebugEventEx(pDebugEvent, INFINITE);
        return {
            isOk: ok,
            debugEvent: pDebugEvent.deref()
        }
    },
    continueDebugEvent: (processId, threadId, debugStatus) => {
        return kernel32.ContinueDebugEvent(processId, threadId, debugStatus);
    },
    getLastError: () => {
        return kernel32.GetLastError();
    },
    closeHandle: (handle) => {
        return kernel32.CloseHandle(handle)
    },
    debugActiveProcess: (processId) => {
        return kernel32.DebugActiveProcess(processId);
    }

}