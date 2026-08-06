/*
==================================================

 CWPS Enterprise

 Batch Model

 Sprint:
 2.0.6

 Description:
 Project Batch Entity

==================================================
*/

(function (global) {

    "use strict";

    class Batch {

        constructor(data = {}) {

            this.id = data.id || crypto.randomUUID();

            // 所屬 Project
            this.projectId = data.projectId || null;

            // 批次編號
            this.code = data.code || "";

            // 批次名稱
            this.name = data.name || "";

            // 批次狀態
            this.status =
                data.status ||
                CWPSTypes.BatchStatus.DRAFT;

            // 所有版本
            this.versions = [];

            if (Array.isArray(data.versions)) {

                this.versions = data.versions.map(version =>

                    version instanceof BatchVersion
                        ? version
                        : new BatchVersion(version)

                );

            }

            // 目前版本 ID
            this.currentVersionId =
                data.currentVersionId || null;

            // 備註
            this.remark = data.remark || "";

            this.createdAt =
                data.createdAt ||
                new Date().toISOString();

            this.updatedAt =
                data.updatedAt ||
                new Date().toISOString();

        }

        /**
         * 新增 Version
         */
        addVersion(version) {

            if (!(version instanceof BatchVersion)) {

                version = new BatchVersion(version);

            }

            version.batchId = this.id;

            this.versions.push(version);

            if (version.isCurrent) {

                this.setCurrentVersion(version.id);

            }

            this.touch();

            return version;

        }

        /**
         * 取得 Version
         */
        getVersion(versionId) {

            return this.versions.find(

                version => version.id === versionId

            ) || null;

        }

        /**
         * 設定目前 Version
         */
        setCurrentVersion(versionId) {

            this.currentVersionId = versionId;

            this.versions.forEach(version => {

                version.isCurrent =
                    version.id === versionId;

            });

            this.touch();

        }

        /**
         * 取得目前 Version
         */
        getCurrentVersion() {

            return this.getVersion(

                this.currentVersionId

            );

        }

        /**
         * 刪除 Version
         */
        removeVersion(versionId) {

            this.versions = this.versions.filter(

                version => version.id !== versionId

            );

            if (this.currentVersionId === versionId) {

                this.currentVersionId = null;

            }

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

                projectId: this.projectId,

                code: this.code,

                name: this.name,

                status: this.status,

                currentVersionId:
                    this.currentVersionId,

                versions:

                    this.versions.map(

                        version => version.toJSON()

                    ),

                remark: this.remark,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.Batch = Batch;

})(window);
