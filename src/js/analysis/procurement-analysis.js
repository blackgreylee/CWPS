/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/procurement-analysis.js


 Sprint:
 2.9.25


 Build:
 Enterprise Procurement Analysis Engine Layer


 Description:
 Procurement Workflow Analysis Engine


==================================================
*/


(function(global){

"use strict";



class ProcurementAnalysis {



    constructor(){


        this.requirementStorage =

            new global.RequirementStorage();


        this.quotationStorage =

            new global.QuotationStorage();


        this.purchaseStorage =

            new global.PurchaseStorage();


        this.shipmentStorage =

            new global.ShipmentStorage();


        this.invoiceStorage =

            new global.InvoiceStorage();



    }





    /*
    ==============================================

    Requirement Analysis

    ==============================================
    */


    analyzeRequirement(){



        const list =

            this.requirementStorage

            .getAll();





        return {


            count:

                list.length,


            totalQuantity:

                list.reduce(

                    (sum,item)=>{


                        return sum +

                        Number(

                            item.quantity || 0

                        );


                    },

                    0

                ),


            pending:

                list.filter(

                    item=>

                    item.status==="Pending"

                )

                .length



        };


    }





    /*
    ==============================================

    Quotation Analysis

    ==============================================
    */


    analyzeQuotation(){



        const list =

            this.quotationStorage

            .getAll();





        return {


            count:

                list.length,


            approved:

                list.filter(

                    item=>

                    item.status==="Approved"

                )

                .length,


            rejected:

                list.filter(

                    item=>

                    item.status==="Rejected"

                )

                .length



        };


    }





    /*
    ==============================================

    Purchase Analysis

    ==============================================
    */


    analyzePurchase(){



        const list =

            this.purchaseStorage

            .getAll();





        return {


            count:

                list.length,


            totalAmount:

                list.reduce(

                    (sum,item)=>{


                        return sum +

                        Number(

                            item.amount || 0

                        );


                    },

                    0

                ),


            completed:

                list.filter(

                    item=>

                    item.status==="Completed"

                )

                .length



        };


    }





    /*
    ==============================================

    Shipment Analysis

    ==============================================
    */


    analyzeShipment(){



        const list =

            this.shipmentStorage

            .getAll();





        return {


            count:

                list.length,


            shipped:

                list.filter(

                    item=>

                    item.status==="Shipped"

                )

                .length,


            received:

                list.filter(

                    item=>

                    item.status==="Received"

                )

                .length



        };


    }





    /*
    ==============================================

    Invoice Analysis

    ==============================================
    */


    analyzeInvoice(){



        const list =

            this.invoiceStorage

            .getAll();





        return {


            count:

                list.length,


            totalAmount:

                list.reduce(

                    (sum,item)=>{


                        return sum +

                        Number(

                            item.amount || 0

                        );


                    },

                    0

                ),


            paid:

                list.filter(

                    item=>

                    item.status==="Paid"

                )

                .length



        };


    }





    /*
    ==============================================

    Procurement Completion Rate

    ==============================================
    */


    completionRate(){



        const purchase =

            this.analyzePurchase();





        if(

            purchase.count===0

        ){


            return 0;


        }





        return Math.round(

            (

            purchase.completed

            /

            purchase.count

            )

            *

            100

        );



    }





    /*
    ==============================================

    Full Dashboard Summary

    ==============================================
    */


    summary(){



        return {


            requirement:

                this.analyzeRequirement(),


            quotation:

                this.analyzeQuotation(),


            purchase:

                this.analyzePurchase(),


            shipment:

                this.analyzeShipment(),


            invoice:

                this.analyzeInvoice(),


            completionRate:

                this.completionRate()



        };


    }



}





global.ProcurementAnalysis =

    ProcurementAnalysis;



})(window);
