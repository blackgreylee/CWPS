/*
==================================================

 CWPS Enterprise

 Material Model

 Sprint:
 2.0.3

 Description:
 Material Master Entity

==================================================
*/

(function (global) {
    "use strict";

    class Material {

        constructor(data = {}) {

            this.id = data.id || crypto.randomUUID();

            // 材料代碼（唯一）
            this.code = data.code || "";

            // 材料名稱
            this.name = data.name || "";

            // 材料分類
            this.type = data.type || CWPSTypes.MaterialType.OTHER;

            // 基本單位
            this.unit = data.unit || CWPSTypes.UnitType.PCS;

            // 預設損耗率（%）
            this.lossRate = Number(data.lossRate ?? 0);

            // 預設採購單價（可由報價覆蓋）
            this.defaultUnitPrice = Number(data.defaultUnitPrice ?? 0);

            // 材料規格（例如：6063-T5、10mm、SUS304）
            this.specification = data.specification || "";

            // 材質
            this.grade = data.grade || "";

            // 品牌
            this.brand = data.brand || "";

            // 備註
            this.remark = data.remark || "";

            // 是否啟用
            this.isActive = data.isActive ?? true;

            // 建立時間
            this.createdAt = data.createdAt || new Date().toISOString();

            // 更新時間
            this.updatedAt = data.updatedAt || new Date().toISOString();
        }

        activate() {

            this.isActive = true;

            this.updatedAt = new Date().toISOString();
        }

        deactivate() {

            this.isActive = false;

            this.updatedAt = new Date().toISOString();
        }

        updatePrice(price) {

            this.defaultUnitPrice = Number(price);

            this.updatedAt = new Date().toISOString();
        }

        toJSON() {

            return {

                id: this.id,

                code: this.code,

                name: this.name,

                type: this.type,

                unit: this.unit,

                lossRate: this.lossRate,

                defaultUnitPrice: this.defaultUnitPrice,

                specification: this.specification,

                grade: this.grade,

                brand: this.brand,

                remark: this.remark,

                isActive: this.isActive,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.Material = Material;

})(window);
