/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/schema.js

 Sprint:
 2.9.1

 Build:
 Enterprise Database Schema Layer


 Description:
 Database Schema Definition


==================================================
*/


(function(global){

"use strict";


const CWPS_SCHEMA = {


    version: "2.9.1",



    /*
    ==============================================
    Collections
    ==============================================
    */


    collections:{



        projects:{


            primaryKey:"projectId",


            indexes:[

                "projectCode"

            ],


            fields:{


                projectId:"string",

                projectCode:"string",

                projectName:"string",

                customer:"string",

                contractor:"string",

                designer:"string",

                status:"enum",

                createDate:"datetime",

                updateDate:"datetime"


            }


        },





        batches:{


            primaryKey:"batchId",


            indexes:[

                "projectId",

                "batchCode"

            ],


            fields:{


                batchId:"string",

                projectId:"string",

                batchCode:"string",

                batchName:"string",

                drawingDate:"date",

                status:"enum"


            }


        },





        bomVersions:{


            primaryKey:"versionId",


            indexes:[

                "batchId",

                "status"

            ],


            fields:{


                versionId:"string",

                batchId:"string",

                versionNo:"number",

                status:"enum",

                importTime:"datetime",

                importUser:"string",

                remark:"string"


            }


        },





        bomNodes:{


            primaryKey:"nodeId",


            indexes:[

                "versionId",

                "parentNodeId",

                "nodeCode"

            ],


            fields:{


                nodeId:"string",

                versionId:"string",

                parentNodeId:"string",


                nodeCode:"string",

                nodeName:"string",

                nodeType:"enum",


                quantity:"number",

                unit:"string",


                materialId:"string"


            }


        },





        materials:{


            primaryKey:"materialId",


            indexes:[

                "materialCode",

                "category"

            ],


            fields:{


                materialId:"string",

                materialCode:"string",

                materialName:"string",

                category:"enum",

                specification:"string",

                unit:"string",

                unitWeight:"number",

                status:"enum"


            }


        },





        suppliers:{


            primaryKey:"supplierId",


            indexes:[

                "supplierCode"

            ],


            fields:{


                supplierId:"string",

                supplierCode:"string",

                supplierName:"string",

                contact:"string",

                phone:"string",

                email:"string",

                rating:"number"


            }


        },





        requirements:{


            primaryKey:"requirementId",


            indexes:[

                "materialId"

            ],


            fields:{


                requirementId:"string",

                materialId:"string",

                requiredQty:"number",

                purchaseQty:"number",

                status:"enum"


            }


        },





        quotations:{


            primaryKey:"quotationId",


            indexes:[

                "requirementId",

                "supplierId"

            ],


            fields:{


                quotationId:"string",

                requirementId:"string",

                supplierId:"string",

                unitPrice:"number",

                currency:"string",

                quoteDate:"date"


            }


        },





        purchases:{


            primaryKey:"purchaseId",


            indexes:[

                "quotationId",

                "purchaseNo"

            ],


            fields:{


                purchaseId:"string",

                quotationId:"string",

                purchaseNo:"string",

                orderDate:"date",

                totalAmount:"number",

                status:"enum"


            }


        },





        shipments:{


            primaryKey:"shipmentId",


            indexes:[

                "purchaseId"

            ],


            fields:{


                shipmentId:"string",

                purchaseId:"string",

                shipmentNo:"string",

                shipmentDate:"date",

                status:"enum"


            }


        },





        invoices:{


            primaryKey:"invoiceId",


            indexes:[

                "shipmentId",

                "invoiceNo"

            ],


            fields:{


                invoiceId:"string",

                shipmentId:"string",

                invoiceNo:"string",

                invoiceDate:"date",

                amount:"number",

                status:"enum"


            }


        },





        logs:{


            primaryKey:"logId",


            indexes:[

                "actionDate"

            ],


            fields:{


                logId:"string",

                action:"string",

                target:"string",

                user:"string",

                actionDate:"datetime"


            }


        },





        settings:{


            primaryKey:"key",


            fields:{


                key:"string",

                value:"string"


            }


        }



    },





    /*
    ==============================================
    Relations
    ==============================================
    */


    relations:{


        project_batch:{


            type:"one-to-many",

            from:"projects.projectId",

            to:"batches.projectId"


        },



        batch_version:{


            type:"one-to-many",

            from:"batches.batchId",

            to:"bomVersions.batchId"


        },



        version_node:{


            type:"one-to-many",

            from:"bomVersions.versionId",

            to:"bomNodes.versionId"


        },



        material_node:{


            type:"one-to-many",

            from:"materials.materialId",

            to:"bomNodes.materialId"


        },



        material_requirement:{


            type:"one-to-many",

            from:"materials.materialId",

            to:"requirements.materialId"


        }



    }



};





global.CWPS_SCHEMA = CWPS_SCHEMA;


})(window);
