/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/supplier-view.js


 Sprint:
 2.7.2


 Build:
 Enterprise Supplier View Layer


 Description:
 Supplier Management UI View


==================================================
*/


(function(global){


"use strict";



class SupplierView {



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

    Render Supplier List

    ==============================================
    */


    render(
        suppliers
    ){



        if(!this.container){


            return;


        }





        let html = `


        <div class="supplier-page">


            <div class="page-header">


                <h2>

                    Supplier Management

                </h2>


                <button

                    id="btn-create-supplier"

                    class="btn btn-primary"

                >

                    New Supplier

                </button>


                <button

                    id="btn-ranking-supplier"

                    class="btn btn-secondary"

                >

                    Ranking

                </button>


            </div>




            <table class="table">


                <thead>

                    <tr>

                        <th>
                            Supplier ID
                        </th>


                        <th>
                            Supplier Name
                        </th>


                        <th>
                            Contact
                        </th>


                        <th>
                            Rating
                        </th>


                        <th>
                            Status
                        </th>


                        <th>
                            Action
                        </th>


                    </tr>

                </thead>


                <tbody>


        `;





        suppliers.forEach(

            supplier=>{


                html += `


                <tr>


                    <td>

                        ${

                            supplier.id || ""

                        }

                    </td>



                    <td>

                        ${

                            supplier.name || ""

                        }

                    </td>



                    <td>

                        ${

                            supplier.contact || ""

                        }

                    </td>



                    <td>

                        ${

                            supplier.averageRating || 0

                        }

                    </td>



                    <td>

                        ${

                            supplier.status || ""

                        }

                    </td>



                    <td>


                        <button

                            class="btn-detail"

                            data-id="${

                                supplier.id

                            }"

                        >

                            Detail

                        </button>



                    </td>


                </tr>


                `;


            }

        );





        html += `


                </tbody>


            </table>


        </div>


        `;





        this.container.innerHTML = html;



        this.bindRowEvents();


    }






    /*
    ==============================================

    Create Supplier

    ==============================================
    */


    showCreateForm(){



        const name =


            prompt(

                "Supplier Name"

            );





        const contact =


            prompt(

                "Contact"

            );





        if(!name){


            return;


        }





        this.controller.create({



            name:

                name,



            contact:

                contact



        });


    }






    /*
    ==============================================

    Detail

    ==============================================
    */


    async showDetail(
        supplierId
    ){



        const supplier =


            await this.controller.detail(

                supplierId

            );





        if(!supplier){


            return;


        }





        alert(

            JSON.stringify(

                supplier,

                null,

                4

            )

        );


    }






    /*
    ==============================================

    Ranking

    ==============================================
    */


    async showRanking(){



        const list =


            await this.controller.ranking();





        let text =


            "Supplier Ranking\n\n";





        list.forEach(

            (item,index)=>{


                text +=


                    (

                        index + 1

                    )

                    +

                    ". "

                    +

                    (

                        item.name || ""

                    )

                    +

                    " : "

                    +

                    (

                        item.performanceScore || 0

                    )

                    +

                    "\n";


            }

        );





        alert(text);


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

                    "btn-create-supplier"

                ){


                    this.showCreateForm();


                }





                if(

                    event.target.id ===

                    "btn-ranking-supplier"

                ){


                    this.showRanking();


                }


            }

        );


    }






    /*
    ==============================================

    Detail Events

    ==============================================
    */


    bindRowEvents(){



        const buttons =


            document.querySelectorAll(

                ".btn-detail"

            );





        buttons.forEach(

            button=>{


                button.addEventListener(

                    "click",

                    ()=>{


                        this.showDetail(

                            button.dataset.id

                        );


                    }

                );


            }

        );


    }





}






global.SupplierView =

    SupplierView;



})(window);
