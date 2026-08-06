/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/procurement-view.js


 Sprint:
 2.7.3


 Build:
 Enterprise Procurement View Layer


 Description:
 Procurement Workflow UI View


==================================================
*/


(function(global){


"use strict";



class ProcurementView {



    constructor(){


        this.controller = null;


        this.container = null;


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(
        controller,
        containerId = "app"
    ){


        this.controller = controller;



        this.container =


            document.getElementById(

                containerId

            );





        this.bindEvents();


    }






    /*
    ==============================================

    Render Procurement Dashboard

    ==============================================
    */


    render(
        data
    ){



        if(!this.container){


            return;


        }





        const requirements =

            data.requirements || [];



        const quotations =

            data.quotations || [];



        const purchases =

            data.purchases || [];



        const shipments =

            data.shipments || [];



        const invoices =

            data.invoices || [];






        this.container.innerHTML = `



        <div class="procurement-page">


            <div class="page-header">


                <h2>

                    Procurement Management

                </h2>


            </div>





            <div class="summary-card">


                <div>

                    Requirement

                    <br>

                    <b>

                    ${requirements.length}

                    </b>

                </div>



                <div>

                    Quotation

                    <br>

                    <b>

                    ${quotations.length}

                    </b>

                </div>



                <div>

                    Purchase

                    <br>

                    <b>

                    ${purchases.length}

                    </b>

                </div>



                <div>

                    Shipment

                    <br>

                    <b>

                    ${shipments.length}

                    </b>

                </div>



                <div>

                    Invoice

                    <br>

                    <b>

                    ${invoices.length}

                    </b>

                </div>


            </div>





            <hr>





            <h3>

                Purchase Orders

            </h3>



            <table class="table">


                <thead>

                    <tr>

                        <th>

                        Purchase ID

                        </th>


                        <th>

                        Supplier

                        </th>


                        <th>

                        Amount

                        </th>


                        <th>

                        Status

                        </th>


                    </tr>


                </thead>



                <tbody>


                    ${

                        this.renderPurchases(

                            purchases

                        )

                    }


                </tbody>


            </table>


        </div>



        `;


    }






    /*
    ==============================================

    Render Purchase Rows

    ==============================================
    */


    renderPurchases(
        purchases
    ){



        if(

            purchases.length === 0

        ){


            return `


            <tr>

                <td colspan="4">

                    No Data

                </td>

            </tr>


            `;


        }






        return purchases.map(

            item=>{


                return `


                <tr>


                    <td>

                        ${

                            item.id || ""

                        }

                    </td>



                    <td>

                        ${

                            item.supplierName || ""

                        }

                    </td>



                    <td>

                        ${

                            item.totalAmount || 0

                        }

                    </td>



                    <td>

                        ${

                            item.status || ""

                        }

                    </td>


                </tr>


                `;


            }

        )

        .join("");



    }






    /*
    ==============================================

    Project Summary

    ==============================================
    */


    async showProjectSummary(
        projectId
    ){



        const summary =


            await this.controller.projectSummary(

                projectId

            );





        alert(

            JSON.stringify(

                summary,

                null,

                4

            )

        );


    }






    /*
    ==============================================

    Create Requirement

    ==============================================
    */


    showRequirementForm(){



        const material =


            prompt(

                "Material Name"

            );





        const quantity =


            prompt(

                "Quantity"

            );





        if(!material){


            return;


        }





        this.controller.createRequirement({



            materialName:

                material,



            quantity:

                Number(quantity || 0)



        });


    }






    /*
    ==============================================

    Refresh

    ==============================================
    */


    async refresh(){



        await this.controller.load();



    }






    /*
    ==============================================

    Events

    ==============================================
    */


    bindEvents(){



        document.addEventListener(

            "click",

            event=>{


                if(

                    event.target.id ===

                    "btn-create-requirement"

                ){


                    this.showRequirementForm();


                }


            }

        );


    }





}






global.ProcurementView =

    ProcurementView;



})(window);
