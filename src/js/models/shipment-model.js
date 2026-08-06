/*
==================================================

 CWPS Enterprise

 Shipment Model

 Sprint:
 2.0.13

 Description:
 Material Shipment Entity

==================================================
*/

(function (global) {

    "use strict";


    class Shipment {


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



            // 出貨編號
            this.code =
                data.code || "";



            // 出貨日期
            this.shipDate =

                data.shipDate ||

                null;



            // 預計到貨日期
            this.expectedArrivalDate =

                data.expectedArrivalDate ||

                null;



            // 實際到貨日期
            this.actualArrivalDate =

                data.actualArrivalDate ||

                null;



            // 狀態
            this.status =

                data.status ||

                CWPSTypes.ShipmentStatus.PENDING;



            // 出貨明細
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


                        receivedQuantity:
                            Number(
                                item.receivedQuantity ?? 0
                            ),


                        unit:
                            item.unit || "",


                        remark:
                            item.remark || ""


                    }));


            }



            // 驗收備註
            this.acceptanceRemark =

                data.acceptanceRemark || "";



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
         * 新增出貨項目
         */
        addItem(item) {


            this.items.push({


                materialId:
                    item.materialId || null,


                materialName:
                    item.materialName || "",


                specification:
                    item.specification || "",


                quantity:
                    Number(item.quantity ?? 0),


                receivedQuantity:
                    0,


                unit:
                    item.unit || "",


                remark:
                    item.remark || ""


            });



            this.touch();


        }



        /**
         * 更新收貨數量
         */
        receive(
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
         * 開始運送
         */
        ship() {


            this.status =

                CWPSTypes.ShipmentStatus.SHIPPED;



            this.shipDate =

                new Date().toISOString();



            this.touch();


        }



        /**
         * 到貨
         */
        arrive() {


            this.status =

                CWPSTypes.ShipmentStatus.ARRIVED;



            this.actualArrivalDate =

                new Date().toISOString();



            this.touch();


        }



        /**
         * 驗收完成
         */
        completeAcceptance(
            remark = ""
        ) {


            this.status =

                CWPSTypes.ShipmentStatus.ACCEPTED;



            this.acceptanceRemark =

                remark;



            this.touch();


        }



        /**
         * 取消
         */
        cancel() {


            this.status =

                CWPSTypes.ShipmentStatus.CANCELLED;



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


                code:
                    this.code,


                shipDate:
                    this.shipDate,


                expectedArrivalDate:
                    this.expectedArrivalDate,


                actualArrivalDate:
                    this.actualArrivalDate,


                status:
                    this.status,


                items:
                    this.items,


                acceptanceRemark:
                    this.acceptanceRemark,


                remark:
                    this.remark,


                createdAt:
                    this.createdAt,


                updatedAt:
                    this.updatedAt



            };


        }



    }



    global.Shipment = Shipment;



})(window);
