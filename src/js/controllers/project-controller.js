/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/project-controller.js


 Sprint:
 2.6.3


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


        this.storage =

            new ProjectStorage();



        this.view = null;



    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(view){



        this.view = view;



        await this.storage.init();



        await this.load();


    }






    /*
    ==============================================

    Load Projects

    ==============================================
    */


    async load(){



        const projects =


            await this.storage.getAll();





        if(

            this.view &&

            this.view.render

        ){


            this.view.render(

                projects

            );


        }





        return projects;


    }






    /*
    ==============================================

    Create Project

    建立專案

    ==============================================
    */


    async create(
        data
    ){



        if(!data){


            throw new Error(

                "Project data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.ProjectStatus.ACTIVE;





        data.createdAt =


            new Date()

            .toISOString();





        const result =


            await this.storage.create(

                data

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Update Project

    ==============================================
    */


    async update(
        data
    ){



        data.updatedAt =


            new Date()

            .toISOString();





        const result =


            await this.storage.update(

                data

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Detail

    ==============================================
    */


    async detail(
        projectId
    ){



        return await this.storage.get(

            projectId

        );


    }






    /*
    ==============================================

    Delete Protection

    僅停用，不刪除

    ==============================================
    */


    async disable(
        projectId
    ){



        const project =


            await this.storage.get(

                projectId

            );





        if(!project){


            throw new Error(

                "Project not found"

            );


        }





        project.status =


            CWPSTypes.ProjectStatus.INACTIVE;





        project.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            project

        );


    }






    /*
    ==============================================

    Search

    ==============================================
    */


    async search(
        keyword
    ){



        const projects =


            await this.storage.getAll();





        if(!keyword){


            return projects;


        }





        return projects.filter(

            item=>{


                return (


                    item.name &&


                    item.name.includes(

                        keyword

                    )



                );


            }

        );


    }






    /*
    ==============================================

    Project Status

    ==============================================
    */


    async changeStatus(
        projectId,
        status
    ){



        const project =


            await this.storage.get(

                projectId

            );





        if(!project){


            throw new Error(

                "Project not found"

            );


        }





        project.status = status;





        project.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            project

        );


    }






    /*
    ==============================================

    Summary

    專案摘要

    ==============================================
    */


    async summary(
        projectId
    ){



        const project =


            await this.storage.get(

                projectId

            );





        if(!project){


            return null;


        }





        return {



            id:

                project.id,



            name:

                project.name,



            customer:

                project.customer,



            status:

                project.status,



            createdAt:

                project.createdAt



        };


    }





}






global.ProjectController =

    ProjectController;



})(window);
