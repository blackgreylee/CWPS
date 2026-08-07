/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/dashboard-view.js


 Sprint:
 2.9.36


 Build:
 Enterprise Dashboard View Layer


 Description:
 System Dashboard User Interface View


==================================================
*/


(function(global){

"use strict";



class DashboardView {



    constructor(){


        this.costAnalysis =

            new global.CostAnalysis();


        this.materialAnalysis =

            new global.MaterialAnalysis();


        this.procurementAnalysis =

            new global.ProcurementAnalysis();


        this.supplierAnalysis =

            new global.SupplierAnalysis();



        this.container =

            null;



    }





    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(

        containerId

    ){



        this.container =

            document.getElementById(

                containerId

            );





        this.render();



    }





    /*
    ==============================================

    Render Dashboard

    ==============================================
    */


    render(){



        if(!this.container){


            return;


        }





        const data =

            this.getDashboardData();





        this.container.innerHTML =


        `

        <div class="dashboard-view">


            <h2>

            CWPS Dashboard

            </h2>



            <div class="dashboard-cards">


                ${

                this.card(

                    "Material",

                    data.material.total

                )

                }



                ${

                this.card(

                    "Purchase Amount",

                    data.cost.total

                )

                }



                ${

                this.card(

                    "Procurement Complete",

                    data.procurement.completionRate

                    +"%"

                )

                }



                ${

                this.card(

                    "Supplier",

                    data.supplier.total

                )

                }



            </div>



            <div id="supplier-ranking">


            </div>



        </div>


        `;





        this.renderSupplierRanking(

            data.supplierRanking

        );



    }





    /*
    ==============================================

    Dashboard Data

    ==============================================
    */


    getDashboardData(){



        return {


            cost:

                this.costAnalysis

                .summary(),



            material:

                this.materialAnalysis

                .summary(),



            procurement:

                this.procurementAnalysis

                .summary(),



            supplier:

                this.supplierAnalysis

                .overview(),



            supplierRanking:

                this.supplierAnalysis

                .ranking()



        };



    }





    /*
    ==============================================

    KPI Card

    ==============================================
    */


    card(

        title,

        value

    ){



        return `


        <div class="dashboard-card">


            <h3>

            ${title}

            </h3>



            <div class="value">

            ${value}

            </div>


        </div>


        `;



    }





    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */


    renderSupplierRanking(

        list

    ){



        const area =

            document.getElementById(

                "supplier-ranking"

            );





        if(!area){

            return;

        }





        area.innerHTML =


        `


        <h3>

        Supplier Ranking

        </h3>



        ${

        list.map(

            (item,index)=>


            `

            <div>


            ${index+1}.


            ${item.supplierName}



            Score:

            ${item.score}



            </div>


            `


        )

        .join("")

        }



        `;



    }





    /*
    ==============================================

    Refresh

    ==============================================
    */


    refresh(){



        this.render();



    }



}





global.DashboardView =

    DashboardView;



})(window);
