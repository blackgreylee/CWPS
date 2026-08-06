/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/supplier-controller.js


 Sprint:
 2.6.1


 Build:
 Enterprise Supplier Controller Layer


 Description:
 Supplier UI Controller


==================================================
*/


(function(global){


"use strict";



class SupplierController {



    constructor(){


        this.engine =

            new SupplierEngine();



        this.rating =

            new SupplierRating();



        this.priceHistory =

            new SupplierPriceHistory();



        this.analysis =

            new SupplierAnalysis();



        this.view = null;


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(view){



        this.view = view;



        await this.engine.init();


        await this.rating.init();


        await this.priceHistory.init();


        await this.analysis.init();




        await this.load();


    }






    /*
    ==============================================

    Load Supplier List

    ==============================================
    */


    async load(){



        const suppliers =


            await this.engine.getAll();





        if(this.view && this.view.render){


            this.view.render(

                suppliers

            );


        }





        return suppliers;


    }






    /*
    ==============================================

    Create Supplier

    ==============================================
    */


    async create(
        data
    ){



        const result =


            await this.engine.create(

                data

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Update Supplier

    ==============================================
    */


    async update(
        data
    ){



        const result =


            await this.engine.update(

                data

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Disable Supplier

    ==============================================
    */


    async disable(
        supplierId
    ){



        const result =


            await this.engine.disable(

                supplierId

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Get Supplier Detail

    ==============================================
    */


    async detail(
        supplierId
    ){



        return await this.engine.get(

            supplierId

        );


    }






    /*
    ==============================================

    Rating

    ==============================================
    */


    async addRating(
        supplierId,
        data
    ){



        const result =


            await this.rating.createEvaluation(

                supplierId,

                data

            );





        await this.load();





        return result;


    }






    /*
    ==============================================

    Price History

    ==============================================
    */


    async addPrice(
        supplierId,
        data
    ){



        return await this.priceHistory.addRecord(

            supplierId,

            data

        );


    }






    async getPriceHistory(
        supplierId
    ){



        return await this.priceHistory.getHistory(

            supplierId

        );


    }






    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */


    async ranking(){



        return await this.analysis.ranking();



    }






    /*
    ==============================================

    Recommendation

    ==============================================
    */


    async recommend(
        limit = 5
    ){



        return await this.analysis.recommend(

            limit

        );


    }






    /*
    ==============================================

    Search

    ==============================================
    */


    async search(
        keyword
    ){



        const suppliers =


            await this.engine.getAll();





        if(!keyword){


            return suppliers;


        }





        return suppliers.filter(

            item=>{


                return (

                    item.name &&

                    item.name.includes(

                        keyword

                    )

                );


            }

        );


    }





}






global.SupplierController =

    SupplierController;



})(window);
