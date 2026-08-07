/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/material-storage.js


 Sprint:
 2.9.6


 Build:
 Enterprise Material Storage Layer


 Description:
 Material Master Data Access Layer


==================================================
*/


(function(global){

"use strict";



class MaterialStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "materials"

            );


    }





    /*
    ==============================================

    Get All Materials

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Material By ID

    ==============================================
    */


    getById(

        materialId

    ){


        return this.collection.getById(

            materialId

        );


    }





    /*
    ==============================================

    Get By Code

    ==============================================
    */


    getByCode(

        materialCode

    ){



        const result =


            this.collection.where({

                materialCode

            });





        return result[0] || null;


    }





    /*
    ==============================================

    Search

    ==============================================
    */


    search(

        keyword

    ){



        keyword =

            keyword.toLowerCase();





        return this.collection

        .getAll()

        .filter(

            material => {



                return (


                    material.materialCode

                    &&

                    material.materialCode

                    .toLowerCase()

                    .includes(keyword)



                )

                ||

                (


                    material.materialName

                    &&

                    material.materialName

                    .toLowerCase()

                    .includes(keyword)



                );



            }

        );


    }





    /*
    ==============================================

    Get By Category

    ==============================================
    */


    getByCategory(

        category

    ){



        return this.collection.where({

            category

        });



    }





    /*
    ==============================================

    Create Material

    ==============================================
    */


    create(

        material

    ){



        const exists =


            this.getByCode(

                material.materialCode

            );





        if(exists){


            throw new Error(

                "Material code already exists"

            );


        }





        return this.collection.insert(

            material

        );


    }





    /*
    ==============================================

    Update Material

    ==============================================
    */


    update(

        materialId,

        data

    ){



        return this.collection.update(

            materialId,

            data

        );


    }





    /*
    ==============================================

    Delete Material

    ==============================================
    */


    delete(

        materialId

    ){



        return this.collection.delete(

            materialId

        );


    }





    /*
    ==============================================

    Update Unit Weight

    ==============================================
    */


    updateUnitWeight(

        materialId,

        weight

    ){



        return this.update(

            materialId,

            {

                unitWeight:weight


            }

        );


    }





    /*
    ==============================================

    Get BOM Usage

    ==============================================
    */


    getUsage(

        materialId

    ){



        const bomStorage =

            new global.BOMStorage();





        const nodes =

            bomStorage.getAll();





        return nodes.filter(

            node =>


                node.materialId === materialId


        );


    }



}





global.MaterialStorage =

    MaterialStorage;



})(window);
