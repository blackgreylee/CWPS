/*
==================================================

 CWPS Enterprise

 Purchase Model

 Sprint:
 2.0.11

 Description:
 Purchase Order Entity

==================================================
*/

(function (global) {

    "use strict";


    class Purchase {


        constructor(data = {}) {


            this.id =
                data.id || crypto.randomUUID();



            // 專案
            this.projectId =
                data.projectId || null;



            // 供應商
            this.supplierId =
                data.supplierId || null;



            // 採購編號
            this.code =
                data.code || "";



            // 關聯需求
            this.requirementIds =

                Array.isArray(data.requirementIds)

                    ? data.requirementIds

                    : [];



            // 關聯報價
            this.quotationId =
                data.quotationId || null;



            // 採購日期
            this.purchaseDate =

                data.purchaseDate ||

                new Date().toISOString();



            // 預計交期
            this.expectedDeliveryDate =

                data.expectedDeliveryDate || null;



            // 狀態
            this.status =

                data.status ||

                CWPSTypes.PurchaseStatus.DRAFT;



            // 明細
            this.items = [];



            if (Array.isArray(data.items)) {


                this.items =

                    data.items.map(item => ({


                        materialId:
                            item.materialId || null,


                        materialName:
                            item.materialName || "",


                        specification:
                            item.specification || "",


                        quantity:
                            Number(item.quantity ?? 0),


                        unit:
                            item.unit || "",


                        unitPrice:
                            Number(item.unitPrice ?? 0),


                        amount:
                            Number(item.amount ?? 0),


                        receivedQuantity:
                            Number(
                                item.receivedQuantity ?? 0
                            ),


                        remark:
                            item.remark || ""


                    }));


            }



            // 總金額
            this.totalAmount =

                Number(data.totalAmount ?? 0);



            // 備註
            this.remark =
                data.remark || "";



            this.createdAt =

                data.createdAt ||

                new Date().toISOString();



            this.updatedAt =

                data.updatedAt ||

                new Date().toISOString();


        }



        /**
         * 新增採購項目
         */
        addItem(item) {


            const purchaseItem = {


                materialId:
                    item.materialId || null,


                materialName:
                    item.materialName || "",


                specification:
                    item.specification || "",


                quantity:
                    Number(item.quantity ?? 0),


                unit:
                    item.unit || "",


                unitPrice:
                    Number(item.unitPrice ?? 0),


                amount:

                    Number(item.quantity ?? 0) *

                    Number(item.unitPrice ?? 0),


                receivedQuantity:
                    0,


                remark:
                    item.remark || ""


            };


            this.items.push(purchaseItem);


            this.calculateTotal();


            this.touch();


        }



        /**
         * 計算採購金額
         */
        calculateTotal() {


            this.totalAmount =

                this.items.reduce(

                    (sum, item) =>

                        sum + item.amount,


                    0

                );


            return this.totalAmount;


        }



        /**
         * 更新收貨數量
         */
        updateReceivedQuantity(
            materialId,
            quantity
        ) {


            const item =

                this.items.find(

                    item =>

                        item.materialId === materialId

                );



            if (item) {


                item.receivedQuantity =

                    Number(quantity);


            }



            this.touch();


        }



        /**
         * 發出採購
         */
        issue() {


            this.status =

                CWPSTypes.PurchaseStatus.ISSUED;


            this.touch();


        }



        /**
         * 完成採購
         */
        complete() {


            this.status =

                CWPSTypes.PurchaseStatus.COMPLETED;


            this.touch();


        }



        /**
         * 取消
         */
        cancel() {


            this.status =

                CWPSTypes.PurchaseStatus.CANCELLED;


            this.touch();


        }



        /**
         * 更新時間
         */
        touch() {


            this.updatedAt =

                new Date().toISOString();


        }



        /**
         * JSON
         */
        toJSON() {


            return {


                id:
                    this.id,


                projectId:
                    this.projectId,


                supplierId:
                    this.supplierId,


                code:
                    this.code,


                requirementIds:
                    this.requirementIds,


                quotationId:
                    this.quotationId,


                purchaseDate:
                    this.purchaseDate,


                expectedDeliveryDate:
                    this.expectedDeliveryDate,


                status:
                    this.status,


                items:
                    this.items,


                totalAmount:
                    this.totalAmount,


                remark:
                    this.remark,


                createdAt:
                    this.createdAt,


                updatedAt:
                    this.updatedAt



            };


        }



    }



    global.Purchase = Purchase;



})(window);
