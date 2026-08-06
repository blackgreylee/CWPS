/*
==================================================

 CWPS Enterprise

 Batch Version Model

 Sprint:
 2.0.5

 Description:
 Batch BOM Version Entity

==================================================
*/

(function (global) {
    "use strict";

    class BatchVersion {

        constructor(data = {}) {

            this.id = data.id || crypto.randomUUID();

            // 所屬 Batch
            this.batchId = data.batchId || null;

            // Version 編號
            this.versionNo = Number(data.versionNo ?? 1);

            // 顯示名稱
            this.name = data.name || `Version ${this.versionNo}`;

            // 狀態
            this.status = data.status || CWPSTypes.VersionStatus.DRAFT;

            // 是否為目前版本
            this.isCurrent = data.isCurrent ?? false;

            // 匯入來源
            this.source = data.source || "";

            // 匯入時間
            this.importedAt = data.importedAt || new Date().toISOString();

            // 建立者
            this.createdBy = data.createdBy || "";

            // 備註
            this.remark = data.remark || "";

            // BOM Root Node ID
            this.rootNodeId = data.rootNodeId || null;

            // 版本資訊
            this.createdAt = data.createdAt || new Date().toISOString();

            this.updatedAt = data.updatedAt || new Date().toISOString();

        }

        /**
         * 設為目前版本
         */
        setCurrent() {

            this.isCurrent = true;

            this.touch();

        }

        /**
         * 取消目前版本
         */
        unsetCurrent() {

            this.isCurrent = false;

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
         * 更新備註
         */
        setRemark(remark) {

            this.remark = remark;

            this.touch();

        }

        /**
         * 更新 Root Node
         */
        setRootNode(rootNodeId) {

            this.rootNodeId = rootNodeId;

            this.touch();

        }

        /**
         * 更新時間
         */
        touch() {

            this.updatedAt = new Date().toISOString();

        }

        /**
         * JSON
         */
        toJSON() {

            return {

                id: this.id,

                batchId: this.batchId,

                versionNo: this.versionNo,

                name: this.name,

                status: this.status,

                isCurrent: this.isCurrent,

                source: this.source,

                importedAt: this.importedAt,

                createdBy: this.createdBy,

                remark: this.remark,

                rootNodeId: this.rootNodeId,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.BatchVersion = BatchVersion;

})(window);
