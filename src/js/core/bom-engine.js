# /*

CWPS Enterprise

BOM Tree Engine

Sprint:
1.3.2

Build:
0001

Description:

BOM hierarchy processing engine

==================================================
*/

class BOMEngine {

```
constructor(){


    this.rootNodes = [];

}









/*
----------------------------------------------

Add Root Node


Batch / AU


----------------------------------------------

*/


addRoot(node){


    this.rootNodes.push(node);


    return node;


}










/*
----------------------------------------------

Add Child Node


Parent

   |

   Child


----------------------------------------------

*/


addNode(parentNode, childNode){



    if(!parentNode){



        throw new Error(

            "Parent node required"

        );



    }




    parentNode.addChild(

        childNode

    );



    return childNode;



}










/*
----------------------------------------------

Find Node By ID


Recursive Search


----------------------------------------------

*/


findNode(nodeId){



    for(

        let node of this.rootNodes

    ){



        let result =

            node.findNode(

                nodeId

            );



        if(result){



            return result;



        }



    }





    return null;



}










/*
----------------------------------------------

Find By Code


Example:

AU001


----------------------------------------------

*/


findByCode(code){



    let nodes =

        this.flatten();



    return nodes.find(



        node =>

        node.code === code



    );



}










/*
----------------------------------------------

Flatten Tree


Tree

↓

Array


----------------------------------------------

*/


flatten(){



    let result = [];



    const walk = (node)=>{



        result.push(node);



        node.children.forEach(



            child =>

            walk(child)



        );



    };





    this.rootNodes.forEach(



        root =>

        walk(root)



    );




    return result;



}










/*
----------------------------------------------

Get Children


----------------------------------------------

*/


getChildren(nodeId){



    let node =

        this.findNode(

            nodeId

        );



    if(!node){



        return [];



    }



    return node.children;



}










/*
----------------------------------------------

Remove Node


----------------------------------------------

*/


removeNode(nodeId){



    let node =

        this.findNode(

            nodeId

        );



    if(!node){



        return false;



    }





    if(node.parentId === null){



        this.rootNodes =

            this.rootNodes.filter(



                item =>

                item.id !== nodeId



            );



        return true;



    }






    let parent =

        this.findNode(

            node.parentId

        );



    if(parent){



        parent.removeChild(

            nodeId

        );



        return true;



    }




    return false;



}










/*
----------------------------------------------

Validate Tree


Check:

- Duplicate Code

- Empty Code


----------------------------------------------

*/


validate(){



    let errors = [];



    let nodes =

        this.flatten();





    let codes = [];





    nodes.forEach(node=>{



        if(!node.code){



            errors.push({

                node:node.id,

                message:

                "Empty node code"

            });



        }





        if(

            codes.includes(

                node.code

            )

        ){



            errors.push({

                node:node.id,

                message:

                "Duplicate code: "

                + node.code

            });



        }





        codes.push(

            node.code

        );



    });





    return errors;



}










/*
----------------------------------------------

Export JSON

----------------------------------------------

*/


toJSON(){



    return this.rootNodes.map(



        node =>

        node.toJSON()



    );



}










/*
----------------------------------------------

Import JSON


----------------------------------------------

*/


load(jsonArray){



    this.rootNodes =



        jsonArray.map(



            json =>

            BOMModel.fromJSON(

                json

            )



        );



    return this.rootNodes;



}
```

}

window.BOMEngine = BOMEngine;
