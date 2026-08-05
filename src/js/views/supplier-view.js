# /*

CWPS Enterprise

Supplier View

Sprint:

1.8.5

Build:

0001

Description:

Supplier management UI renderer

==================================================
*/

class SupplierView {

```
constructor(){



    this.containerId =

        "supplier-container";





    this.controller =

        null;





    this.suppliers = [];





    this.currentSupplier =

        null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    supplierController

){



    this.controller =

        supplierController;



    this.load();



}









/*
----------------------------------------------

Load Supplier Data


----------------------------------------------

*/


load(){



    if(

        !this.controller

    ){



        return;



    }









    this.suppliers =



        this.controller.getAll();









    this.render();



}









/*
----------------------------------------------

Render Main Page


----------------------------------------------

*/


render(){



    let container =



        document.getElementById(

            this.containerId

        );









    if(!container){



        return;



    }









    container.innerHTML = `



    <div class="supplier-header">



        <h2>

        供應商管理

        </h2>



        <button

        id="btn-add-supplier">

        新增供應商

        </button>



    </div>





    <div

    id="supplier-form">

    </div>





    <div

    id="supplier-list">

    </div>



    `;









    this.renderList();



    this.bindEvents();



}









/*
----------------------------------------------

Render Supplier List


----------------------------------------------

*/


renderList(){



    let container =



        document.getElementById(

            "supplier-list"

        );









    if(!container){



        return;



    }









    let html = `



    <table>



    <thead>

    <tr>



    <th>編號</th>

    <th>名稱</th>

    <th>分類</th>

    <th>狀態</th>

    <th>操作</th>



    </tr>

    </thead>



    <tbody>



    `;









    this.suppliers.forEach(

        supplier=>{



            html += `



            <tr>



            <td>

            ${supplier.supplierNo || ""}

            </td>



            <td>

            ${supplier.name || ""}

            </td>



            <td>

            ${supplier.category || ""}

            </td>



            <td>

            ${supplier.status || ""}

            </td>



            <td>



            <button

            class="btn-view-supplier"

            data-id="${supplier.id}">

            查看

            </button>



            </td>



            </tr>



            `;



        }

    );









    html += `



    </tbody>



    </table>



    `;









    container.innerHTML =

        html;



}









/*
----------------------------------------------

Supplier Form


----------------------------------------------

*/


renderForm(){



    let container =



        document.getElementById(

            "supplier-form"

        );









    if(!container){

        return;

    }









    container.innerHTML = `



    <div class="form-box">



    <input

    id="supplier-no"

    placeholder="供應商編號">



    <input

    id="supplier-name"

    placeholder="供應商名稱">



    <input

    id="supplier-category"

    placeholder="材料分類">



    <button

    id="save-supplier">

    儲存

    </button>



    </div>



    `;



}









/*
----------------------------------------------

Bind Events


----------------------------------------------

*/


bindEvents(){



    let addButton =



        document.getElementById(

            "btn-add-supplier"

        );









    if(addButton){



        addButton.onclick = ()=>{



            this.renderForm();



        };



    }









    document

    .querySelectorAll(

        ".btn-view-supplier"

    )

    .forEach(button=>{



        button.onclick = ()=>{



            this.showDetail(

                button.dataset.id

            );



        };



    });



}









/*
----------------------------------------------

Show Supplier Detail


----------------------------------------------

*/


showDetail(

    id

){



    this.currentSupplier =



        this.controller.getById(

            id

        );









    return this.currentSupplier;



}









/*
----------------------------------------------

Add Supplier


----------------------------------------------

*/


createSupplier(

    data

){



    return this.controller

        .createSupplier(

            data

        );



}









/*
----------------------------------------------

Refresh


----------------------------------------------

*/


refresh(){



    this.load();



}
```

}

window.SupplierView = SupplierView;
