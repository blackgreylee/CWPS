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

            this.parentId = data.parentId || null;

            this.batchId = data.batchId || null;

            this.versionId = data.versionId || null;

            this.type = data.type || CWPSTypes.NodeType.PART;

            this.code = data.code || "";

            this.name = data.name || "";

            this.quantity = Number(data.quantity || 1);

            this.unit = data.unit || "";

            this.materials = Array.isArray(data.materials)
                ? data.materials
                : [];

            this.children = Array.isArray(data.children)
                ? data.children
                : [];

            this.attributes = data.attributes || {};

            this.createdAt = data.createdAt || new Date().toISOString();

            this.updatedAt = data.updatedAt || new Date().toISOString();
        }

        addChild(node) {

            node.parentId = this.id;

            this.children.push(node);

            return node;
        }

        removeChild(nodeId) {

            this.children = this.children.filter(n => n.id !== nodeId);
        }

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

        addMaterial(materialUsage) {

            this.materials.push(materialUsage);
        }

        removeMaterial(materialId) {

            this.materials = this.materials.filter(
                m => m.materialId !== materialId
            );
        }

        getTotalChildren() {

            let total = this.children.length;

            this.children.forEach(child => {

                total += child.getTotalChildren();

            });

            return total;
        }

        traverse(callback) {

            callback(this);

            this.children.forEach(child => {

                child.traverse(callback);

            });
        }

        toJSON() {

            return {

                id: this.id,

                parentId: this.parentId,

                batchId: this.batchId,

                versionId: this.versionId,

                type: this.type,

                code: this.code,

                name: this.name,

                quantity: this.quantity,

                unit: this.unit,

                materials: this.materials,

                children: this.children.map(c => c.toJSON()),

                attributes: this.attributes,

                createdAt: this.createdAt,

                updatedAt: this.updatedAt

            };

        }

    }

    global.BOMNode = BOMNode;

})(window);
