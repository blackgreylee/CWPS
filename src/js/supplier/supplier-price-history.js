/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-price-history.js


 Sprint:
 2.9.22


 Build:
 Enterprise Supplier Price History Layer


 Description:
 Supplier Material Price Tracking System


==================================================
*/


(function(global){

"use strict";



class SupplierPriceHistory {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "supplierPriceHistory"

            );


    }





    /*
    ==============================================

    Get All Records

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get By Supplier

    ==============================================
    */


    getBySupplier(

        supplierId

    ){



        return this.collection.where({

            supplierId

        });


    }





    /*
    ==============================================

    Get By Material

    ==============================================
    */


    getByMaterial(

        materialId

    ){



        return this.collection.where({

            materialId

        });


    }





    /*
    ==============================================

    Get Supplier Material History

    ==============================================
    */


    getHistory(

        supplierId,

        materialId

    ){



        return this.collection.where({

            supplierId,

            materialId

        });


    }





    /*
    ==============================================

    Create Price Record

    ==============================================
    */


    create(

        record

    ){



        const data = {


            ...record,


            createDate:

                new Date()

                .toISOString()



        };





        return this.collection.insert(

            data

        );


    }





    /*
    ==============================================

    Latest Price

    ==============================================
    */


    latestPrice(

        supplierId,

        materialId

    ){



        const list =

            this.getHistory(

                supplierId,

                materialId

            );





        if(!list.length){


            return null;


        }





        return list.sort(

            (a,b)=>{


                return new Date(

                    b.createDate

                )

                -

                new Date(

                    a.createDate

                );


            }

        )[0];



    }





    /*
    ==============================================

    Average Price

    ==============================================
    */


    averagePrice(

        supplierId,

        materialId

    ){



        const list =

            this.getHistory(

                supplierId,

                materialId

            );





        if(!list.length){


            return 0;


        }





        return (

            list.reduce(

                (sum,item)=>{


                    return sum +

                    Number(

                        item.unitPrice || 0

                    );


                },

                0

            )

            /

            list.length

        );



    }





    /*
    ==============================================

    Price Trend

    ==============================================
    */


    trend(

        supplierId,

        materialId

    ){



        const list =

            this.getHistory(

                supplierId,

                materialId

            )

            .sort(

                (a,b)=>{


                    return new Date(

                        a.createDate

                    )

                    -

                    new Date(

                        b.createDate

                    );


                }

            );





        return list.map(

            item => ({


                date:

                    item.createDate,


                price:

                    item.unitPrice



            })

        );



    }





    /*
    ==============================================

    Highest / Lowest

    ==============================================
    */


    range(

        supplierId,

        materialId

    ){



        const list =

            this.getHistory(

                supplierId,

                materialId

            );





        if(!list.length){


            return null;


        }





        const prices =

            list.map(

                item =>

                Number(

                    item.unitPrice || 0

                )

            );





        return {


            min:

                Math.min(

                    ...prices

                ),


            max:

                Math.max(

                    ...prices

                )



        };



    }





    /*
    ==============================================

    Delete Record

    ==============================================
    */


    delete(

        id

    ){



        return this.collection.delete(

            id

        );


    }



}





global.SupplierPriceHistory =

    SupplierPriceHistory;



})(window);
