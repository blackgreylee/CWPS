/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/project-view.js


 Sprint:
 2.9.32


 Build:
 Enterprise Project View Layer


 Description:
 Project User Interface View


==================================================
*/


(function(global){

"use strict";



class ProjectView {



    constructor(){


        this.controller =

            new global.ProjectController();



        this.container =

            null;



    }





    /*
    ==============================================

    Initialize View

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

    Render

    ==============================================
    */


    render(){



        if(!this.container){

            return;

        }





        const projects =

            this.controller

            .getProjects();





        this.container.innerHTML =

            `

            <div class="project-view">


                <h2>
                    Project Management
                </h2>


                <div id="project-list">


                    ${

                    projects.map(

                        project =>

                        this.renderProject(

                            project

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

    Render Project Item

    ==============================================
    */


    renderProject(

        project

    ){



        return `

        <div class="project-card"

             data-id="${project.id}">


            <h3>

                ${project.name}

            </h3>


            <p>

                Code:

                ${project.code || ""}

            </p>


            <p>

                Status:

                ${project.status || ""}

            </p>


            <button

            onclick="projectView.open('${project.id}')">

                Open

            </button>


        </div>

        `;


    }





    /*
    ==============================================

    Open Project

    ==============================================
    */


    open(

        projectId

    ){



        const project =

            this.controller

            .open(

                projectId

            );





        this.showDetail(

            project

        );



    }





    /*
    ==============================================

    Show Detail

    ==============================================
    */


    showDetail(

        project

    ){



        this.container.innerHTML =

        `


        <div class="project-detail">


            <h2>

                ${project.name}

            </h2>


            <p>

            Project Code:

            ${project.code || ""}

            </p>


            <p>

            Status:

            ${project.status}

            </p>


        </div>


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





global.ProjectView =

    ProjectView;



})(window);
