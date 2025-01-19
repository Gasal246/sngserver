"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = (status, error, message, data) => {
    return {
        status: status,
        error: error,
        message: message,
        data: data,
    };
};
exports.formatResponse = formatResponse;
//# sourceMappingURL=format-response.js.map