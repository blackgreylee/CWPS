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


(function(global){


"use strict";



const CWPSTypes = {



    /*
    ==============================================
    System
    ==============================================
    */


    SystemStatus:{


        ACTIVE:
            "ACTIVE",


        INACTIVE:
            "INACTIVE",


        DELETED:
            "DELETED"


    },





    /*
    ==============================================
    Project
    ==============================================
    */


    ProjectStatus:{


        DRAFT:
            "DRAFT",


        ACTIVE:
            "ACTIVE",


        SUSPENDED:
            "SUSPENDED",


        COMPLETED:
            "COMPLETED",


        CLOSED:
            "CLOSED"



    },






    /*
    ==============================================
    Batch
    ==============================================
    */


    BatchStatus:{


        DRAFT:
            "DRAFT",


        IMPORTED:
            "IMPORTED",


        ACTIVE:
            "ACTIVE",


        CLOSED:
            "CLOSED"



    },






    /*
    ==============================================
    Batch Version
    ==============================================
    */


    VersionStatus:{


        DRAFT:
            "DRAFT",


        ACTIVE:
            "ACTIVE",


        ARCHIVED:
            "ARCHIVED",


        VOID:
            "VOID"



    },







    /*
    ==============================================
    BOM
    ==============================================
    */


    BOMStatus:{


        DRAFT:
            "DRAFT",


        ACTIVE:
            "ACTIVE",


        LOCKED:
            "LOCKED",


        VOID:
            "VOID"



    },






    /*
    ==============================================
    BOM Node Type

    支援:
    AU
    AC
    加工件
    玻璃
    材料

    ==============================================
    */


    BOMNodeType:{


        ASSEMBLY:
            "ASSEMBLY",


        SUB_ASSEMBLY:
            "SUB_ASSEMBLY",


        PART:
            "PART",


        MATERIAL:
            "MATERIAL",


        GLASS:
            "GLASS"



    },








    /*
    ==============================================
    Material
    ==============================================
    */


    MaterialStatus:{


        ACTIVE:
            "ACTIVE",


        INACTIVE:
            "INACTIVE"



    },





    MaterialCategory:{


        ALUMINUM:
            "ALUMINUM",


        STEEL:
            "STEEL",


        GLASS:
            "GLASS",


        HARDWARE:
            "HARDWARE",


        SEALANT:
            "SEALANT",


        OTHER:
            "OTHER"



    },







    /*
    ==============================================
    Unit
    ==============================================
    */


    UnitType:{


        PCS:
            "PCS",


        M:
            "M",


        M2:
            "M2",


        KG:
            "KG",


        SET:
            "SET",


        ITEM:
            "ITEM"



    },








    /*
    ==============================================
    Requirement
    ==============================================
    */


    RequirementStatus:{


        DRAFT:
            "DRAFT",


        CONFIRMED:
            "CONFIRMED",


        PURCHASED:
            "PURCHASED",


        CLOSED:
            "CLOSED"



    },







    /*
    ==============================================
    Quotation
    ==============================================
    */


    QuotationStatus:{


        REQUESTED:
            "REQUESTED",


        RECEIVED:
            "RECEIVED",


        APPROVED:
            "APPROVED",


        REJECTED:
            "REJECTED"



    },








    /*
    ==============================================
    Purchase
    ==============================================
    */


    PurchaseStatus:{


        DRAFT:
            "DRAFT",


        APPROVED:
            "APPROVED",


        ORDERED:
            "ORDERED",


        RECEIVED:
            "RECEIVED",


        CLOSED:
            "CLOSED"



    },








    /*
    ==============================================
    Shipment
    ==============================================
    */


    ShipmentStatus:{


        PREPARING:
            "PREPARING",


        SHIPPING:
            "SHIPPING",


        RECEIVED:
            "RECEIVED",


        CLOSED:
            "CLOSED"



    },








    /*
    ==============================================
    Invoice
    ==============================================
    */


    InvoiceStatus:{


        DRAFT:
            "DRAFT",


        SUBMITTED:
            "SUBMITTED",


        APPROVED:
            "APPROVED",


        PAID:
            "PAID",


        VOID:
            "VOID"



    },








    /*
    ==============================================
    Change Type

    用於版本差異比對

    ==============================================
    */


    ChangeType:{


        ADD:
            "ADD",


        UPDATE:
            "UPDATE",


        DELETE:
            "DELETE"



    },








    /*
    ==============================================
    Import Status

    Excel/BOM Import 使用

    ==============================================
    */


    ImportStatus:{


        CREATED:
            "CREATED",


        VALIDATING:
            "VALIDATING",


        SUCCESS:
            "SUCCESS",


        FAILED:
            "FAILED"



    }






};






/*
==================================================

 Export

==================================================
*/


global.CWPSTypes = CWPSTypes;



})(window);
