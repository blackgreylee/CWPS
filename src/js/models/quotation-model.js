/*
==================================================

 CWPS Enterprise

 Quotation Model

 Sprint:
 2.0.10

 Description:
 Supplier Quotation Entity

==================================================
*/

(function (global) {

    "use strict";


    class Quotation {


        constructor(data = {}) {


            this.id =
                data.id || crypto.randomUUID();



            // 供應商
            this.supplierId =
                data.supplierId || null;



            // 專案
            this.projectId =
                data.projectId || null;



            // 採購需求
            this.requirementId =
                data.requirementId || null;



            // 報價編號
            this.code =
                data.code || "";



            // 報價版本
            this.version =
                Number(data.version ?? 1);



            // 報價日期
            this.quoteDate =
                data.quoteDate ||

                new Date().toISOString();



            // 有效日期
            this.validUntil =
                data.validUntil || null;



            // 報價狀態
            this.status =

                data.status ||

                CWPSTypes.QuotationStatus.DRAFT;



            // 報價明細
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
         * 新增報價項目
         */
        addItem(item) {


            const quotationItem = {


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


                remark:
                    item.remark || ""


            };


            this.items.push(quotationItem);


            this.calculateTotal();


            this.touch();


        }



        /**
         * 移除項目
         */
        removeItem(index) {


            this.items.splice(index, 1);


            this.calculateTotal();


            this.touch();


        }



        /**
         * 計算總價
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
         * 採用報價
         */
        approve() {


            this.status =

                CWPSTypes.QuotationStatus.APPROVED;


            this.touch();


        }



        /**
         * 作廢
         */
        cancel() {


            this.status =

                CWPSTypes.QuotationStatus.CANCELLED;


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


                supplierId:
                    this.supplierId,


                projectId:
                    this.projectId,


                requirementId:
                    this.requirementId,


                code:
                    this.code,


                version:
                    this.version,


                quoteDate:
                    this.quoteDate,


                validUntil:
                    this.validUntil,


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



    global.Quotation = Quotation;



})(window);
