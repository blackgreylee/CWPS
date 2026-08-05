# /*

CWPS Enterprise

BOM Mapper Engine

Sprint:

1.3.3

Build:

0001

Description:

Convert flat BOM data

into hierarchical BOM Tree

==================================================
*/

class BOMMapper {

```
constructor(){


    this.nodes = [];

}









/*
----------------------------------------------

Map Flat Data


Input:

ExcelParser Result


Output:

BOM Tree


----------------------------------------------

*/


map(rows){



    this.nodes = [];





    let rootNodes = [];





    rows.forEach(row=>{



        let node =

            new BOMModel({



                code:

                    row.code,



                name:

                    row.name,



                type:

                    row.type,



                quantity:

                    row.quantity,



                unit:

                    row.unit,



                remark:

                    row.remark



            });





        this.nodes.push(node);



    });





    this.nodes.forEach(node=>{



        let parent =

            this.findParent(

                node

            );





        if(parent){



            parent.addChild(

                node

            );



        }

        else{



            rootNodes.push(

                node

            );



        }



    });





    return rootNodes;



}









/*
----------------------------------------------

Find Parent


----------------------------------------------

*/


findParent(node){



    let code =

        node.code;





    /*
    AC001-1

    Parent:

    AC001


    */


    if(

        code.includes("-")

    ){



        let parentCode =

            code.split("-")[0];





        return this.findNodeByCode(

            parentCode

        );



    }







    /*
    其他加工件


    暫定:

    AC → AU


    */


    if(

        node.type === "AC"

    ){



        return this.findLatestAU();



    }







    return null;



}









/*
----------------------------------------------

Find Node By Code

----------------------------------------------

*/


findNodeByCode(code){



    return this.nodes.find(



        node =>

        node.code === code



    );



}









/*
----------------------------------------------

Find Latest AU


----------------------------------------------

*/


findLatestAU(){



    let result =

        null;





    for(

        let i=this.nodes.length-1;

        i>=0;

        i--

    ){



        if(

            this.nodes[i].type === "AU"

        ){



            result =

                this.nodes[i];



            break;



        }



    }





    return result;



}









/*
----------------------------------------------

Validate Mapping


----------------------------------------------

*/


validate(rootNodes){



    let errors=[];





    const check=(node)=>{



        if(

            node.children.length===0

            &&

            node.type==="AC"

        ){



            errors.push({



                code:

                    node.code,



                message:

                "AC node has no child"



            });



        }





        node.children.forEach(

            child =>

            check(child)

        );



    };





    rootNodes.forEach(

        node =>

        check(node)

    );





    return errors;



}
```

}

window.BOMMapper = BOMMapper;
