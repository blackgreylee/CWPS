/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/purchase-engine.js


 Sprint:
 2.3.3


 Build:
 Enterprise Purchase Engine


 Description:
 Purchase Order Management Engine


==================================================
*/


(function(global){


"use strict";



class PurchaseEngine {



    constructor(){


        this.storage =

            new PurchaseStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        if(this.storage.init){


            await this.storage.init();


        }


    }






    /*
    ==============================================

    Create Purchase Order

    建立採購單

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Purchase data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.PurchaseStatus.DRAFT;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Generate From Quotation

    Quotation → Purchase

    ==============================================
    */


    async generateFromQuotation(
        quotation
    ){



        if(!quotation){


            throw new Error(

                "Quotation required"

            );


        }





        if(

            !quotation.selectedSupplierId

        ){


            throw new Error(

                "Supplier not selected"

            );


        }





        return {


            quotationId:

                quotation.id,



            requirementId:

                quotation.requirementId,



            projectId:

                quotation.projectId,



            supplierId:

                quotation.selectedSupplierId,



            materialCode:

                quotation.materialCode,



            materialName:

                quotation.materialName,



            quantity:

                quotation.quantity,



            unit:

                quotation.unit,



            status:

                CWPSTypes.PurchaseStatus.DRAFT,



            createdAt:


                new Date()

                .toISOString()



        };


    }






    /*
    ==============================================

    Add Purchase Item

    加入採購明細

    ==============================================
    */


    async addItem(
        purchaseId,
        item
    ){



        const purchase =


            await this.storage.get(

                purchaseId

            );





        if(!purchase){


            throw new Error(

                "Purchase not found"

            );


        }





        purchase.items =


            purchase.items || [];





        purchase.items.push(


            {


                ...item,



                createdAt:


                    new Date()

                    .toISOString()



            }


        );





        purchase.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            purchase

        );


    }






    /*
    ==============================================

    Get Purchase List

    ==============================================
    */


    async getAll(){



        return await this.storage.getAll();



    }






    /*
    ==============================================

    Find By Project

    ==============================================
    */


    async findByProject(
        projectId
    ){



        return await this.storage.findByProject(

            projectId

        );


    }






    /*
    ==============================================

    Find Supplier Orders

    ==============================================
    */


    async findBySupplier(
        supplierId
    ){



        return await this.storage.findBySupplier(

            supplierId

        );


    }






    /*
    ==============================================

    Approve Purchase

    ==============================================
    */


    async approve(
        purchaseId
    ){



        return await this.storage.approve(

            purchaseId

        );


    }






    /*
    ==============================================

    Send Order

    發出採購

    ==============================================
    */


    async order(
        purchaseId
    ){



        return await this.storage.order(

            purchaseId

        );


    }






    /*
    ==============================================

    Receive

    收料完成

    ==============================================
    */


    async receive(
        purchaseId
    ){



        return await this.storage.receive(

            purchaseId

        );


    }






    /*
    ==============================================

    Close

    ==============================================
    */


    async close(
        purchaseId
    ){



        return await this.storage.close(

            purchaseId

        );


    }






    /*
    ==============================================

    Version Management

    ==============================================
    */


    async createVersion(
        purchase
    ){



        return await this.storage.createVersion(

            purchase

        );


    }





}






global.PurchaseEngine =

    PurchaseEngine;



})(window);
