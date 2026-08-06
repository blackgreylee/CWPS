/*
==================================================

 CWPS Enterprise

 Project Model

 Sprint:
 2.0.7

 Description:
 Project Master Entity

==================================================
*/

(function (global) {

    "use strict";


    class Project {


        constructor(data = {}) {


            this.id = data.id || crypto.randomUUID();


            // 專案編號
            this.code = data.code || "";


            // 專案名稱
            this.name = data.name || "";


            // 客戶名稱
            this.customer = data.customer || "";


            // 專案狀態
            this.status =
                data.status ||
                CWPSTypes.ProjectStatus.DRAFT;



            // Batch 清單
            this.batches = [];


            if (Array.isArray(data.batches)) {


                this.batches =
                    data.batches.map(batch =>


                        batch instanceof Batch
                            ? batch
                            : new Batch(batch)

                    );


            }



            // 專案負責人
            this.manager = data.manager || "";



            // 開始日期
            this.startDate =
                data.startDate || null;



            // 預計完成日期
            this.endDate =
                data.endDate || null;



            // 備註
            this.remark = data.remark || "";



            this.createdAt =
                data.createdAt ||
                new Date().toISOString();



            this.updatedAt =
                data.updatedAt ||
                new Date().toISOString();


        }



        /**
         * 新增 Batch
         */
        addBatch(batch) {


            if (!(batch instanceof Batch)) {


                batch = new Batch(batch);


            }



            batch.projectId = this.id;



            this.batches.push(batch);



            this.touch();



            return batch;


        }



        /**
         * 移除 Batch
         */
        removeBatch(batchId) {


            this.batches =
                this.batches.filter(


                    batch =>
                        batch.id !== batchId


                );



            this.touch();


        }



        /**
         * 查詢 Batch
         */
        getBatch(batchId) {


            return this.batches.find(


                batch =>
                    batch.id === batchId


            ) || null;


        }



        /**
         * 依 Batch Code 查詢
         */
        getBatchByCode(code) {


            return this.batches.find(


                batch =>
                    batch.code === code


            ) || null;


        }



        /**
         * 取得所有目前版本
         */
        getCurrentVersions() {


            return this.batches

                .map(batch =>

                    batch.getCurrentVersion()

                )

                .filter(version => version !== null);


        }



        /**
         * 更新專案狀態
         */
        setStatus(status) {


            this.status = status;


            this.touch();


        }



        /**
         * 更新基本資料
         */
        updateInfo(data = {}) {


            if (data.name !== undefined) {

                this.name = data.name;

            }


            if (data.customer !== undefined) {

                this.customer = data.customer;

            }


            if (data.manager !== undefined) {

                this.manager = data.manager;

            }


            if (data.startDate !== undefined) {

                this.startDate = data.startDate;

            }


            if (data.endDate !== undefined) {

                this.endDate = data.endDate;

            }


            if (data.remark !== undefined) {

                this.remark = data.remark;

            }



            this.touch();


        }



        /**
         * 更新時間
         */
        touch() {


            this.updatedAt =
                new Date().toISOString();


        }



        /**
         * JSON
         */
        toJSON() {


            return {


                id: this.id,


                code: this.code,


                name: this.name,


                customer: this.customer,


                status: this.status,


                batches:


                    this.batches.map(


                        batch =>
                            batch.toJSON()


                    ),



                manager: this.manager,


                startDate: this.startDate,


                endDate: this.endDate,


                remark: this.remark,


                createdAt: this.createdAt,


                updatedAt: this.updatedAt



            };


        }



    }



    global.Project = Project;



})(window);
