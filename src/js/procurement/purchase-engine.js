/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/purchase-engine.js


 Sprint:
 2.9.17


 Build:
 Enterprise Procurement Purchase Engine Layer


 Description:
 Purchase Order Processing Engine


==================================================
*/


(function(global){

"use strict";



class PurchaseEngine {



    constructor(){


        this.quotationStorage =

            new global.QuotationStorage();


        this.purchaseStorage =

            new global.PurchaseStorage();



    }





    /*
    ==============================================

    Create Purchase From Quotation

    ==============================================
    */


    createFromQuotation(

        quotationId

    ){



        const quotation =

            this.quotationStorage

            .getById(

                quotationId

            );





        if(!quotation){


            throw new Error(

                "Quotation not found"

            );


        }





        return {


            quotationId,


            supplierId:

                quotation.supplierId,


            requirementId:

                quotation.requirementId,


            materialId:

                quotation.materialId,


            quantity:

                quotation.quantity,


            unit:

                quotation.unit,


            unitPrice:

                quotation.unitPrice,


            amount:

                this.calculateAmount(

                    quotation

                ),


            status:

                "Draft"



        };


    }





    /*
    ==============================================

    Save Purchase

    ==============================================
    */


    createPurchase(

        data

    ){



        return this.purchaseStorage

            .create(

                data

            );


    }





    /*
    ==============================================

    Calculate Amount

    ==============================================
    */


    calculateAmount(

        data

    ){



        return Number(

            data.quantity || 0

        )

        *

        Number(

            data.unitPrice || 0

        );



    }





    /*
    ==============================================

    Confirm Purchase

    ==============================================
    */


    confirm(

        purchaseId

    ){



        return this.purchaseStorage

            .confirm(

                purchaseId

            );


    }





    /*
    ==============================================

    Complete Purchase

    ==============================================
    */


    complete(

        purchaseId

    ){



        return this.purchaseStorage

            .complete(

                purchaseId

            );


    }





    /*
    ==============================================

    Cancel Purchase

    ==============================================
    */


    cancel(

        purchaseId

    ){



        return this.purchaseStorage

            .cancel(

                purchaseId

            );


    }





    /*
    ==============================================

    Validate Purchase

    ==============================================
    */


    validate(

        purchase

    ){



        const errors = [];





        if(!purchase.supplierId){


            errors.push(

                "Supplier missing"

            );


        }





        if(!purchase.materialId){


            errors.push(

                "Material missing"

            );


        }





        if(

            Number(

                purchase.quantity || 0

            )

            <=0

        ){


            errors.push(

                "Quantity invalid"

            );


        }





        if(

            Number(

                purchase.unitPrice || 0

            )

            <=0

        ){


            errors.push(

                "Price invalid"

            );


        }





        return {


            valid:

                errors.length===0,


            errors



        };


    }





    /*
    ==============================================

    Total Purchase Amount

    ==============================================
    */


    totalAmount(

        purchases

    ){



        return purchases.reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.amount || 0

                );


            },

            0

        );



    }



}





global.PurchaseEngine =

    PurchaseEngine;



})(window);
