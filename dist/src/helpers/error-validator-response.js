"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidatorResponse = void 0;
const errorValidatorResponse = (details) => {
    const validationObject = {};
    for (let index = 0; index < details.length; index++) {
        const v = details[index];
        validationObject[v.path[0]] = v.message.replace(/"/g, "");
    }
    return validationObject;
};
exports.errorValidatorResponse = errorValidatorResponse;
//# sourceMappingURL=error-validator-response.js.map