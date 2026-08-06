/*
==================================================

 CWPS Enterprise

 Requirement Model

 Sprint:
 2.0.9

 Description:
 Procurement Requirement Entity

==================================================
*/

(function (global) {

    "use strict";


    class Requirement {


        constructor(data = {}) {


            this.id = data.id || crypto.randomUUID();



            // 所屬專案
            this.projectId =
                data.projectId || null;



            // 所屬批次
            this.batchId =
                data.batchId || null;



            // BOM Node
            this.nodeId =
                data.nodeId || null;



            // 材料
            this.materialId =
                data.materialId || null;



            // 需求編號
            this.code =
                data.code || "";



            // 材料名稱（快照）
            /*
                避免 Material 修改後
                影響歷史需求
            */
            this.materialName =
                data.materialName || "";



            // 規格快照
            this.specification =
                data.specification || "";



            // 需求數量
            this.quantity =
                Number(data.quantity ?? 0);



            // 單位
            this.unit =
                data.unit ||

                CWPSTypes.UnitType.PCS;



            // 重量
            this.weight =
                Number(data.weight ?? 0);



            // 預估單價
            this.estimatedUnitPrice =
                Number(
                    data.estimatedUnitPrice ?? 0
                );



            // 預估金額
            this.estimatedAmount =
                Number(
                    data.estimatedAmount ?? 0
                );



            // 狀態
            this.status =
                data.status ||

                CWPSTypes.RequirementStatus.PENDING;



            // 是否已轉詢價
            this.isQuoted =
                data.isQuoted ?? false;



            // 備註
            this.remark =
                data.remark || "";



            // 擴充資料
            this.attributes =
                data.attributes || {};



            this.createdAt =
                data.createdAt ||

                new Date().toISOString();



            this.updatedAt =
                data.updatedAt ||

                new Date().toISOString();


        }



        /**
         * 計算預估金額
         */
        calculateAmount() {


            this.estimatedAmount =

                this.quantity *

                this.estimatedUnitPrice;


            this.touch();


            return this.estimatedAmount;


        }



        /**
         * 更新數量
         */
        updateQuantity(quantity) {


            this.quantity =
                Number(quantity);


            this.calculateAmount();


        }



        /**
         * 設定價格
         */
        setUnitPrice(price) {


            this.estimatedUnitPrice =
                Number(price);


            this.calculateAmount();


        }



        /**
         * 標記已詢價
         */
        markQuoted() {


            this.isQuoted = true;


            this.status =

                CWPSTypes.RequirementStatus.GENERATED;


            this.touch();


        }



        /**
         * 更新狀態
         */
        setStatus(status) {


            this.status = status;


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


                id: this.id,


                projectId:
                    this.projectId,


                batchId:
                    this.batchId,


                nodeId:
                    this.nodeId,


                materialId:
                    this.materialId,


                code:
                    this.code,


                materialName:
                    this.materialName,


                specification:
                    this.specification,


                quantity:
                    this.quantity,


                unit:
                    this.unit,


                weight:
                    this.weight,


                estimatedUnitPrice:
                    this.estimatedUnitPrice,


                estimatedAmount:
                    this.estimatedAmount,


                status:
                    this.status,


                isQuoted:
                    this.isQuoted,


                remark:
                    this.remark,


                attributes:
                    this.attributes,


                createdAt:
                    this.createdAt,


                updatedAt:
                    this.updatedAt



            };


        }



    }



    global.Requirement = Requirement;



})(window);
