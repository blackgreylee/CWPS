# /*

CWPS Enterprise

Menu Controller

Sprint:

1.7.3

Build:

0001

Description:

Navigation menu controller

==================================================
*/

class MenuController {

```
constructor(

    pageLoader = null

){



    this.pageLoader =

        pageLoader;





    this.menuItems = {



        dashboard:



        {



            text:

                "Dashboard",



            page:

                "dashboard"



        },





        project:



        {



            text:

                "專案管理",



            page:

                "project"



        },





        batch:



        {



            text:

                "批次管理",



            page:

                "batch"



        },





        bom:



        {



            text:

                "BOM管理",



            page:

                "bom"



        },





        material:



        {



            text:

                "材料管理",



            page:

                "material"



        },





        supplier:



        {



            text:

                "供應商管理",



            page:

                "supplier"



        },





        quotation:



        {



            text:

                "詢價管理",



            page:

                "quotation"



        },





        purchase:



        {



            text:

                "採購管理",



            page:

                "purchase"



        },





        shipment:



        {



            text:

                "出貨管理",



            page:

                "shipment"



        },





        invoice:



        {



            text:

                "發票管理",



            page:

                "invoice"



        },





        setting:



        {



            text:

                "系統設定",



            page:

                "setting"



        }



    };









    this.currentMenu =

        "dashboard";



}









/*
----------------------------------------------

Initialize Menu


----------------------------------------------

*/


init(){



    this.bindEvents();



    this.setActive(

        this.currentMenu

    );



}









/*
----------------------------------------------

Bind Click Events


----------------------------------------------

----------------------------------------------

*/


bindEvents(){



    let menus =



        document.querySelectorAll(

            "[data-page]"

        );









    menus.forEach(menu=>{



        menu.addEventListener(



            "click",



            ()=>{



                let page =



                    menu.dataset.page;





                this.navigate(

                    page

                );



            }



        );



    });



}









/*
----------------------------------------------

Navigate Page


----------------------------------------------

----------------------------------------------

*/


navigate(

    page

){



    if(

        this.pageLoader

    ){



        this.pageLoader.load(

            page

        );



    }





    this.setActive(

        page

    );





    this.currentMenu =

        page;



}









/*
----------------------------------------------

Set Active Menu


----------------------------------------------

----------------------------------------------

*/


setActive(

    page

){



    let menus =



        document.querySelectorAll(

            "[data-page]"

        );









    menus.forEach(item=>{



        item.classList.remove(

            "active"

        );





        if(

            item.dataset.page

            ===

            page

        ){



            item.classList.add(

                "active"

            );



        }



    });



}









/*
----------------------------------------------

Generate Menu HTML


----------------------------------------------

----------------------------------------------

*/


render(

    containerId

){



    let container =



        document.getElementById(

            containerId

        );





    if(!container){



        return;



    }









    let html = "";





    Object.keys(

        this.menuItems

    )

    .forEach(key=>{



        let item =



            this.menuItems[key];





        html += `



        <li>



            <a href="#"

               data-page="${item.page}">



                ${item.text}



            </a>



        </li>



        `;



    });









    container.innerHTML =

        html;





    this.bindEvents();



}









/*
----------------------------------------------

Get Current Menu


----------------------------------------------

----------------------------------------------

*/


getCurrent(){



    return this.currentMenu;



}









/*
----------------------------------------------

Get Menu List


----------------------------------------------

----------------------------------------------

*/


getMenus(){



    return this.menuItems;



}
```

}

window.MenuController = MenuController;
