/*
==================================================

 CWPS Enterprise

 Supplier Model

 Sprint:
 2.0.8

 Description:
 Supplier Master Entity

==================================================
*/

(function (global) {

    "use strict";


    class Supplier {


        constructor(data = {}) {


            this.id = data.id || crypto.randomUUID();



            // 供應商編號
            this.code = data.code || "";



            // 供應商名稱
            this.name = data.name || "";



            // 公司統編
            this.taxId = data.taxId || "";



            // 聯絡人
            this.contactPerson =
                data.contactPerson || "";



            // 電話
            this.phone =
                data.phone || "";



            // Email
            this.email =
                data.email || "";



            // 地址
            this.address =
                data.address || "";



            // 供應材料分類
            /*
                [
                    "ALUMINUM",
                    "GLASS",
                    "HARDWARE"
                ]
            */
            this.materialTypes =
                Array.isArray(data.materialTypes)

                    ? data.materialTypes

                    : [];



            // 狀態
            this.status =
                data.status ||

                CWPSTypes.SupplierStatus.ACTIVE;



            // 備註
            this.remark =
                data.remark || "";



            // 擴充欄位
            this.attributes =
                data.attributes || {};



            this.createdAt =
                data.createdAt ||

                new Date().toISOString();



            this.updatedAt =
                data.updatedAt ||

                new Date().toISOString();


        }



        /**
         * 新增供應材料分類
         */
        addMaterialType(type) {


            if (!this.materialTypes.includes(type)) {


                this.materialTypes.push(type);


            }


            this.touch();


        }



        /**
         * 移除供應材料分類
         */
        removeMaterialType(type) {


            this.materialTypes =

                this.materialTypes.filter(

                    item => item !== type

                );


            this.touch();


        }



        /**
         * 是否供應某類材料
         */
        canSupply(materialType) {


            return this.materialTypes.includes(

                materialType

            );


        }



        /**
         * 啟用
         */
        activate() {


            this.status =
                CWPSTypes.SupplierStatus.ACTIVE;


            this.touch();


        }



        /**
         * 停用
         */
        deactivate() {


            this.status =
                CWPSTypes.SupplierStatus.INACTIVE;


            this.touch();


        }



        /**
         * 更新資料
         */
        updateInfo(data = {}) {


            Object.keys(data).forEach(key => {


                if (key in this) {


                    this[key] = data[key];


                }


            });



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


                taxId: this.taxId,


                contactPerson:
                    this.contactPerson,


                phone:
                    this.phone,


                email:
                    this.email,


                address:
                    this.address,


                materialTypes:
                    this.materialTypes,


                status:
                    this.status,


                remark:
                    this.remark,


                attributes:
                    this.attributes,


                createdAt:
                    this.createdAt,


                updatedAt:
                    this.updatedAt



            };


        }



    }



    global.Supplier = Supplier;



})(window);
