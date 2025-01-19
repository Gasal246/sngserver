"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getUsers = async (req, res) => {
    try {
        const keyword = req.query.keyword ? req.query.keyword.toString() : "";
        const users = await services_1.userRegisterService.userSearchWithKeyword(keyword);
        if (!users || !users.length) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "User details.", { list: users });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=get-user.js.map