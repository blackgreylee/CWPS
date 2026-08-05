# /*

CWPS Enterprise

BOM Node Data Model

Sprint:
1.3.2

Build:
0001

==================================================
*/

class BOMModel {

```
constructor(data = {}) {



    /*
    Node ID

    */

    this.id =

        data.id ||

        this.generateId();






    /*
    Node Code


    Example:


    AU001

    AC001-1


    */

    this.code =

        data.code ||

        "";






    /*
    Node Name

    */

    this.name =

        data.name ||

        "";






    /*
    Node Type


    BATCH

    AU

    AC

    PART

    GLASS

    MATERIAL


    */

    this.type =

        data.type ||

        "PART";






    /*
    Parent Node ID


    Root = null


    */

    this.parentId =

        data.parentId ||

        null;






    /*
    Tree Level


    0

    1

    2


    */

    this.level =

        data.level ||

        0;






    /*
    Children Nodes

    */


    this.children =

        data.children ||

        [];






    /*
    Quantity


    */

    this.quantity =

        data.quantity ||

        0;






    /*
    Unit


    PCS

    M

    ㎡

    SET


    */

    this.unit =

        data.unit ||

        "PCS";






    /*
    Material Reference


    Link MaterialModel


    */

    this.materialId =

        data.materialId ||

        null;






    /*
    Remark

    */

    this.remark =

        data.remark ||

        "";






    /*
    Status


    Active

    Disabled


    */

    this.status =

        data.status ||

        "Active";






    /*
    Created / Updated


    */

    this.createdDate =

        data.createdDate ||

        new Date().toISOString();




    this.updatedDate =

        data.updatedDate ||

        new Date().toISOString();



}










/*
----------------------------------------------

Generate ID

----------------------------------------------

*/


generateId(){



    return (

        "BOM-" +

        Date.now()

    );



}










/*
----------------------------------------------

Add Child Node


AU

|

AC


----------------------------------------------

*/


addChild(node){



    node.parentId = this.id;



    node.level =

        this.level + 1;




    this.children.push(node);



    this.touch();



}










/*
----------------------------------------------

Remove Child

----------------------------------------------

*/


removeChild(nodeId){



    this.children =

        this.children.filter(



            node =>

            node.id !== nodeId



        );



    this.touch();



}










/*
----------------------------------------------

Find Node


Recursive Search


----------------------------------------------

*/


findNode(nodeId){



    if(this.id === nodeId){



        return this;



    }




    for(

        let child of this.children

    ){



        let result =

            child.findNode(nodeId);



        if(result){



            return result;



        }



    }





    return null;



}










/*
----------------------------------------------

Calculate Total Quantity


Parent Qty

x

Child Qty


----------------------------------------------

*/


calculateQuantity(parentQty = 1){



    let result = {



        code:this.code,


        quantity:

            parentQty *

            this.quantity,



        unit:this.unit



    };



    return result;



}










/*
----------------------------------------------

Update Timestamp

----------------------------------------------

*/


touch(){



    this.updatedDate =

        new Date().toISOString();



}










/*
----------------------------------------------

Convert JSON

----------------------------------------------

*/


toJSON(){



    return {



        id:this.id,


        code:this.code,


        name:this.name,


        type:this.type,


        parentId:this.parentId,


        level:this.level,


        children:this.children,


        quantity:this.quantity,


        unit:this.unit,


        materialId:this.materialId,


        remark:this.remark,


        status:this.status,


        createdDate:this.createdDate,


        updatedDate:this.updatedDate



    };



}










/*
----------------------------------------------

Restore JSON

----------------------------------------------

*/


static fromJSON(json){



    let node =

        new BOMModel(json);



    node.children =

        (json.children || [])

        .map(

            child =>

            BOMModel.fromJSON(child)

        );



    return node;



}
```

}

window.BOMModel = BOMModel;
