/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/quotation-engine.js


 Sprint:
 2.9.16


 Build:
 Enterprise Procurement Quotation Engine Layer


 Description:
 Supplier Quotation Processing Engine


==================================================
*/


(function(global){

"use strict";



class QuotationEngine {



    constructor(){


        this.requirementStorage =

            new global.RequirementStorage();


        this.quotationStorage =

            new global.QuotationStorage();



    }





    /*
    ==============================================

    Create Quotation Request

    ==============================================
    */


    createRequest(

        requirementId,

        supplierId

    ){



        const requirement =

            this.requirementStorage

            .getById(

                requirementId

            );





        if(!requirement){


            throw new Error(

                "Requirement not found"

            );


        }





        return {


            requirementId,


            supplierId,


            materialId:

                requirement.materialId,


            quantity:

                requirement.quantity,


            unit:

                requirement.unit,


            status:

                "Draft"



        };


    }





    /*
    ==============================================

    Save Quotation

    ==============================================
    */


    createQuotation(

        data

    ){


        return this.quotationStorage

            .create(

                data

            );


    }





    /*
    ==============================================

    Get Supplier Quotations

    ==============================================
    */


    getSupplierQuotes(

        supplierId

    ){



        return this.quotationStorage

            .getBySupplier(

                supplierId

            );


    }





    /*
    ==============================================

    Compare Price

    ==============================================
    */


    comparePrice(

        quotations

    ){



        return quotations.sort(

            (a,b)=>{


                return Number(

                    a.unitPrice || 0

                )

                -

                Number(

                    b.unitPrice || 0

                );


            }

        );


    }





    /*
    ==============================================

    Find Lowest Price

    ==============================================
    */


    findLowest(

        quotations

    ){



        const list =

            this.comparePrice(

                quotations

            );





        return list.length

            ?

            list[0]

            :

            null;


    }





    /*
    ==============================================

    Approve Quotation

    ==============================================
    */


    approve(

        quotationId

    ){



        return this.quotationStorage

            .approve(

                quotationId

            );


    }





    /*
    ==============================================

    Reject Quotation

    ==============================================
    */


    reject(

        quotationId

    ){



        return this.quotationStorage

            .reject(

                quotationId

            );


    }





    /*
    ==============================================

    Validate Quotation

    ==============================================
    */


    validate(

        quotation

    ){



        const errors = [];





        if(!quotation.supplierId){


            errors.push(

                "Supplier missing"

            );


        }





        if(!quotation.materialId){


            errors.push(

                "Material missing"

            );


        }





        if(

            Number(

                quotation.unitPrice || 0

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

    Calculate Amount

    ==============================================
    */


    calculateAmount(

        quotation

    ){



        return Number(

            quotation.quantity || 0

        )

        *

        Number(

            quotation.unitPrice || 0

        );



    }



}





global.QuotationEngine =

    QuotationEngine;



})(window);
