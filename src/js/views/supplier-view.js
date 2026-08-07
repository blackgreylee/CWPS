/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/supplier-view.js


 Sprint:
 2.9.33


 Build:
 Enterprise Supplier View Layer


 Description:
 Supplier Management User Interface View


==================================================
*/


(function(global){

"use strict";



class SupplierView {



    constructor(){


        this.controller =

            new global.SupplierController();


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

    Render Supplier List

    ==============================================
    */


    render(){



        if(!this.container){


            return;


        }





        const suppliers =

            this.controller

            .getSuppliers();





        this.container.innerHTML =

        `

        <div class="supplier-view">


            <h2>

                Supplier Management

            </h2>



            <div class="supplier-list">


            ${

            suppliers.map(

                supplier =>

                this.renderSupplier(

                    supplier

                )

            )

            .join("")


            }


            </div>


        </div>

        `;



    }





    /*
    ==============================================

    Render Supplier Card

    ==============================================
    */


    renderSupplier(

        supplier

    ){



        return `


        <div class="supplier-card">


            <h3>

                ${supplier.name}

            </h3>


            <p>

            Code:

            ${supplier.code || ""}

            </p>


            <p>

            Status:

            ${supplier.status || ""}

            </p>



            <button

            onclick="supplierView.detail('${supplier.id}')">

                Detail

            </button>



        </div>


        `;


    }





    /*
    ==============================================

    Show Detail

    ==============================================
    */


    detail(

        supplierId

    ){



        const supplier =

            this.controller

            .getSupplier(

                supplierId

            );





        const rating =

            this.controller

            .getRating(

                supplierId

            );





        this.container.innerHTML =

        `


        <div class="supplier-detail">


            <h2>

            ${supplier.name}

            </h2>



            <p>

            Code:

            ${supplier.code || ""}

            </p>



            <p>

            Contact:

            ${supplier.contact || ""}

            </p>



            <h3>

            Rating

            </h3>



            ${

            rating.map(

                item =>


                `

                <div>

                Score:

                ${item.score}


                Grade:

                ${item.grade}


                </div>

                `


            )

            .join("")


            }



        </div>


        `;



    }





    /*
    ==============================================

    Search

    ==============================================
    */


    search(

        keyword

    ){



        const result =

            this.controller

            .search(

                keyword

            );





        this.renderSearchResult(

            result

        );



    }





    /*
    ==============================================

    Render Search Result

    ==============================================
    */


    renderSearchResult(

        list

    ){



        this.container.innerHTML =

        list.map(

            item =>


            `

            <div class="supplier-card">

                ${item.name}

            </div>

            `


        )

        .join("");



    }





    /*
    ==============================================

    Ranking

    ==============================================
    */


    showRanking(){



        const ranking =

            this.controller

            .ranking();





        this.container.innerHTML =

        `


        <h2>

        Supplier Ranking

        </h2>


        ${

        ranking.map(

            (item,index)=>

            `

            <div>

            ${index+1}.

            ${item.supplierName}


            Score:

            ${item.score}


            Grade:

            ${item.grade}


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





global.SupplierView =

    SupplierView;



})(window);
