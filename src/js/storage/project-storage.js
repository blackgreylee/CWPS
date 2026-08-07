/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/project-storage.js


 Sprint:
 2.9.3


 Build:
 Enterprise Project Storage Layer


 Description:
 Project Data Access Layer


==================================================
*/


(function(global){


"use strict";



class ProjectStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "projects"

            );


    }





    /*
    ==============================================

    Get All Projects

    ==============================================
    */


    getAll(){



        return this.collection.getAll();



    }





    /*
    ==============================================

    Get Project By ID

    ==============================================
    */


    getById(
        projectId
    ){



        return this.collection.getById(

            projectId

        );


    }





    /*
    ==============================================

    Find By Code

    ==============================================
    */


    getByCode(
        projectCode
    ){



        const result =


            this.collection.where({

                projectCode

            });





        return result[0] || null;



    }





    /*
    ==============================================

    Create Project

    ==============================================
    */


    save(
        project
    ){



        return this.collection.insert(

            project

        );


    }





    /*
    ==============================================

    Update Project

    ==============================================
    */


    update(
        projectId,

        data
    ){



        return this.collection.update(

            projectId,

            data

        );


    }





    /*
    ==============================================

    Delete Project

    ==============================================
    */


    delete(
        projectId
    ){



        return this.collection.delete(

            projectId

        );


    }





    /*
    ==============================================

    Exists

    ==============================================
    */


    exists(
        projectId
    ){



        return !!this.getById(

            projectId

        );


    }





    /*
    ==============================================

    Change Status

    ==============================================
    */


    changeStatus(
        projectId,

        status
    ){



        return this.update(

            projectId,

            {

                status,

                updateDate:

                    new Date()

                    .toISOString()

            }

        );


    }



}





global.ProjectStorage =

    ProjectStorage;



})(window);
