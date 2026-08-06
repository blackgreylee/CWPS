/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-rating.js


 Sprint:
 2.4.2


 Build:
 Enterprise Supplier Evaluation Layer


 Description:
 Supplier Rating & Evaluation Service


==================================================
*/


(function(global){


"use strict";



class SupplierRating {



    constructor(){


        this.storage =

            new SupplierStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        if(this.storage.init){


            await this.storage.init();


        }


    }






    /*
    ==============================================

    Create Evaluation

    建立評估紀錄

    ==============================================
    */


    async createEvaluation(
        supplierId,
        evaluation
    ){



        const supplier =


            await this.storage.get(

                supplierId

            );





        if(!supplier){


            throw new Error(

                "Supplier not found"

            );


        }





        supplier.ratings =


            supplier.ratings || [];





        const record = {



            ...evaluation,



            supplierId:


                supplierId,



            totalScore:


                this.calculateScore(

                    evaluation

                ),



            createdAt:


                new Date()

                .toISOString()



        };





        supplier.ratings.push(

            record

        );





        supplier.averageRating =


            this.calculateAverage(

                supplier.ratings

            );





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Calculate Score

    計算總分

    ==============================================
    */


    calculateScore(
        data
    ){



        const price =


            Number(

                data.price || 0

            );





        const quality =


            Number(

                data.quality || 0

            );





        const delivery =


            Number(

                data.delivery || 0

            );





        const service =


            Number(

                data.service || 0

            );





        return (



            price * 0.3 +


            quality * 0.3 +


            delivery * 0.25 +


            service * 0.15



        );


    }






    /*
    ==============================================

    Average Rating

    平均評分

    ==============================================
    */


    calculateAverage(
        ratings
    ){



        if(

            !ratings ||

            ratings.length === 0

        ){


            return 0;


        }





        const total =


            ratings.reduce(

                (sum,item)=>{


                    return (

                        sum +

                        Number(

                            item.totalScore || 0

                        )

                    );


                },

                0

            );





        return Number(

            (

                total /

                ratings.length

            )

            .toFixed(2)

        );


    }






    /*
    ==============================================

    Get Rating History

    ==============================================
    */


    async getHistory(
        supplierId
    ){



        const supplier =


            await this.storage.get(

                supplierId

            );





        if(!supplier){


            return [];


        }





        return supplier.ratings || [];



    }






    /*
    ==============================================

    Get Ranking

    供應商排名

    ==============================================
    */


    async ranking(){



        const suppliers =


            await this.storage.getAll();





        return suppliers.sort(

            (a,b)=>{


                return (

                    Number(

                        b.averageRating || 0

                    )

                    -

                    Number(

                        a.averageRating || 0

                    )

                );


            }

        );


    }






    /*
    ==============================================

    Recommend Supplier

    推薦供應商

    ==============================================
    */


    async recommend(
        limit = 5
    ){



        const list =


            await this.ranking();





        return list.slice(

            0,

            limit

        );


    }




}






global.SupplierRating =

    SupplierRating;



})(window);
