let PROCESSOR_ARCHITECTUR = {

    9: "x64 (AMD or Intel)",
    5: "ARM",
    6: "Intel Itanium-based",
    0: "x86",
    0xffff: "Unknown"
}

let DEBUG_EVENT_CODES = {
    /**
     * Reports a create-process debugging event. 
     * The value of u.CreateProcessInfo specifies a CREATE_PROCESS_DEBUG_INFO structure.
     */
    "CREATE_PROCESS_DEBUG_EVENT": 3,
    /**
     * Reports a create-thread debugging event. 
     * The value of u.CreateThread specifies a CREATE_THREAD_DEBUG_INFO structure.
     */
    "CREATE_THREAD_DEBUG_EVENT": 2,
    /**
     * Reports an exception debugging event. 
     * The value of u.Exception specifies an EXCEPTION_DEBUG_INFO structure.
     */
    "EXCEPTION_DEBUG_EVENT": 1,
    /**
     * Reports an exit-process debugging event. 
     * The value of u.ExitProcess specifies an EXIT_PROCESS_DEBUG_INFO structure.
     */
    "EXIT_PROCESS_DEBUG_EVENT": 5,
    /**
     * Reports an exit-thread debugging event. 
     * The value of u.ExitThread specifies an EXIT_THREAD_DEBUG_INFO structure.
     */
    "EXIT_THREAD_DEBUG_EVENT": 4,
    /**
     * Reports a load-dynamic-link-library (DLL) debugging event. 
     * The value of u.LoadDll specifies a LOAD_DLL_DEBUG_INFO structure.
     */
    "LOAD_DLL_DEBUG_EVENT": 6,
    /**
     * Reports an output-debugging-string debugging event. 
     * The value of u.DebugString specifies an OUTPUT_DEBUG_STRING_INFO structure.
     */
    "OUTPUT_DEBUG_STRING_EVENT": 8,
    /**
     * Reports a RIP-debugging event (system debugging error). 
     * The value of u.RipInfo specifies a RIP_INFO structure.
     */
    "RIP_EVENT": 9,
    /**
     * Reports an unload-DLL debugging event. 
     * The value of u.UnloadDll specifies an UNLOAD_DLL_DEBUG_INFO structure.
     */
    "UNLOAD_DLL_DEBUG_EVENT": 7
}

let DEBUG_CONTINUE_STATUS = {
    /**
     * If the thread specified by the dwThreadId parameter previously reported an EXCEPTION_DEBUG_EVENT debugging event, the function 
     * stops all exception processing and continues the thread and the exception is marked as handled.
     * For any other debugging event, this flag simply continues the thread.
     */
    "DBG_CONTINUE": 0x00010002,
    /**
     * If the thread specified by dwThreadId previously reported an EXCEPTION_DEBUG_EVENT debugging event, the function continues exception processing. 
     * If this is a first-chance exception event, the search and dispatch logic of the structured exception handler is used; otherwise, the process is terminated. 
     * For any other debugging event, this flag simply continues the thread.
     */
    "DBG_EXCEPTION_NOT_HANDLED": 0x80010001,
    /**
     * Supported in Windows 10, version 1507 or above, this flag causes dwThreadId to replay the existing breaking event after the target continues. 
     * By calling the SuspendThread API against dwThreadId, a debugger can resume other threads in the process and later return to the breaking.
     */
    "DBG_REPLY_LATER": 0x40010001
}

let EXCEPTION_CODES = {
    /**
     * The thread tried to read from or write to a virtual address for which it does not have the appropriate access.
     */
    "EXCEPTION_ACCESS_VIOLATION": 1,
    /**
     * The thread tried to access an array element that is out of bounds and the underlying hardware supports bounds checking.
     */
    "EXCEPTION_ARRAY_BOUNDS_EXCEEDED": 2,
    /**
     * A breakpoint was encountered.
     */
    "EXCEPTION_BREAKPOINT": 3,
    /**
     * The thread tried to read or write data that is misaligned on hardware that does not provide alignment.
     * For example, 16-bit values must be aligned on 2-byte boundaries; 32-bit values on 4-byte boundaries, and so on.
     */
    "EXCEPTION_DATATYPE_MISALIGNMENT": 4,
    /**
     * One of the operands in a floating-point operation is denormal.
     * A denormal value is one that is too small to represent as a standard floating-point value.
     */
    "EXCEPTION_FLT_DENORMAL_OPERAND": 5,
    /**
     * The thread tried to divide a floating-point value by a floating-point divisor of zero.
     */
    "EXCEPTION_FLT_DIVIDE_BY_ZERO": 6,
    /**
     * The result of a floating-point operation cannot be represented exactly as a decimal fraction.
     */
    "EXCEPTION_FLT_INEXACT_RESULT": 7,
    /**
     * This exception represents any floating-point exception not included in this list.
     */
    "EXCEPTION_FLT_INVALID_OPERATION": 8,
    /**
     * The exponent of a floating-point operation is greater than the magnitude allowed by the corresponding type.
     */
    "EXCEPTION_FLT_OVERFLOW": 9,
    /**
     * The stack overflowed or underflowed as the result of a floating-point operation.
     */
    "EXCEPTION_FLT_STACK_CHECK": 10,
    /**
     * The exponent of a floating-point operation is less than the magnitude allowed by the corresponding type.
     */
    "EXCEPTION_FLT_UNDERFLOW": 11,
    /**
     * The thread tried to execute an invalid instruction.
     */
    "EXCEPTION_ILLEGAL_INSTRUCTION": 12,
    /**
     * The thread tried to access a page that was not present, and the system was unable to load the page.
     * For example, this exception might occur if a network connection is lost while running a program over the network.
     */
    "EXCEPTION_IN_PAGE_ERROR": 13,
    /**
     * The thread tried to divide an integer value by an integer divisor of zero.
     */
    "EXCEPTION_INT_DIVIDE_BY_ZERO": 14,
    /**
     * The result of an integer operation caused a carry out of the most significant bit of the result.
     */
    "EXCEPTION_INT_OVERFLOW": 15,
    /**
     * An exception handler returned an invalid disposition to the exception dispatcher. 
     * Programmers using a high-level language such as C should never encounter this exception.
     */
    "EXCEPTION_INVALID_DISPOSITION": 16,
    /**
     * The thread tried to continue execution after a noncontinuable exception occurred.
     */
    "EXCEPTION_NONCONTINUABLE_EXCEPTION": 17,
    /**
     * The thread tried to execute an instruction whose operation is not allowed in the current machine mode.
     */
    "EXCEPTION_PRIV_INSTRUCTION": 18,
    /**
     * A trace trap or other single-instruction mechanism signaled that one instruction has been executed.
     */
    "EXCEPTION_SINGLE_STEP": 19,
    /**
     * The thread used up its stack.
     */
    "EXCEPTION_STACK_OVERFLOW": 20
}


module.exports.PROCESSOR_ARCHITECTUR = PROCESSOR_ARCHITECTUR;
module.exports.DEBUG_EVENT_CODES = DEBUG_EVENT_CODES;
module.exports.DEBUG_CONTINUE_STATUS = DEBUG_CONTINUE_STATUS;
module.exports.EXCEPTION_CODES = EXCEPTION_CODES;
