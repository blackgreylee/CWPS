/*
==================================================

 CWPS Enterprise

 File:
 src/js/supplier/supplier-rating.js


 Sprint:
 2.9.21


 Build:
 Enterprise Supplier Rating Analysis Layer


 Description:
 Supplier Evaluation System


==================================================
*/


(function(global){

"use strict";



class SupplierRating {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "supplierRatings"

            );


    }





    /*
    ==============================================

    Get All Ratings

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Supplier Ratings

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

    Create Rating

    ==============================================
    */


    create(

        rating

    ){



        const score =

            this.calculateScore(

                rating

            );





        const data = {


            ...rating,


            score,


            grade:

                this.getGrade(

                    score

                ),


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

    Calculate Score

    ==============================================
    */


    calculateScore(

        rating

    ){



        const quality =

            Number(

                rating.quality || 0

            );



        const delivery =

            Number(

                rating.delivery || 0

            );



        const price =

            Number(

                rating.price || 0

            );





        const service =

            Number(

                rating.service || 0

            );





        return Math.round(

            quality * 0.35 +

            delivery * 0.30 +

            price * 0.20 +

            service * 0.15

        );



    }





    /*
    ==============================================

    Grade

    ==============================================
    */


    getGrade(

        score

    ){



        if(score >= 90){


            return "A";


        }



        if(score >= 80){


            return "B";


        }



        if(score >= 70){


            return "C";


        }



        return "D";


    }





    /*
    ==============================================

    Latest Rating

    ==============================================
    */


    latest(

        supplierId

    ){



        const list =

            this.getBySupplier(

                supplierId

            );





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

    Average Score

    ==============================================
    */


    average(

        supplierId

    ){



        const list =

            this.getBySupplier(

                supplierId

            );





        if(!list.length){


            return 0;


        }





        return Math.round(

            list.reduce(

                (sum,item)=>{


                    return sum +

                    Number(

                        item.score

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

    Delete Rating

    ==============================================
    */


    delete(

        ratingId

    ){



        return this.collection.delete(

            ratingId

        );


    }



}





global.SupplierRating =

    SupplierRating;



})(window);
