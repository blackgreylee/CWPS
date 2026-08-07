/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/project-controller.js


 Sprint:
 2.9.28


 Build:
 Enterprise Project Controller Layer


 Description:
 Project Management Controller


==================================================
*/


(function(global){

"use strict";



class ProjectController {



    constructor(){


        this.projectStorage =

            new global.ProjectStorage();


        this.bomStorage =

            new global.BOMStorage();



        this.currentProject = null;



    }





    /*
    ==============================================

    Get Project List

    ==============================================
    */


    getProjects(){



        return this.projectStorage

            .getAll();



    }





    /*
    ==============================================

    Get Project

    ==============================================
    */


    getProject(

        projectId

    ){



        return this.projectStorage

            .getById(

                projectId

            );



    }





    /*
    ==============================================

    Open Project

    ==============================================
    */


    open(

        projectId

    ){



        const project =

            this.getProject(

                projectId

            );





        if(!project){


            throw new Error(

                "Project not found"

            );


        }





        this.currentProject =

            project;





        return project;



    }





    /*
    ==============================================

    Current Project

    ==============================================
    */


    current(){



        return this.currentProject;



    }





    /*
    ==============================================

    Create Project

    ==============================================
    */


    create(

        data

    ){



        const project = {


            ...data,


            status:

                "Active",


            createDate:

                new Date()

                .toISOString()



        };





        return this.projectStorage

            .create(

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



        return this.projectStorage

            .update(

                projectId,

                data

            );



    }





    /*
    ==============================================

    Get Project BOM

    ==============================================
    */


    getBOMVersions(

        projectId

    ){



        return this.bomStorage

            .getByProject(

                projectId

            );



    }





    /*
    ==============================================

    Project Summary

    ==============================================
    */


    summary(

        projectId

    ){



        const project =

            this.getProject(

                projectId

            );





        const bomVersions =

            this.getBOMVersions(

                projectId

            );





        return {


            project,


            bomCount:

                bomVersions.length,


            bomVersions



        };



    }





    /*
    ==============================================

    Close Project

    ==============================================
    */


    close(

        projectId

    ){



        return this.projectStorage

            .update(

                projectId,

                {

                    status:

                        "Closed"

                }

            );



    }



}





global.ProjectController =

    ProjectController;



})(window);
