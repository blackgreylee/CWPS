/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/requirement-storage.js


 Sprint:
 2.9.7


 Build:
 Enterprise Procurement Requirement Storage Layer


 Description:
 Procurement Requirement Data Access Layer


==================================================
*/


(function(global){

"use strict";



class RequirementStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "requirements"

            );


    }





    /*
    ==============================================

    Get All Requirements

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Requirement By ID

    ==============================================
    */


    getById(

        requirementId

    ){


        return this.collection.getById(

            requirementId

        );


    }





    /*
    ==============================================

    Get By Material

    ==============================================
    */


    getByMaterial(

        materialId

    ){


        return this.collection.where({

            materialId

        });


    }





    /*
    ==============================================

    Get By Status

    ==============================================
    */


    getByStatus(

        status

    ){


        return this.collection.where({

            status

        });


    }





    /*
    ==============================================

    Create Requirement

    ==============================================
    */


    create(

        requirement

    ){


        const data = {


            ...requirement,


            status:

                requirement.status

                ||

                "Draft",


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

    Create Multiple Requirements

    ==============================================
    */


    createMany(

        requirements

    ){


        return requirements.map(

            item =>

                this.create(

                    item

                )


        );


    }





    /*
    ==============================================

    Update Requirement

    ==============================================
    */


    update(

        requirementId,

        data

    ){


        return this.collection.update(

            requirementId,

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

    Change Status

    ==============================================
    */


    changeStatus(

        requirementId,

        status

    ){


        return this.update(

            requirementId,

            {

                status

            }

        );


    }





    /*
    ==============================================

    Close Requirement

    ==============================================
    */


    close(

        requirementId

    ){


        return this.changeStatus(

            requirementId,

            "Closed"

        );


    }





    /*
    ==============================================

    Pending Purchase

    ==============================================
    */


    getPending(){

        return this.collection.where({

            status:"Pending"

        });


    }





    /*
    ==============================================

    Delete

    ==============================================
    */


    delete(

        requirementId

    ){


        return this.collection.delete(

            requirementId

        );


    }



}





global.RequirementStorage =

    RequirementStorage;



})(window);
