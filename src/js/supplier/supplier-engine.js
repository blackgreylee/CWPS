/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-engine.js


 Sprint:
 2.4.1


 Build:
 Enterprise Supplier Management Layer


 Description:
 Supplier Management Engine


==================================================
*/


(function(global){


"use strict";



class SupplierEngine {



    constructor(){


        this.storage =

            new SupplierStorage();


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

    Create Supplier

    建立供應商

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Supplier data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.SupplierStatus.ACTIVE;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Update Supplier

    ==============================================
    */


    async update(
        supplier
    ){



        supplier.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Get Supplier

    ==============================================
    */


    async get(
        id
    ){



        return await this.storage.get(

            id

        );


    }






    /*
    ==============================================

    Get All

    ==============================================
    */


    async getAll(){



        return await this.storage.getAll();



    }






    /*
    ==============================================

    Find By Category

    材料分類

    ==============================================
    */


    async findByCategory(
        category
    ){



        const list =


            await this.storage.getAll();





        return list.filter(

            supplier =>


                supplier.categories &&


                supplier.categories.includes(

                    category

                )


        );


    }






    /*
    ==============================================

    Find Active Supplier

    ==============================================
    */


    async findActive(){



        const list =


            await this.storage.getAll();





        return list.filter(

            supplier =>


                supplier.status ===

                CWPSTypes.SupplierStatus.ACTIVE



        );


    }






    /*
    ==============================================

    Link Quotation

    關聯報價紀錄

    ==============================================
    */


    async addQuotationHistory(
        supplierId,
        quotationId
    ){



        const supplier =


            await this.storage.get(

                supplierId

            );





        if(!supplier){


            throw new Error(

                "Supplier not found"

            );


        }





        supplier.quotationHistory =


            supplier.quotationHistory || [];





        supplier.quotationHistory.push(

            {


                quotationId:


                    quotationId,



                date:


                    new Date()

                    .toISOString()



            }


        );





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Link Purchase

    關聯採購紀錄

    ==============================================
    */


    async addPurchaseHistory(
        supplierId,
        purchaseId
    ){



        const supplier =


            await this.storage.get(

                supplierId

            );





        if(!supplier){


            throw new Error(

                "Supplier not found"

            );


        }





        supplier.purchaseHistory =


            supplier.purchaseHistory || [];





        supplier.purchaseHistory.push(

            {


                purchaseId:


                    purchaseId,



                date:


                    new Date()

                    .toISOString()



            }


        );





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Disable Supplier

    停用供應商

    ==============================================
    */


    async disable(
        supplierId
    ){



        const supplier =


            await this.storage.get(

                supplierId

            );





        if(!supplier){


            throw new Error(

                "Supplier not found"

            );


        }





        supplier.status =


            CWPSTypes.SupplierStatus.INACTIVE;





        supplier.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Version

    ==============================================
    */


    async createVersion(
        supplier
    ){



        return await this.storage.createVersion(

            supplier

        );


    }





}






global.SupplierEngine =

    SupplierEngine;



})(window);
