/*
==================================================

 CWPS Enterprise

 Material Usage Model

 Sprint:
 2.0.4

 Description:
 Material Usage Entity

==================================================
*/

(function (global) {
    "use strict";

    class MaterialUsage {

        constructor(data = {}) {

            this.id = data.id || crypto.randomUUID();

            // 關聯 Material Master
            this.materialId = data.materialId || null;

            // 關聯 BOMNode
            this.nodeId = data.nodeId || null;

            // 使用數量
            this.quantity = Number(data.quantity ?? 1);

            // 使用單位
            this.unit = data.unit || CWPSTypes.UnitType.PCS;

            // 長度
            this.length = Number(data.length ?? 0);

            // 寬度
            this.width = Number(data.width ?? 0);

            // 高度
            this.height = Number(data.height ?? 0);

            // 面積
            this.area = Number(data.area ?? 0);

            // 體積
            this.volume = Number(data.volume ?? 0);

            // 重量
            this.weight = Number(data.weight ?? 0);

            // 損耗率（可覆蓋 Material 預設值）
            this.lossRate = Number(data.lossRate ?? 0);

            // 表面處理
            this.finish = data.finish || "";

            // 顏色
            this.color = data.color || "";

            // 備註
            this.remark = data.remark || "";

            // 擴充屬性
            this.attributes = data.attributes || {};

            this.createdAt = data.createdAt || new Date().toISOString();

            this.updatedAt = data.updatedAt || new Date().toISOString();

        }

        /**
         * 含損耗後數量
         */
        getRequiredQuantity() {

            return this.quantity * (1 + this.lossRate / 100);

        }

        /**
         * 更新重量
         */
        updateWeight(weight) {

            this.weight = Number(weight);

            this.updatedAt = new Date().toISOString();

        }

        /**
         * 更新尺寸
         */
        updateDimension(length, width, height = 0) {

            this.length = Number(length);

            this.width = Number(width);

            this.height = Number(height);

            this.updatedAt = new Date().toISOString();

        }

        /**
         * 更新表面處理
         */
        updateFinish(finish) {

            this.finish = finish;

            this.updatedAt = new Date().toISOString();

        }

        /**
         * JSON
         */
        toJSON() {

            return {

                id: this.id,

                materialId: this.materialId,

                nodeId: this.nodeId,

                quantity: this.quantity,

                unit: this.unit,

                length: this.length,

                width: this.width,

                height: this.height,

                area: this.area,

                volume: this.volume,

                weight: this.weight,

                lossRate: this.lossRate,

                finish: this.finish,

                color: this.color,

                remark: this.remark,

                attributes: this.attributes,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.MaterialUsage = MaterialUsage;

})(window);
