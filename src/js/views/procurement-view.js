/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/procurement-view.js


 Sprint:
 2.9.34


 Build:
 Enterprise Procurement View Layer


 Description:
 Procurement Workflow User Interface View


==================================================
*/


(function(global){

"use strict";



class ProcurementView {



    constructor(){


        this.controller =

            new global.ProcurementController();


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

    Render Main

    ==============================================
    */


    render(){



        if(!this.container){


            return;


        }





        const summary =

            this.controller

            .summary();





        this.container.innerHTML =

        `

        <div class="procurement-view">


            <h2>

                Procurement Management

            </h2>



            <div class="procurement-summary">


                <p>

                Project:

                ${

                summary.project || ""

                }

                </p>


            </div>



            <div id="requirement-area">


            </div>


        </div>

        `;



        this.renderRequirements();



    }





    /*
    ==============================================

    Requirement List

    ==============================================
    */


    renderRequirements(){



        const list =

            this.controller

            .getRequirements();





        const area =

            document.getElementById(

                "requirement-area"

            );





        if(!area){

            return;

        }





        area.innerHTML =


        `

        <h3>

        Procurement Requirement

        </h3>



        ${

        list.map(

            item =>


            `

            <div class="requirement-card">


                <p>

                Material:

                ${item.materialName || ""}

                </p>


                <p>

                Quantity:

                ${item.quantity || 0}

                </p>


                <p>

                Status:

                ${item.status || ""}

                </p>



                <button

                onclick="procurementView.quote('${item.id}')">

                Request Quote

                </button>



            </div>


            `


        )

        .join("")


        }

        `;



    }





    /*
    ==============================================

    Create Quotation

    ==============================================
    */


    quote(

        requirementId

    ){



        return this.controller

            .createQuotationRequest(

                requirementId

            );



    }





    /*
    ==============================================

    Purchase List

    ==============================================
    */


    showPurchaseList(){



        const data =

            this.controller

            .purchaseEngine

            .getAll();





        this.container.innerHTML =

        data.map(

            item =>


            `

            <div class="purchase-card">


                Purchase No:

                ${item.number}


                <br>


                Amount:

                ${item.amount}


                <br>


                Status:

                ${item.status}



            </div>


            `


        )

        .join("");



    }





    /*
    ==============================================

    Shipment Status

    ==============================================
    */


    showShipmentStatus(){



        const data =

            this.controller

            .shipmentEngine

            .getAll();





        this.container.innerHTML =

        data.map(

            item =>


            `

            <div>


            Shipment:

            ${item.id}


            Status:

            ${item.status}



            </div>


            `


        )

        .join("");



    }





    /*
    ==============================================

    Invoice Status

    ==============================================
    */


    showInvoiceStatus(){



        const data =

            this.controller

            .invoiceEngine

            .getAll();





        this.container.innerHTML =

        data.map(

            item =>


            `

            <div>


            Invoice:

            ${item.number}


            Amount:

            ${item.amount}


            Status:

            ${item.status}



            </div>


            `


        )

        .join("");



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





global.ProcurementView =

    ProcurementView;



})(window);
