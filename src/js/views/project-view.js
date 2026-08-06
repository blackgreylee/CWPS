/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/project-view.js


 Sprint:
 2.7.1


 Build:
 Enterprise Project View Layer


 Description:
 Project Management UI View


==================================================
*/


(function(global){


"use strict";



class ProjectView {



    constructor(){


        this.controller =

            null;


        this.container =

            null;


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



        this.controller =

            controller;



        this.container =


            document.getElementById(

                containerId

            );





        this.bindEvents();



    }






    /*
    ==============================================

    Render Project List

    ==============================================
    */


    render(
        projects
    ){



        if(!this.container){


            return;


        }





        let html = `


        <div class="project-page">


            <div class="page-header">


                <h2>

                    Project Management

                </h2>


                <button

                    id="btn-create-project"

                    class="btn btn-primary"

                >

                    New Project

                </button>


            </div>




            <table class="table">


                <thead>

                    <tr>

                        <th>
                            Project No
                        </th>


                        <th>
                            Project Name
                        </th>


                        <th>
                            Customer
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





        projects.forEach(

            project=>{


                html += `


                <tr>


                    <td>

                        ${

                            project.id || ""

                        }

                    </td>



                    <td>

                        ${

                            project.name || ""

                        }

                    </td>



                    <td>

                        ${

                            project.customer || ""

                        }

                    </td>



                    <td>

                        ${

                            project.status || ""

                        }

                    </td>



                    <td>


                        <button

                            data-id="${

                                project.id

                            }"

                            class="btn-detail"

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

    Create Project Form

    ==============================================
    */


    showCreateForm(){



        const name =


            prompt(

                "Project Name"

            );





        const customer =


            prompt(

                "Customer"

            );





        if(

            !name

        ){


            return;


        }





        this.controller.create({



            name:

                name,



            customer:

                customer



        });


    }






    /*
    ==============================================

    Detail

    ==============================================
    */


    async showDetail(
        id
    ){



        const project =


            await this.controller.detail(

                id

            );





        if(!project){


            return;


        }





        alert(

            JSON.stringify(

                project,

                null,

                4

            )

        );


    }






    /*
    ==============================================

    Bind Events

    ==============================================
    */


    bindEvents(){


        document.addEventListener(

            "click",

            event=>{


                if(

                    event.target.id ===

                    "btn-create-project"

                ){


                    this.showCreateForm();


                }


            }

        );


    }






    /*
    ==============================================

    Row Events

    ==============================================
    */


    bindRowEvents(){



        const buttons =


            document.querySelectorAll(

                ".btn-detail"

            );





        buttons.forEach(

            btn=>{


                btn.addEventListener(

                    "click",

                    ()=>{


                        this.showDetail(

                            btn.dataset.id

                        );


                    }

                );


            }

        );


    }






}






global.ProjectView =

    ProjectView;



})(window);
