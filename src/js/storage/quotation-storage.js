/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/quotation-storage.js


 Sprint:
 2.1.7


 Build:
 Enterprise Procurement Storage


 Description:
 Quotation Repository Service


==================================================
*/


(function(global){


"use strict";



class QuotationStorage {



    constructor(){


        this.db =

            new CWPSDatabase();



        this.storeName =

            "quotations";


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.db.open();


    }






    /*
    ==============================================

    Create

    ==============================================
    */


    async create(
        quotation
    ){



        if(!quotation){


            throw new Error(

                "Quotation required"

            );


        }





        return await this.db.add(

            this.storeName,

            quotation

        );


    }






    /*
    ==============================================

    Update

    ==============================================
    */


    async update(
        quotation
    ){



        return await this.db.update(

            this.storeName,

            quotation

        );


    }






    /*
    ==============================================

    Get

    ==============================================
    */


    async get(
        id
    ){



        return await this.db.get(

            this.storeName,

            id

        );


    }






    /*
    ==============================================

    Get All

    ==============================================
    */


    async getAll(){



        return await this.db.getAll(

            this.storeName

        );


    }






    /*
    ==============================================

    Find By Project

    ==============================================
    */


    async findByProject(
        projectId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.projectId === projectId



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



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.requirementId === requirementId



        );


    }






    /*
    ==============================================

    Find By Supplier

    ==============================================
    */


    async findBySupplier(
        supplierId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.supplierId === supplierId



        );


    }






    /*
    ==============================================

    Find By Material

    ==============================================
    */


    async findByMaterial(
        materialCode
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.materialCode === materialCode



        );


    }






    /*
    ==============================================

    Find By Status

    ==============================================
    */


    async findByStatus(
        status
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.status === status



        );


    }






    /*
    ==============================================

    Approve Quotation

    ==============================================
    */


    async approve(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Quotation not found"

            );


        }





        item.status =


            CWPSTypes.QuotationStatus.APPROVED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Reject Quotation

    ==============================================
    */


    async reject(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Quotation not found"

            );


        }





        item.status =


            CWPSTypes.QuotationStatus.REJECTED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Version History

    報價修改不可覆蓋

    ==============================================
    */


    async createVersion(
        quotation
    ){



        const version = {



            ...quotation,



            version:



                (quotation.version || 0)

                + 1,



            createdAt:



                new Date()

                .toISOString()



        };





        return await this.create(

            version

        );


    }






    /*
    ==============================================

    Remove

    Enterprise:

    不刪除，只改狀態

    ==============================================
    */


    async remove(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            return false;


        }





        item.status =


            CWPSTypes.QuotationStatus.REJECTED;





        item.updatedAt =


            new Date()

            .toISOString();





        await this.update(

            item

        );





        return true;


    }




}






global.QuotationStorage =

    QuotationStorage;



})(window);
