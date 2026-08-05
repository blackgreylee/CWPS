# /*

CWPS Enterprise
Curtain Wall Procurement System

Router Module

Version:
Sprint 1.3.1
Build 0001

==================================================
*/

## /*

Page Mapping

Key:
URL page parameter

Value:
HTML file

---

*/

const CWPS_ROUTES = {

```
dashboard:

    "pages/dashboard.html",


batch:

    "pages/batch.html",


bom:

    "pages/bom.html",


material:

    "pages/material.html",


supplier:

    "pages/supplier.html",


quotation:

    "pages/quotation.html",


purchase:

    "pages/purchase.html",


shipment:

    "pages/shipment.html",


invoice:

    "pages/invoice.html",


setting:

    "pages/setting.html"
```

};

## /*

Get Current Page

---

*/

function getCurrentPage(){

```
const params =

    new URLSearchParams(

        window.location.search

    );



return (

    params.get("page")

    ||

    "dashboard"

);
```

}

## /*

Load Page

---

*/

async function loadPage(page){

```
const container =

    document.getElementById(

        "page-container"

    );



if(!container){


    return;


}



const file =

    CWPS_ROUTES[page];



if(!file){



    container.innerHTML = `

        <div class="cwps-card">

            <h4>

                Page Not Found

            </h4>

            <p>

                Cannot find page:

                ${page}

            </p>

        </div>

    `;



    return;


}



try{


    const response =

        await fetch(file);



    if(!response.ok){


        throw new Error(

            "Page Load Failed"

        );


    }



    const html =

        await response.text();



    container.innerHTML = html;



    setActiveMenu(page);



    if(typeof pageLoaded === "function"){


        pageLoaded(page);


    }


}


catch(error){



    console.error(

        "CWPS Router Error:",

        error

    );



    container.innerHTML = `

        <div class="cwps-card">

            <h4>

                Loading Error

            </h4>


            <p>

                ${error.message}

            </p>


        </div>

    `;


}
```

}

## /*

Navigate

---

*/

function navigate(page){

```
window.location.href =

    "?page="

    +

    page;
```

}

## /*

Active Menu Controller

---

*/

function setActiveMenu(page){

```
const menuItems =

    document.querySelectorAll(

        ".cwps-menu li"

    );



menuItems.forEach(item => {


    item.classList.remove(

        "active"

    );


    const link =

        item.querySelector(

            "a"

        );



    if(!link){


        return;


    }



    if(

        link.href.includes(

            "page=" + page

        )

    ){


        item.classList.add(

            "active"

        );


    }



});
```

}

## /*

Router Initialize

---

*/

function initializeRouter(){

```
const page =

    getCurrentPage();



loadPage(page);
```

}

## /*

Auto Start

---

*/

document.addEventListener(

```
"DOMContentLoaded",

function(){


    initializeRouter();


}
```

);

## /*

End of router.js

---

*/
