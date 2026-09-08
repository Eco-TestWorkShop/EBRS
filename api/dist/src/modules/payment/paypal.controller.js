"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalController = void 0;
const common_1 = require("@nestjs/common");
const paypal_service_1 = require("./paypal.service");
let PaypalController = class PaypalController {
    constructor(paypalService) {
        this.paypalService = paypalService;
    }
    getTest() {
        return 'Order Path working!';
    }
    async createOrder(cart) {
        console.log("----------------");
        console.log("--------CREATE ORDER CONTROLER--------");
        console.log("----------------");
        console.log('create_order cart', cart);
        console.log('create_order value', cart.purchase_units[0].amount);
        if (!cart.purchase_units[0].amount.value) {
            console.log('Missing amount value.');
            throw new common_1.HttpException('Missing amount value.', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.paypalService.createOrder(cart);
            console.log('result create_order', result);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create order.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async complete_order(cart) {
        console.log("----------------");
        console.log("--------COMPLETE ORDER CONTROLER--------");
        console.log("----------------");
        try {
            console.log('complete_order cart', cart);
            const result = await this.paypalService.completeOrder(cart);
            console.log('result complete_order', result);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create order.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async captureOrder(orderID) {
        try {
            const result = await this.paypalService.completeOrder(orderID);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to capture order.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PaypalController = PaypalController;
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], PaypalController.prototype, "getTest", null);
__decorate([
    (0, common_1.Post)('/create_order'),
    __param(0, (0, common_1.Body)('cart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('/complete_order'),
    __param(0, (0, common_1.Body)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "complete_order", null);
__decorate([
    (0, common_1.Post)(':orderID/capture'),
    __param(0, (0, common_1.Param)('orderID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "captureOrder", null);
exports.PaypalController = PaypalController = __decorate([
    (0, common_1.Controller)('/orders'),
    __metadata("design:paramtypes", [paypal_service_1.PaypalService])
], PaypalController);
//# sourceMappingURL=paypal.controller.js.map