/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/procurement-analysis.js


 Sprint:
 2.5.3


 Build:
 Enterprise Procurement Analysis Layer


 Description:
 Procurement Performance Analysis Service


==================================================
*/


(function(global){


"use strict";



class ProcurementAnalysis {



    constructor(){


        this.requirementStorage =

            new RequirementStorage();



        this.quotationStorage =

            new QuotationStorage();



        this.purchaseStorage =

            new PurchaseStorage();



        this.shipmentStorage =

            new ShipmentStorage();



        this.invoiceStorage =

            new InvoiceStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){



        const stores = [


            this.requirementStorage,


            this.quotationStorage,


            this.purchaseStorage,


            this.shipmentStorage,


            this.invoiceStorage


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

    Project Procurement Summary

    專案採購總覽

    ==============================================
    */


    async projectSummary(
        projectId
    ){



        const requirements =


            await this.requirementStorage.findByProject(

                projectId

            );





        const quotations =


            await this.quotationStorage.findByProject(

                projectId

            );





        const purchases =


            await this.purchaseStorage.findByProject(

                projectId

            );





        const shipments =


            await this.shipmentStorage.findByProject(

                projectId

            );





        const invoices =


            await this.invoiceStorage.findByProject(

                projectId

            );





        return {


            projectId:


                projectId,



            requirementCount:


                requirements.length,



            quotationCount:


                quotations.length,



            purchaseCount:


                purchases.length,



            shipmentCount:


                shipments.length,



            invoiceCount:


                invoices.length



        };


    }






    /*
    ==============================================

    Calculate Purchase Amount

    採購金額

    ==============================================
    */


    calculatePurchaseAmount(
        purchases
    ){



        if(

            !Array.isArray(purchases)

        ){


            return 0;


        }





        return purchases.reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.totalAmount ||

                    0

                );


            },

            0

        );


    }






    /*
    ==============================================

    Calculate Progress

    採購完成率

    ==============================================
    */


    calculateProgress(
        total,
        completed
    ){



        if(

            Number(total) === 0

        ){


            return 0;


        }





        return Number(

            (

                completed /

                total *

                100

            )

            .toFixed(2)

        );


    }






    /*
    ==============================================

    Procurement Status Summary

    狀態統計

    ==============================================
    */


    summarizeStatus(
        list
    ){



        if(

            !Array.isArray(list)

        ){


            return {};

        }





        const result = {};





        list.forEach(

            item=>{


                const status =


                    item.status ||

                    "UNKNOWN";





                if(

                    !result[status]

                ){


                    result[status] = 0;


                }





                result[status]++;


            }

        );





        return result;


    }






    /*
    ==============================================

    Quotation Comparison

    報價比較

    ==============================================
    */


    compareQuotation(
        quotations
    ){



        if(

            !Array.isArray(quotations)

        ){


            return [];


        }





        return quotations.sort(

            (a,b)=>{


                return (

                    Number(

                        a.amount || 0

                    )

                    -

                    Number(

                        b.amount || 0

                    )

                );


            }

        );


    }






    /*
    ==============================================

    Supplier Cost Ranking

    供應商採購排行

    ==============================================
    */


    supplierRanking(
        purchases
    ){



        const map = {};





        purchases.forEach(

            item=>{


                const supplier =


                    item.supplierId ||

                    "UNKNOWN";





                if(

                    !map[supplier]

                ){


                    map[supplier] = {



                        supplierId:

                            supplier,



                        amount:

                            0



                    };


                }





                map[supplier].amount +=


                    Number(

                        item.totalAmount ||

                        0

                    );


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

    Budget Variance

    預算差異

    ==============================================
    */


    compareBudget(
        budget,
        actual
    ){



        return {



            budget:


                Number(

                    budget || 0

                ),



            actual:


                Number(

                    actual || 0

                ),



            variance:


                Number(

                    actual || 0

                )

                -

                Number(

                    budget || 0

                )



        };


    }






}






global.ProcurementAnalysis =

    ProcurementAnalysis;



})(window);
