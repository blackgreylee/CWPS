/*
==================================================

 CWPS Enterprise

 Project Storage Service

 Sprint:
 2.1.2

 Description:
 Project Persistence Layer

==================================================
*/


(function (global) {

    "use strict";


    class ProjectStorage {


        constructor() {


            this.db =
                new CWPSDatabase();


            this.storeName =
                "projects";


        }



        /**
         * 初始化
         */
        async init() {


            await this.db.open();


        }



        /**
         * 建立專案
         */
        async create(project) {


            if (!project) {


                throw new Error(
                    "Project data required"
                );


            }



            const data =

                project.toJSON

                    ? project.toJSON()

                    : project;



            return await this.db.add(

                this.storeName,

                data

            );


        }



        /**
         * 取得單一專案
         */
        async get(projectId) {


            return await this.db.get(

                this.storeName,

                projectId

            );


        }



        /**
         * 取得全部專案
         */
        async getAll() {


            return await this.db.getAll(

                this.storeName

            );


        }



        /**
         * 更新專案
         */
        async update(project) {


            if (!project) {


                throw new Error(
                    "Project data required"
                );


            }



            const data =

                project.toJSON

                    ? project.toJSON()

                    : project;



            return await this.db.update(

                this.storeName,

                data

            );


        }



        /**
         * 刪除專案
         */
        async remove(projectId) {


            return await this.db.remove(

                this.storeName,

                projectId

            );


        }



        /**
         * 檢查專案是否存在
         */
        async exists(projectId) {


            const project =

                await this.get(projectId);



            return project !== null;


        }



        /**
         * 依專案編號查詢
         */
        async findByCode(code) {


            const projects =

                await this.getAll();



            return projects.find(

                project =>

                    project.code === code

            ) || null;


        }



        /**
         * 依狀態查詢
         */
        async findByStatus(status) {


            const projects =

                await this.getAll();



            return projects.filter(

                project =>

                    project.status === status

            );


        }



        /**
         * 清除全部專案
         *
         * 測試用
         */
        async clearAll() {


            return await this.db.clear(

                this.storeName

            );


        }



    }



    global.ProjectStorage =
        ProjectStorage;



})(window);
