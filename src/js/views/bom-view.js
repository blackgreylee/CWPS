# /*

CWPS Enterprise

BOM View

Sprint:

1.8.3

Build:

0001

Description:

BOM tree UI renderer

==================================================
*/

class BOMView {

```
constructor(){



    this.containerId =

        "bom-container";





    this.bomEngine =

        null;





    this.currentBatch =

        null;





    this.treeData = [];



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    bomEngine

){



    this.bomEngine =

        bomEngine;



}









/*
----------------------------------------------

Load BOM


----------------------------------------------

*/


load(

    batchId

){



    this.currentBatch =

        batchId;









    this.treeData =



        this.bomEngine

        .getTree(

            batchId

        );









    this.render();



}









/*
----------------------------------------------

Render BOM Page


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



    <div class="bom-header">



        <h2>

        BOM 結構

        </h2>



        <span>

        批次：

        ${this.currentBatch}

        </span>



    </div>





    <div

    id="bom-tree">

    </div>





    <div

    id="bom-summary">

    </div>



    `;









    this.renderTree();



    this.renderSummary();



}









/*
----------------------------------------------

Render Tree


----------------------------------------------

*/


renderTree(){



    let container =



        document.getElementById(

            "bom-tree"

        );









    container.innerHTML =



        this.createNode(

            this.treeData

        );



}









/*
----------------------------------------------

Create Tree Node


----------------------------------------------

*/


createNode(

    nodes

){



    if(

        !nodes

        ||

        nodes.length === 0

    ){



        return "";



    }









    let html = "<ul>";









    nodes.forEach(node=>{



        html += `



        <li>



        <span

        class="bom-node"

        data-id="${node.id}">



        ${

            node.code

        }



        -

        ${

            node.name || ""

        }



        </span>



        `;









        if(

            node.children

            &&

            node.children.length

        ){



            html +=



                this.createNode(

                    node.children

                );



        }









        html += "</li>";



    });









    html += "</ul>";









    return html;



}









/*
----------------------------------------------

BOM Summary


----------------------------------------------

*/


renderSummary(){



    let container =



        document.getElementById(

            "bom-summary"

        );









    let summary =



        this.bomEngine

        .summary(

            this.currentBatch

        );









    container.innerHTML = `



    <h3>

    BOM 統計

    </h3>



    <p>

    項目數：

    ${summary.count}

    </p>



    <p>

    總數量：

    ${summary.quantity}

    </p>



    <p>

    材料種類：

    ${summary.materialCount}

    </p>



    `;



}









/*
----------------------------------------------

Select Node


----------------------------------------------

*/


selectNode(

    id

){



    let node =



        this.bomEngine

        .getNode(

            id

        );









    return node;



}









/*
----------------------------------------------

Refresh


----------------------------------------------

*/


refresh(){



    if(

        this.currentBatch

    ){



        this.load(

            this.currentBatch

        );



    }



}
```

}

window.BOMView = BOMView;
