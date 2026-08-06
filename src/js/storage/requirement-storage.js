/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/requirement-storage.js


 Sprint:
 2.1.6


 Build:
 Enterprise Procurement Storage


 Description:
 Requirement Repository Service


==================================================
*/


(function(global){


"use strict";



class RequirementStorage {



    constructor(){


        this.db =

            new CWPSDatabase();



        this.storeName =

            "requirements";


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
        requirement
    ){



        if(!requirement){


            throw new Error(

                "Requirement required"

            );


        }




        return await this.db.add(

            this.storeName,

            requirement

        );


    }






    /*
    ==============================================

    Update

    ==============================================
    */


    async update(
        requirement
    ){



        return await this.db.update(

            this.storeName,

            requirement

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

    Find By Batch Version

    ==============================================
    */


    async findByVersion(
        versionId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.versionId === versionId



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

    Confirm Requirement

    ==============================================
    */


    async confirm(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Requirement not found"

            );


        }





        item.status =


            CWPSTypes.RequirementStatus.CONFIRMED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Close Requirement

    ==============================================
    */


    async close(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Requirement not found"

            );


        }





        item.status =


            CWPSTypes.RequirementStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Remove

    注意:
    Enterprise 不直接刪除資料

    ==============================================
    */


    async remove(id){



        const item =


            await this.get(id);





        if(!item){


            return false;


        }





        item.status =


            CWPSTypes.RequirementStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        await this.update(

            item

        );





        return true;


    }




}






global.RequirementStorage =

    RequirementStorage;



})(window);
