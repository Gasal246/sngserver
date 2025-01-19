"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneClient = void 0;
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const getOneClient = async (req, res) => {
    try {
        const client = await services_1.clientService.getClientById(req.params.id);
        if (!client) {
            const data = (0, helpers_1.formatResponse)(400, true, helpers_1.Message.NOT_FOUND, null);
            res.status(400).json(data);
            return;
        }
        const data = (0, helpers_1.formatResponse)(200, false, "User detail.", { list: client });
        res.status(200).json(data);
        return;
    }
    catch (e) {
        const data = (0, helpers_1.formatResponse)(500, true, e.message, null);
        res.status(500).json(data);
        return;
    }
};
exports.getOneClient = getOneClient;
//# sourceMappingURL=get-client.js.map