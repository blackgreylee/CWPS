/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/dashboard-view.js


 Sprint:
 2.7.5


 Build:
 Enterprise Dashboard View Layer


 Description:
 Dashboard UI View


==================================================
*/


(function(global){


"use strict";



class DashboardView {



    constructor(){


        this.service = null;


        this.container = null;


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(
        service,
        containerId = "app"
    ){



        this.service = service;



        this.container =


            document.getElementById(

                containerId

            );



    }






    /*
    ==============================================

    Load Dashboard

    ==============================================
    */


    async load(){



        const data =


            await this.service.getDashboard();





        this.render(

            data

        );





        return data;


    }






    /*
    ==============================================

    Render Dashboard

    ==============================================
    */


    render(
        data
    ){



        if(!this.container){


            return;


        }





        const project =

            data.project || {};



        const procurement =

            data.procurement || {};



        const supplier =

            data.supplier || {};



        const material =

            data.material || {};






        this.container.innerHTML = `



        <div class="dashboard-page">


            <div class="page-header">


                <h2>

                    CWPS Dashboard

                </h2>


            </div>





            <div class="dashboard-cards">


                ${

                    this.card(

                        "Projects",

                        project.count || 0

                    )

                }



                ${

                    this.card(

                        "Materials",

                        material.count || 0

                    )

                }



                ${

                    this.card(

                        "Purchase Amount",

                        procurement.amount || 0

                    )

                }



                ${

                    this.card(

                        "Suppliers",

                        supplier.count || 0

                    )

                }


            </div>





            <div class="dashboard-section">


                <h3>

                    Procurement Progress

                </h3>



                ${

                    this.renderProgress(

                        procurement

                    )

                }


            </div>





            <div class="dashboard-section">


                <h3>

                    Supplier Ranking

                </h3>



                ${

                    this.renderSupplier(

                        supplier.ranking

                    )

                }


            </div>



        </div>



        `;


    }






    /*
    ==============================================

    Card Component

    ==============================================
    */


    card(
        title,
        value
    ){



        return `



        <div class="dashboard-card">


            <div class="card-title">

                ${title}

            </div>



            <div class="card-value">

                ${value}

            </div>


        </div>


        `;


    }






    /*
    ==============================================

    Procurement Progress

    ==============================================
    */


    renderProgress(
        data
    ){



        return `



        <div class="progress-box">


            Requirement:

            ${

                data.requirementProgress || 0

            }%



            <br>



            Purchase:

            ${

                data.purchaseProgress || 0

            }%



            <br>



            Shipment:

            ${

                data.shipmentProgress || 0

            }%



            <br>



            Invoice:

            ${

                data.invoiceProgress || 0

            }%



        </div>


        `;


    }






    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */


    renderSupplier(
        list
    ){



        if(

            !Array.isArray(list)

        ){


            return "No Data";


        }





        return `



        <ol>


            ${

                list.map(

                    item=>{


                        return `


                        <li>


                            ${

                                item.name || ""

                            }


                            -

                            Score:

                            ${

                                item.performanceScore || 0

                            }


                        </li>


                        `;


                    }

                )

                .join("")

            }


        </ol>


        `;


    }






    /*
    ==============================================

    Refresh

    ==============================================
    */


    async refresh(){



        return await this.load();



    }





}






global.DashboardView =

    DashboardView;



})(window);
