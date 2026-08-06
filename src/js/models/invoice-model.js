/*
==================================================

 CWPS Enterprise

 Invoice Model

 Sprint:
 2.0.12

 Description:
 Supplier Invoice Entity

==================================================
*/

(function (global) {

    "use strict";


    class Invoice {


        constructor(data = {}) {


            this.id =
                data.id || crypto.randomUUID();



            // 專案
            this.projectId =
                data.projectId || null;



            // 供應商
            this.supplierId =
                data.supplierId || null;



            // 採購單
            this.purchaseId =
                data.purchaseId || null;



            // 發票號碼
            this.invoiceNo =
                data.invoiceNo || "";



            // 發票日期
            this.invoiceDate =

                data.invoiceDate ||

                new Date().toISOString();



            // 發票類型
            this.type =

                data.type ||

                CWPSTypes.InvoiceType.NORMAL;



            // 未稅金額
            this.subtotal =

                Number(data.subtotal ?? 0);



            // 稅率
            this.taxRate =

                Number(data.taxRate ?? 5);



            // 稅額
            this.taxAmount =

                Number(data.taxAmount ?? 0);



            // 含稅總額
            this.totalAmount =

                Number(data.totalAmount ?? 0);



            // 發票狀態
            this.status =

                data.status ||

                CWPSTypes.InvoiceStatus.PENDING;



            // 發票明細

            this.items = [];



            if (Array.isArray(data.items)) {


                this.items =

                    data.items.map(item => ({


                        materialId:
                            item.materialId || null,


                        materialName:
                            item.materialName || "",


                        quantity:
                            Number(item.quantity ?? 0),


                        unit:
                            item.unit || "",


                        amount:
                            Number(item.amount ?? 0),


                        remark:
                            item.remark || ""


                    }));


            }



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
         * 新增發票項目
         */
        addItem(item) {


            this.items.push({


                materialId:
                    item.materialId || null,


                materialName:
                    item.materialName || "",


                quantity:
                    Number(item.quantity ?? 0),


                unit:
                    item.unit || "",


                amount:
                    Number(item.amount ?? 0),


                remark:
                    item.remark || ""


            });



            this.calculateAmount();


            this.touch();


        }



        /**
         * 計算金額
         */
        calculateAmount() {


            this.subtotal =

                this.items.reduce(

                    (sum, item) =>

                        sum + item.amount,


                    0

                );



            this.taxAmount =

                this.subtotal *

                (this.taxRate / 100);



            this.totalAmount =

                this.subtotal +

                this.taxAmount;



            return this.totalAmount;


        }



        /**
         * 設定稅率
         */
        setTaxRate(rate) {


            this.taxRate =

                Number(rate);



            this.calculateAmount();



            this.touch();


        }



        /**
         * 審核通過
         */
        approve() {


            this.status =

                CWPSTypes.InvoiceStatus.APPROVED;



            this.touch();


        }



        /**
         * 已付款
         */
        markPaid() {


            this.status =

                CWPSTypes.InvoiceStatus.PAID;



            this.touch();


        }



        /**
         * 作廢
         */
        cancel() {


            this.status =

                CWPSTypes.InvoiceStatus.CANCELLED;



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


                purchaseId:
                    this.purchaseId,


                invoiceNo:
                    this.invoiceNo,


                invoiceDate:
                    this.invoiceDate,


                type:
                    this.type,


                subtotal:
                    this.subtotal,


                taxRate:
                    this.taxRate,


                taxAmount:
                    this.taxAmount,


                totalAmount:
                    this.totalAmount,


                status:
                    this.status,


                items:
                    this.items,


                remark:
                    this.remark,


                createdAt:
                    this.createdAt,


                updatedAt:
                    this.updatedAt



            };


        }



    }



    global.Invoice = Invoice;



})(window);
