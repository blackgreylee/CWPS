/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-engine.js


 Sprint:
 2.9.20


 Build:
 Enterprise Supplier Management Engine Layer


 Description:
 Supplier Business Logic Engine


==================================================
*/


(function(global){

"use strict";



class SupplierEngine {



    constructor(){


        this.database =

            global.cwpsDatabase;



        this.collection =

            this.database.collection(

                "suppliers"

            );


    }





    /*
    ==============================================

    Get All Suppliers

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Supplier By ID

    ==============================================
    */


    getById(

        supplierId

    ){


        return this.collection.getById(

            supplierId

        );


    }





    /*
    ==============================================

    Search Supplier

    ==============================================
    */


    search(

        keyword

    ){



        keyword =

            keyword.toLowerCase();





        return this.getAll()

        .filter(

            supplier => {



                return (

                    supplier.code

                    &&

                    supplier.code

                    .toLowerCase()

                    .includes(keyword)

                )

                ||

                (

                    supplier.name

                    &&

                    supplier.name

                    .toLowerCase()

                    .includes(keyword)

                );


            }

        );


    }





    /*
    ==============================================

    Create Supplier

    ==============================================
    */


    create(

        supplier

    ){



        const data = {


            ...supplier,


            status:

                supplier.status

                ||

                "Active",


            createDate:

                new Date()

                .toISOString()



        };





        return this.collection.insert(

            data

        );


    }





    /*
    ==============================================

    Update Supplier

    ==============================================
    */


    update(

        supplierId,

        data

    ){



        return this.collection.update(

            supplierId,

            {

                ...data,


                updateDate:

                    new Date()

                    .toISOString()


            }

        );


    }





    /*
    ==============================================

    Enable Supplier

    ==============================================
    */


    enable(

        supplierId

    ){



        return this.update(

            supplierId,

            {

                status:"Active"

            }

        );


    }





    /*
    ==============================================

    Disable Supplier

    ==============================================
    */


    disable(

        supplierId

    ){



        return this.update(

            supplierId,

            {

                status:"Disabled"

            }

        );


    }





    /*
    ==============================================

    Validate Supplier

    ==============================================
    */


    validate(

        supplier

    ){



        const errors = [];





        if(!supplier.name){


            errors.push(

                "Supplier name missing"

            );


        }





        if(!supplier.contact){


            errors.push(

                "Contact missing"

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

    Get Active Suppliers

    ==============================================
    */


    getActive(){



        return this.collection.where({

            status:"Active"

        });


    }





    /*
    ==============================================

    Delete Supplier

    ==============================================
    */


    delete(

        supplierId

    ){



        return this.collection.delete(

            supplierId

        );


    }



}





global.SupplierEngine =

    SupplierEngine;



})(window);
