/*
==================================================

 CWPS Enterprise

 BOM Node Model

 Sprint:
 2.0.2

 Description:
 Enterprise BOM Tree Node

==================================================
*/

(function (global) {
    "use strict";

    class BOMNode {

        constructor(data = {}) {

            this.id = data.id || crypto.randomUUID();

            // 上層節點
            this.parentId = data.parentId || null;

            // 所屬 Project
            this.projectId = data.projectId || null;

            // 所屬 Batch
            this.batchId = data.batchId || null;

            // BOM Version
            this.versionId = data.versionId || null;

            // 節點型別
            this.type = data.type || CWPSTypes.NodeType.PART;

            // 圖號 / 編號
            this.code = data.code || "";

            // 名稱
            this.name = data.name || "";

            // 數量
            this.quantity = Number(data.quantity ?? 1);

            // 單位
            this.unit = data.unit || "";

            // 子節點
            this.children = [];

            if (Array.isArray(data.children)) {

                this.children = data.children.map(item =>
                    item instanceof BOMNode ? item : new BOMNode(item)
                );

            }

            // 掛載的材料使用資訊
            this.materialUsages = [];

            if (Array.isArray(data.materialUsages)) {

                this.materialUsages = data.materialUsages.slice();

            }

            // 自訂屬性
            this.attributes = data.attributes || {};

            this.createdAt = data.createdAt || new Date().toISOString();

            this.updatedAt = data.updatedAt || new Date().toISOString();

        }

        /**
         * 新增子節點
         */
        addChild(node) {

            if (!(node instanceof BOMNode)) {

                node = new BOMNode(node);

            }

            node.parentId = this.id;

            this.children.push(node);

            this.touch();

            return node;

        }

        /**
         * 移除子節點
         */
        removeChild(nodeId) {

            this.children = this.children.filter(

                child => child.id !== nodeId

            );

            this.touch();

        }

        /**
         * 新增 MaterialUsage
         */
        addMaterialUsage(materialUsage) {

            this.materialUsages.push(materialUsage);

            this.touch();

        }

        /**
         * 移除 MaterialUsage
         */
        removeMaterialUsage(materialUsageId) {

            this.materialUsages = this.materialUsages.filter(

                item => item.id !== materialUsageId

            );

            this.touch();

        }

        /**
         * 遞迴搜尋節點
         */
        find(nodeId) {

            if (this.id === nodeId) {

                return this;

            }

            for (const child of this.children) {

                const result = child.find(nodeId);

                if (result) {

                    return result;

                }

            }

            return null;

        }

        /**
         * 深度優先走訪
         */
        traverse(callback) {

            callback(this);

            this.children.forEach(child => {

                child.traverse(callback);

            });

        }

        /**
         * 取得全部子節點數
         */
        getTotalChildren() {

            let total = this.children.length;

            this.children.forEach(child => {

                total += child.getTotalChildren();

            });

            return total;

        }

        /**
         * 是否為葉節點
         */
        isLeaf() {

            return this.children.length === 0;

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

                parentId: this.parentId,

                projectId: this.projectId,

                batchId: this.batchId,

                versionId: this.versionId,

                type: this.type,

                code: this.code,

                name: this.name,

                quantity: this.quantity,

                unit: this.unit,

                materialUsages: this.materialUsages,

                children: this.children.map(

                    child => child.toJSON()

                ),

                attributes: this.attributes,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.BOMNode = BOMNode;

})(window);
