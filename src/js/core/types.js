/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/types.js


 Sprint:
 2.0.1


 Build:
 Enterprise Core Definition Layer


 Description:
 Global Enumeration & Constant Definitions


==================================================
*/

(function (global) {
    "use strict";

    /**
     * 凍結物件，避免執行期間被修改
     */
    function freeze(obj) {
        return Object.freeze(obj);
    }

    /**
     * BOM 節點型別
     */
    const NodeType = freeze({

        ROOT: "ROOT",

        ASSEMBLY: "ASSEMBLY",

        SUB_ASSEMBLY: "SUB_ASSEMBLY",

        PART: "PART",

        GLASS: "GLASS",

        STONE: "STONE",

        HARDWARE: "HARDWARE",

        ACCESSORY: "ACCESSORY",

        OTHER: "OTHER"

    });

    /**
     * 專案狀態
     */
    const ProjectStatus = freeze({

        DRAFT: "DRAFT",

        ACTIVE: "ACTIVE",

        COMPLETED: "COMPLETED",

        ARCHIVED: "ARCHIVED"

    });

    /**
     * 批次狀態
     */
    const BatchStatus = freeze({

        DRAFT: "DRAFT",

        IMPORTED: "IMPORTED",

        RELEASED: "RELEASED",

        LOCKED: "LOCKED",

        VOID: "VOID"

    });

    /**
     * BOM Version
     */
    const VersionStatus = freeze({

        DRAFT: "DRAFT",

        ACTIVE: "ACTIVE",

        SUPERSEDED: "SUPERSEDED",

        VOID: "VOID"

    });

    /**
     * 材料分類
     */
    const MaterialType = freeze({

        ALUMINUM: "ALUMINUM",

        GLASS: "GLASS",

        STONE: "STONE",

        STEEL: "STEEL",

        HARDWARE: "HARDWARE",

        GASKET: "GASKET",

        SEALANT: "SEALANT",

        ACCESSORY: "ACCESSORY",

        OTHER: "OTHER"

    });

    /**
     * 單位
     */
    const UnitType = freeze({

        KG: "kg",

        M: "m",

        M2: "㎡",

        M3: "㎥",

        PCS: "pcs",

        SET: "set",

        BOX: "box",

        ROLL: "roll",

        SHEET: "sheet",

        CUSTOM: "custom"

    });

    /**
     * 採購需求狀態
     */
    const RequirementStatus = freeze({

        PENDING: "PENDING",

        GENERATED: "GENERATED",

        APPROVED: "APPROVED",

        CANCELLED: "CANCELLED"

    });

    /**
     * 詢價狀態
     */
    const QuotationStatus = freeze({

        DRAFT: "DRAFT",

        SENT: "SENT",

        RECEIVED: "RECEIVED",

        ACCEPTED: "ACCEPTED",

        REJECTED: "REJECTED",

        EXPIRED: "EXPIRED"

    });

    /**
     * 採購狀態
     */
    const PurchaseStatus = freeze({

        DRAFT: "DRAFT",

        APPROVED: "APPROVED",

        ORDERED: "ORDERED",

        PARTIAL_RECEIVED: "PARTIAL_RECEIVED",

        COMPLETED: "COMPLETED",

        CANCELLED: "CANCELLED"

    });

    /**
     * 出貨狀態
     */
    const ShipmentStatus = freeze({

        PENDING: "PENDING",

        SHIPPING: "SHIPPING",

        PARTIAL: "PARTIAL",

        DELIVERED: "DELIVERED",

        CLOSED: "CLOSED"

    });

    /**
     * 發票狀態
     */
    const InvoiceStatus = freeze({

        NOT_INVOICED: "NOT_INVOICED",

        PARTIAL: "PARTIAL",

        INVOICED: "INVOICED",

        PAID: "PAID"

    });

    /**
     * 供應商狀態
     */
    const SupplierStatus = freeze({

        ACTIVE: "ACTIVE",

        INACTIVE: "INACTIVE",

        BLOCKED: "BLOCKED"

    });

    /**
     * 匯入狀態
     */
    const ImportStatus = freeze({

        READY: "READY",

        VALIDATING: "VALIDATING",

        IMPORTING: "IMPORTING",

        SUCCESS: "SUCCESS",

        FAILED: "FAILED"

    });

    /**
     * 全域輸出
     */
    global.CWPSTypes = freeze({

        NodeType,

        ProjectStatus,

        BatchStatus,

        VersionStatus,

        MaterialType,

        UnitType,

        RequirementStatus,

        QuotationStatus,

        PurchaseStatus,

        ShipmentStatus,

        InvoiceStatus,

        SupplierStatus,

        ImportStatus

    });

})(window);
