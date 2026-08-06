/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/supplier-analysis.js


 Sprint:
 2.5.4


 Build:
 Enterprise Supplier Analysis Layer


 Description:
 Supplier Performance Analysis Service


==================================================
*/


(function(global){


"use strict";



class SupplierAnalysis {



    constructor(){


        this.supplierStorage =

            new SupplierStorage();



        this.purchaseStorage =

            new PurchaseStorage();



        this.quotationStorage =

            new QuotationStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        const stores = [


            this.supplierStorage,


            this.purchaseStorage,


            this.quotationStorage


        ];





        for(

            const store of stores

        ){


            if(store.init){


                await store.init();


            }


        }


    }






    /*
    ==============================================

    Supplier Summary

    供應商總覽

    ==============================================
    */


    async summary(
        supplierId
    ){



        const supplier =


            await this.supplierStorage.get(

                supplierId

            );





        if(!supplier){


            return null;


        }





        const purchases =


            await this.purchaseStorage.findBySupplier(

                supplierId

            );





        const quotations =


            await this.quotationStorage.findBySupplier(

                supplierId

            );





        return {



            supplierId:


                supplierId,



            supplierName:


                supplier.name,



            purchaseCount:


                purchases.length,



            quotationCount:


                quotations.length,



            rating:


                supplier.averageRating || 0



        };


    }






    /*
    ==============================================

    Purchase Ranking

    採購金額排行

    ==============================================
    */


    supplierPurchaseRanking(
        purchases
    ){



        const map = {};





        if(

            !Array.isArray(purchases)

        ){


            return [];


        }





        purchases.forEach(

            item=>{


                const id =


                    item.supplierId ||

                    "UNKNOWN";





                if(!map[id]){


                    map[id] = {



                        supplierId:


                            id,



                        amount:


                            0,



                        count:


                            0



                    };


                }





                map[id].amount +=


                    Number(

                        item.totalAmount || 0

                    );





                map[id].count++;





            }

        );





        return Object.values(

            map

        )

        .sort(

            (a,b)=>{


                return (

                    b.amount -

                    a.amount

                );


            }

        );


    }






    /*
    ==============================================

    Price Performance

    價格分析

    ==============================================
    */


    calculatePricePerformance(
        quotations
    ){



        if(

            !Array.isArray(quotations)

        ){


            return [];


        }





        const map = {};





        quotations.forEach(

            item=>{


                const id =


                    item.supplierId ||

                    "UNKNOWN";





                if(!map[id]){


                    map[id] = {



                        supplierId:


                            id,



                        total:


                            0,



                        count:


                            0



                    };


                }





                map[id].total +=


                    Number(

                        item.amount || 0

                    );





                map[id].count++;





            }

        );





        return Object.values(

            map

        )

        .map(

            item=>{


                return {



                    supplierId:


                        item.supplierId,



                    averagePrice:


                        Number(

                            (

                                item.total /

                                item.count

                            )

                            .toFixed(2)

                        )



                };


            }

        );


    }






    /*
    ==============================================

    Performance Score

    綜合評估

    ==============================================
    */


    calculatePerformance(
        supplier
    ){



        const rating =


            Number(

                supplier.averageRating || 0

            );





        const purchaseScore =


            Number(

                supplier.purchaseScore || 0

            );





        const deliveryScore =


            Number(

                supplier.deliveryScore || 0

            );





        return Number(

            (

                rating * 0.5 +

                purchaseScore * 0.3 +

                deliveryScore * 0.2

            )

            .toFixed(2)

        );


    }






    /*
    ==============================================

    Ranking

    供應商排名

    ==============================================
    */


    async ranking(){



        const suppliers =


            await this.supplierStorage.getAll();





        return suppliers.map(

            supplier=>{


                return {



                    ...supplier,



                    performanceScore:


                        this.calculatePerformance(

                            supplier

                        )



                };


            }

        )

        .sort(

            (a,b)=>{


                return (

                    b.performanceScore -

                    a.performanceScore

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






global.SupplierAnalysis =

    SupplierAnalysis;



})(window);
