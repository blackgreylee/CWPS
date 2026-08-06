/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-price-history.js


 Sprint:
 2.4.3


 Build:
 Enterprise Supplier Price History Layer


 Description:
 Supplier Historical Price Analysis Service


==================================================
*/


(function(global){


"use strict";



class SupplierPriceHistory {



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

    Add Price Record

    建立價格紀錄

    ==============================================
    */


    async addRecord(
        supplierId,
        priceData
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





        supplier.priceHistory =


            supplier.priceHistory || [];





        const record = {



            supplierId:



                supplierId,



            materialCode:



                priceData.materialCode,



            materialName:



                priceData.materialName,



            unit:



                priceData.unit,



            price:



                Number(

                    priceData.price || 0

                ),



            currency:



                priceData.currency || "TWD",



            source:



                priceData.source || "quotation",



            date:



                priceData.date ||

                new Date()

                .toISOString(),



            createdAt:



                new Date()

                .toISOString()



        };





        supplier.priceHistory.push(

            record

        );





        return await this.storage.update(

            supplier

        );


    }






    /*
    ==============================================

    Get Price History

    查詢價格紀錄

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





        return supplier.priceHistory || [];



    }






    /*
    ==============================================

    Find Material Price

    查詢指定材料價格

    ==============================================
    */


    async findMaterialPrice(
        supplierId,
        materialCode
    ){



        const history =


            await this.getHistory(

                supplierId

            );





        return history.filter(

            item =>


                item.materialCode ===

                materialCode



        );


    }






    /*
    ==============================================

    Get Latest Price

    最新價格

    ==============================================
    */


    async getLatestPrice(
        supplierId,
        materialCode
    ){



        const list =


            await this.findMaterialPrice(

                supplierId,

                materialCode

            );





        if(

            list.length === 0

        ){


            return null;


        }





        list.sort(

            (a,b)=>{


                return new Date(

                    b.date

                )

                -

                new Date(

                    a.date

                );


            }

        );





        return list[0];


    }






    /*
    ==============================================

    Average Price

    平均價格

    ==============================================
    */


    async getAveragePrice(
        supplierId,
        materialCode
    ){



        const list =


            await this.findMaterialPrice(

                supplierId,

                materialCode

            );





        if(

            list.length === 0

        ){


            return 0;


        }





        const total =


            list.reduce(

                (sum,item)=>{


                    return sum +

                    Number(

                        item.price || 0

                    );


                },

                0

            );





        return Number(

            (

                total /

                list.length

            )

            .toFixed(2)

        );


    }






    /*
    ==============================================

    Price Trend

    價格趨勢分析

    ==============================================
    */


    async analyzeTrend(
        supplierId,
        materialCode
    ){



        const list =


            await this.findMaterialPrice(

                supplierId,

                materialCode

            );





        if(

            list.length < 2

        ){


            return {


                trend:

                    "INSUFFICIENT_DATA",


                change:

                    0


            };


        }





        list.sort(

            (a,b)=>{


                return new Date(

                    a.date

                )

                -

                new Date(

                    b.date

                );


            }

        );





        const first =


            Number(

                list[0].price

            );





        const last =


            Number(

                list[

                    list.length - 1

                ].price

            );





        const change =



            (

                (

                    last -

                    first

                )

                /

                first

            )

            *

            100;





        return {



            trend:



                change > 0

                ?

                "UP"

                :

                change < 0

                ?

                "DOWN"

                :

                "STABLE",




            change:



                Number(

                    change.toFixed(2)

                )



        };


    }






}






global.SupplierPriceHistory =

    SupplierPriceHistory;



})(window);
