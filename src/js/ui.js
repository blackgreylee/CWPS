# /*

CWPS Enterprise
Curtain Wall Procurement System

UI Controller Module

Version:
Sprint 1.3.1
Build 0001

==================================================
*/

## /*

## CWPS UI Object

*/

const CWPSUI = {

```
/*
----------------------------------------------
Loading
----------------------------------------------
*/


showLoading(message = "Loading..."){


    let loader =

        document.getElementById(

            "cwps-loading"

        );



    if(!loader){



        loader =

            document.createElement(

                "div"

            );



        loader.id =

            "cwps-loading";



        loader.className =

            "cwps-loading";



        document.body.appendChild(

            loader

        );


    }



    loader.innerHTML = `

        <div class="cwps-loading-box">


            <div class="spinner-border">

            </div>


            <div>

                ${message}

            </div>


        </div>

    `;



    loader.style.display =

        "flex";


},




hideLoading(){


    const loader =

        document.getElementById(

            "cwps-loading"

        );



    if(loader){


        loader.style.display =

            "none";


    }


},




/*
----------------------------------------------
Toast Message

type:

success
warning
danger
info

----------------------------------------------
*/


toast(
    message,
    type = "info"
){



    let container =

        document.getElementById(

            "cwps-toast-container"

        );



    if(!container){



        container =

            document.createElement(

                "div"

            );



        container.id =

            "cwps-toast-container";



        document.body.appendChild(

            container

        );


    }



    const toast =

        document.createElement(

            "div"

        );



    toast.className =

        `cwps-toast cwps-toast-${type}`;



    toast.innerHTML =

        message;



    container.appendChild(

        toast

    );



    setTimeout(()=>{


        toast.remove();


    },3000);



},





/*
----------------------------------------------
Alert

----------------------------------------------
*/


alert(
    message,
    title = "CWPS"
){



    const modal =

        this.createModal(

            title,

            message

        );



    document.body.appendChild(

        modal

    );



    modal.querySelector(

        ".cwps-modal-close"

    )

    .onclick = ()=>{


        modal.remove();


    };


},






/*
----------------------------------------------
Confirm

----------------------------------------------
*/


confirm(message){



    return window.confirm(

        message

    );


},





/*
----------------------------------------------
Modal Creator

----------------------------------------------
*/


createModal(
    title,
    content
){



    const modal =

        document.createElement(

            "div"

        );



    modal.className =

        "cwps-modal";



    modal.innerHTML = `


        <div class="cwps-modal-content">


            <div class="cwps-modal-header">


                <h5>

                    ${title}

                </h5>


                <button

                    class="cwps-modal-close">

                    ×

                </button>


            </div>



            <div class="cwps-modal-body">


                ${content}


            </div>


        </div>


    `;



    return modal;


},






/*
----------------------------------------------
Page Header

----------------------------------------------
*/


createPageHeader(
    title,
    description=""
){


    return `


        <div class="cwps-page-header">


            <h3>

                ${title}

            </h3>



            <p>

                ${description}

            </p>


        </div>


    `;


},






/*
----------------------------------------------
Empty State

----------------------------------------------
*/


emptyState(
    message="No Data"
){


    return `


        <div class="cwps-empty">


            ${message}


        </div>


    `;


}
```

};

## /*

Global Helper

---

*/

function showToast(
message,
type="info"
){

```
CWPSUI.toast(

    message,

    type

);
```

}

## /*

End of ui.js

---

*/
