"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalService = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = __importDefault(require("node-fetch"));
let PaypalService = class PaypalService {
    constructor() {
        this.base = 'https://api-m.sandbox.paypal.com';
        this.clientId = process.env.PAYPAL_CLIENT_ID;
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    }
    async generateAccessToken() {
        try {
            if (!this.clientId || !this.clientSecret) {
                throw new Error("MISSING_API_CREDENTIALS");
            }
            const auth = Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64");
            const response = await (0, node_fetch_1.default)(`${this.base}/v1/oauth2/token`, {
                method: "POST",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });
            const data = await response.json();
            return data.access_token;
        }
        catch (error) {
            console.error("Failed to generate Access Token:", error);
        }
    }
    async createOrder(cart) {
        console.log("----------------");
        console.log("--------CREATE ORDER SERVICE--------");
        console.log("----------------");
        console.log("shopping cart information passed from the frontend createOrder() callback:", cart);
        const accessToken = await this.generateAccessToken();
        console.log("Access Token:", accessToken);
        const url = `${this.base}/v2/checkout/orders`;
        const response = await (0, node_fetch_1.default)(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(cart),
        });
        console.log('createOrder response', await response.clone().json());
        return response.json();
    }
    async getApprovalLink(orderID) {
        return `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
    }
    async completeOrder(orderID) {
        console.log("----------------");
        console.log("--------COMPLETE ORDER SERVICE--------");
        console.log("----------------");
        const accessToken = await this.generateAccessToken();
        const url = `${this.base}/v2/checkout/orders/${orderID}/capture`;
        console.log('Order ID:', orderID);
        const response = await (0, node_fetch_1.default)(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log('completeOrder response', await response.clone().json());
        return response.json();
    }
};
exports.PaypalService = PaypalService;
exports.PaypalService = PaypalService = __decorate([
    (0, common_1.Injectable)()
], PaypalService);
//# sourceMappingURL=paypal.service.js.map