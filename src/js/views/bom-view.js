/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/bom-view.js


 Sprint:
 2.7.4


 Build:
 Enterprise BOM View Layer


 Description:
 BOM Tree Management UI View


==================================================
*/


(function(global){


"use strict";



class BOMView {



    constructor(){


        this.controller = null;


        this.container = null;


        this.currentVersion = null;


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

    Render BOM

    ==============================================
    */


    render(
        bom
    ){



        if(!this.container){


            return;


        }





        this.container.innerHTML = `


        <div class="bom-page">


            <div class="page-header">


                <h2>

                    BOM Management

                </h2>


                <button

                    id="btn-import-bom"

                >

                    Import BOM

                </button>


            </div>





            <div class="bom-version">


                Version:

                <span>

                    ${

                        bom.version ||

                        ""

                    }

                </span>


            </div>





            <div class="bom-tree">


                ${

                    this.renderNode(

                        bom.root

                    )

                }


            </div>


        </div>


        `;



        this.bindTreeEvents();


    }






    /*
    ==============================================

    Render BOM Node

    ==============================================
    */


    renderNode(
        node
    ){



        if(!node){


            return "";


        }





        let html = `



        <div class="bom-node">


            <div class="node-header">


                <span

                    class="toggle"

                    data-id="${

                        node.id

                    }"

                >

                    [+]

                </span>



                <b>

                    ${

                        node.code ||

                        ""

                    }

                </b>



                <span>

                    (

                    ${

                        node.type ||

                        ""

                    }

                    )

                </span>



                <span>

                    Qty:

                    ${

                        node.quantity ||

                        0

                    }

                </span>


            </div>


        `;






        if(

            node.material

        ){


            html += `



            <div class="material-info">


                Material:

                ${

                    node.material.name ||

                    ""

                }



            </div>


            `;


        }






        if(

            node.children &&

            node.children.length

        ){



            html += `


            <div

                class="children"

                id="node-${

                    node.id

                }"

            >


            `;





            node.children.forEach(

                child=>{


                    html +=


                        this.renderNode(

                            child

                        );


                }

            );





            html += `


            </div>


            `;


        }





        html += `


        </div>


        `;





        return html;


    }






    /*
    ==============================================

    Version Change

    ==============================================
    */


    async changeVersion(
        versionId
    ){



        this.currentVersion =

            versionId;





        const bom =


            await this.controller.getVersion(

                versionId

            );





        this.render(

            bom

        );


    }






    /*
    ==============================================

    Import BOM

    ==============================================
    */


    importBOM(){



        if(

            this.controller.import

        ){


            this.controller.import();


        }


    }






    /*
    ==============================================

    Toggle Node

    ==============================================
    */


    toggleNode(
        id
    ){



        const element =


            document.getElementById(

                "node-" + id

            );





        if(!element){


            return;


        }





        element.style.display =


            element.style.display ===

            "none"

            ?

            "block"

            :

            "none";


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

                    "btn-import-bom"

                ){


                    this.importBOM();


                }


            }

        );


    }






    /*
    ==============================================

    Tree Events

    ==============================================
    */


    bindTreeEvents(){



        const buttons =


            document.querySelectorAll(

                ".toggle"

            );





        buttons.forEach(

            button=>{


                button.addEventListener(

                    "click",

                    ()=>{


                        this.toggleNode(

                            button.dataset.id

                        );


                    }

                );


            }

        );


    }





}






global.BOMView =

    BOMView;



})(window);
