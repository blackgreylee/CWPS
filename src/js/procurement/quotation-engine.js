/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/quotation-engine.js


 Sprint:
 2.3.2


 Build:
 Enterprise Quotation Engine


 Description:
 Supplier Quotation Management Engine


==================================================
*/


(function(global){


"use strict";



class QuotationEngine {



    constructor(){


        this.storage =

            new QuotationStorage();


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

    Create Quotation

    建立詢價單

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Quotation data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.QuotationStatus.DRAFT;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Generate From Requirement

    Requirement → Quotation

    ==============================================
    */


    async generateFromRequirement(
        requirement
    ){



        if(!requirement){


            throw new Error(

                "Requirement required"

            );


        }





        return {


            requirementId:

                requirement.id,



            projectId:

                requirement.projectId,



            materialCode:

                requirement.materialCode,



            materialName:

                requirement.materialName,



            quantity:

                requirement.quantity,



            unit:

                requirement.unit,



            status:

                CWPSTypes.QuotationStatus.DRAFT,



            createdAt:


                new Date()

                .toISOString()



        };


    }






    /*
    ==============================================

    Create Supplier Quotation

    建立廠商報價

    ==============================================
    */


    async addSupplierQuote(
        quotationId,
        supplierQuote
    ){



        const quotation =


            await this.storage.get(

                quotationId

            );





        if(!quotation){


            throw new Error(

                "Quotation not found"

            );


        }





        quotation.quotes =


            quotation.quotes || [];





        quotation.quotes.push(



            {


                ...supplierQuote,



                createdAt:


                    new Date()

                    .toISOString()



            }



        );





        quotation.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            quotation

        );


    }






    /*
    ==============================================

    Get Quotations

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

    Find By Requirement

    ==============================================
    */


    async findByRequirement(
        requirementId
    ){



        return await this.storage.findByRequirement(

            requirementId

        );


    }






    /*
    ==============================================

    Compare Supplier Quotes

    比價

    ==============================================
    */


    compareQuotes(
        quotation
    ){



        if(

            !quotation ||

            !quotation.quotes

        ){


            return [];


        }





        return quotation.quotes.sort(

            (a,b)=>{


                return (

                    a.price -

                    b.price

                );


            }

        );


    }






    /*
    ==============================================

    Select Supplier

    選定廠商

    ==============================================
    */


    async selectSupplier(
        quotationId,
        supplierId
    ){



        const quotation =


            await this.storage.get(

                quotationId

            );





        if(!quotation){


            throw new Error(

                "Quotation not found"

            );


        }





        quotation.selectedSupplierId =

            supplierId;





        quotation.status =


            CWPSTypes.QuotationStatus.APPROVED;





        quotation.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            quotation

        );


    }






    /*
    ==============================================

    Reject Quotation

    ==============================================
    */


    async reject(
        quotationId
    ){



        return await this.storage.reject(

            quotationId

        );


    }






    /*
    ==============================================

    Version

    報價版本保存

    ==============================================
    */


    async createVersion(
        quotation
    ){



        return await this.storage.createVersion(

            quotation

        );


    }




}






global.QuotationEngine =

    QuotationEngine;



})(window);
