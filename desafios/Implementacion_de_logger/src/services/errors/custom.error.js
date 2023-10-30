
class CustomError {
    static create({ name = "Error", cause, message, code = 1}, callbackNext) {
        const error = new Error(message);
        error.name = name;
        error.code = code;
        error.cause = cause ? new Error(cause) : null;

        callbackNext(error);
    }
}
export default CustomError;