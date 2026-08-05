# /*

CWPS Enterprise

BOM Storage Service

Sprint:

1.4

Build:

0001

Description:

BOM tree persistence management

==================================================
*/

class BOMStorage {

```
constructor(){



    this.db =

        new CWPSDatabase();



    this.collection =

        "bom";



    this.db.init();



}









/*
----------------------------------------------

Save BOM Tree


----------------------------------------------

*/


saveTree(data){



    let record = {



        id:

            data.id ||

            this.generateId(),



        projectId:

            data.projectId || "",



        batchId:

            data.batchId || "",



        version:

            data.version || "V001",



        tree:

            data.tree || [],



        status:

            "Active",



        createdDate:

            new Date()

            .toISOString()



    };





    return this.db.insert(



        this.collection,

        record



    );



}









/*
----------------------------------------------

Generate BOM ID


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

Get BOM Tree


----------------------------------------------

*/


getTree(

    batchId,

    version

){



    let list =

        this.db.get(

            this.collection

        );





    return list.find(



        item =>



        item.batchId === batchId



        &&



        item.version === version



    );



}









/*
----------------------------------------------

Get Latest BOM


----------------------------------------------

*/


getLatest(

    batchId

){



    let list =

        this.db.get(

            this.collection

        );





    let result =



        list.filter(



            item =>

            item.batchId === batchId



            &&



            item.status === "Active"



        );





    if(

        result.length === 0

    ){



        return null;



    }





    return result[

        result.length-1

    ];



}









/*
----------------------------------------------

Find Node By Code


----------------------------------------------

*/


findByCode(

    tree,

    code

){



    let result = null;





    const search=(nodes)=>{



        nodes.forEach(node=>{



            if(

                node.code === code

            ){



                result = node;



            }





            if(

                node.children

                &&

                node.children.length

            ){



                search(

                    node.children

                );



            }



        });



    };





    search(tree);





    return result;



}









/*
----------------------------------------------

Flatten BOM Tree


----------------------------------------------

*/


flatten(tree){



    let result=[];





    const walk=(node)=>{



        result.push(

            node

        );





        if(

            node.children

        ){



            node.children.forEach(

                child=>

                walk(child)

            );



        }



    };





    tree.forEach(

        node=>

        walk(node)

    );





    return result;



}









/*
----------------------------------------------

Get Material Nodes


----------------------------------------------

----------------------------------------------

*/


getParts(tree){



    return this.flatten(

        tree

    )

    .filter(



        node =>



        node.type === "PART"



        ||

        node.type === "GLASS"



    );



}









/*
----------------------------------------------

Update BOM Node


----------------------------------------------

----------------------------------------------

*/


updateNode(

    bomId,

    code,

    changes

){



    let record =

        this.db.findById(



            this.collection,

            bomId



        );





    if(!record){



        return null;



    }





    let node =

        this.findByCode(



            record.tree,

            code



        );





    if(!node){



        return null;



    }





    Object.assign(



        node,

        changes



    );





    return this.db.update(



        this.collection,

        bomId,

        record



    );



}









/*
----------------------------------------------

Disable BOM Version


----------------------------------------------

*/


disable(

    bomId

){



    let record =

        this.db.findById(



            this.collection,

            bomId



        );





    if(!record){



        return false;



    }





    record.status =

        "Disabled";





    this.db.update(



        this.collection,

        bomId,

        record



    );





    return true;



}









/*
----------------------------------------------

Compare BOM


----------------------------------------------

----------------------------------------------

*/


compare(

    oldTree,

    newTree

){



    let oldNodes =

        this.flatten(

            oldTree

        );





    let newNodes =

        this.flatten(

            newTree

        );





    return {



        oldCount:

            oldNodes.length,



        newCount:

            newNodes.length,



        difference:

            newNodes.length -

            oldNodes.length



    };



}
```

}

window.BOMStorage = BOMStorage;
