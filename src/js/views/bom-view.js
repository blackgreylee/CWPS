/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/bom-view.js


 Sprint:
 2.9.35


 Build:
 Enterprise BOM Tree View Layer


 Description:
 BOM Tree User Interface View


==================================================
*/


(function(global){

"use strict";



class BOMView {



    constructor(){


        this.controller =

            new global.BOMController();


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

    Render BOM

    ==============================================
    */


    render(

        versionId

    ){



        if(!this.container){

            return;

        }





        const data =

            this.controller

            .loadVersion(

                versionId

            );





        this.container.innerHTML =

        `


        <div class="bom-view">


            <h2>

            BOM Management

            </h2>


            <div class="bom-tree">


                ${

                this.renderNode(

                    data.tree

                )


                }


            </div>


        </div>


        `;



    }





    /*
    ==============================================

    Render Tree Node

    ==============================================
    */


    renderNode(

        node

    ){



        if(!node){


            return "";

        }





        let children = "";





        if(

            node.children &&

            node.children.length

        ){



            children =


            `

            <ul>


            ${

            node.children.map(

                child =>


                `

                <li>


                ${

                this.renderNode(

                    child

                )

                }


                </li>


                `


            )

            .join("")


            }


            </ul>


            `;



        }





        return `


        <div class="bom-node">


            <div class="bom-title">


                <strong>

                ${node.code || ""}

                </strong>


                -

                ${node.name || ""}



            </div>



            <div class="bom-info">


                Type:

                ${node.type || ""}



                <br>


                Quantity:

                ${node.quantity || 0}



                ${

                node.unit

                ?

                node.unit

                :

                ""

                }



            </div>



            ${children}


        </div>


        `;



    }





    /*
    ==============================================

    Expand Node

    ==============================================
    */


    expand(

        nodeId

    ){



        return this.controller

            .expand(

                nodeId

            );


    }





    /*
    ==============================================

    Summary

    ==============================================
    */


    showSummary(

        versionId

    ){



        const summary =

            this.controller

            .summary(

                versionId

            );





        this.container.innerHTML =


        `


        <div class="bom-summary">


            <h3>

            BOM Summary

            </h3>


            <p>


            Version:

            ${summary.versionId}


            </p>



            <p>


            Node Count:

            ${summary.nodeCount}


            </p>



        </div>


        `;



    }





    /*
    ==============================================

    Refresh

    ==============================================
    */


    refresh(

        versionId

    ){



        this.render(

            versionId

        );



    }



}





global.BOMView =

    BOMView;



})(window);
