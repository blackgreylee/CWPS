/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/cost-analysis.js


 Sprint:
 2.5.1


 Build:
 Enterprise Cost Analysis Layer


 Description:
 Procurement Cost Analysis Service


==================================================
*/


(function(global){


"use strict";



class CostAnalysis {



    constructor(){


        this.purchaseStorage =

            new PurchaseStorage();


        this.invoiceStorage =

            new InvoiceStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        if(this.purchaseStorage.init){


            await this.purchaseStorage.init();


        }


        if(this.invoiceStorage.init){


            await this.invoiceStorage.init();


        }


    }






    /*
    ==============================================

    Calculate Purchase Cost

    計算採購成本

    ==============================================
    */


    calculatePurchaseCost(
        purchase
    ){



        if(!purchase){


            return 0;


        }





        if(

            purchase.totalAmount

        ){


            return Number(

                purchase.totalAmount

            );


        }





        if(

            !purchase.items

        ){


            return 0;


        }





        return purchase.items.reduce(

            (sum,item)=>{


                return (

                    sum +

                    (

                        Number(

                            item.price || 0

                        )

                        *

                        Number(

                            item.quantity || 0

                        )

                    )

                );


            },

            0

        );


    }






    /*
    ==============================================

    Calculate Invoice Cost

    ==============================================
    */


    calculateInvoiceCost(
        invoices
    ){



        if(

            !Array.isArray(invoices)

        ){


            return 0;


        }





        return invoices.reduce(

            (sum,item)=>{


                return (

                    sum +

                    Number(

                        item.amount || 0

                    )

                );


            },

            0

        );


    }






    /*
    ==============================================

    Project Cost Summary

    專案成本分析

    ==============================================
    */


    async projectSummary(
        projectId
    ){



        const purchases =


            await this.purchaseStorage.findByProject(

                projectId

            );





        const invoices =


            await this.invoiceStorage.findByProject(

                projectId

            );





        const purchaseCost =


            purchases.reduce(

                (sum,item)=>{


                    return (

                        sum +

                        this.calculatePurchaseCost(

                            item

                        )

                    );


                },

                0

            );





        const invoiceCost =


            this.calculateInvoiceCost(

                invoices

            );





        return {


            projectId:


                projectId,



            purchaseCost:


                purchaseCost,



            invoiceCost:


                invoiceCost,



            totalCost:


                Math.max(

                    purchaseCost,

                    invoiceCost

                ),



            purchaseCount:


                purchases.length,



            invoiceCount:


                invoices.length



        };


    }






    /*
    ==============================================

    Material Cost Breakdown

    材料成本分析

    ==============================================
    */


    materialBreakdown(
        items
    ){



        if(

            !Array.isArray(items)

        ){


            return [];


        }





        const map = {};





        items.forEach(

            item=>{


                const code =


                    item.materialCode ||

                    "UNKNOWN";





                if(

                    !map[code]

                ){


                    map[code] = {



                        materialCode:

                            code,



                        materialName:

                            item.materialName,



                        quantity:

                            0,



                        amount:

                            0



                    };


                }





                map[code].quantity +=


                    Number(

                        item.quantity || 0

                    );





                map[code].amount +=


                    Number(

                        item.amount ||

                        (

                            item.price *

                            item.quantity

                        )

                        ||

                        0

                    );


            }

        );





        return Object.values(

            map

        );


    }






    /*
    ==============================================

    Cost Percentage

    成本比例

    ==============================================
    */


    calculatePercentage(
        items
    ){



        const total =


            items.reduce(

                (sum,item)=>{


                    return sum +

                    Number(

                        item.amount || 0

                    );


                },

                0

            );





        return items.map(

            item=>{


                return {


                    ...item,



                    percentage:


                        total === 0

                        ?

                        0

                        :

                        Number(

                            (

                                item.amount /

                                total *

                                100

                            )

                            .toFixed(2)

                        )



                };


            }

        );


    }






    /*
    ==============================================

    Compare Budget

    預算差異分析

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



            difference:


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






global.CostAnalysis =

    CostAnalysis;



})(window);
