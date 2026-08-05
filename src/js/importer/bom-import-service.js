# /*

CWPS Enterprise

BOM Import Service

Sprint:

1.3.3

Build:

0001

Description:

Excel BOM import workflow service

==================================================
*/

class BOMImportService {

```
constructor(){



    this.parser =

        new ExcelParser();





    this.mapper =

        new BOMMapper();



}









/*
----------------------------------------------

Import Excel BOM


----------------------------------------------

*/


importExcel(

    sheetData,

    batch

){



    /*
    Step 1

    Parse Excel


    */


    let rows =

        this.parser.parse(

            sheetData

        );








    /*
    Step 2

    Create BOM Tree


    */


    let tree =

        this.mapper.map(

            rows

        );








    /*
    Step 3

    Create New Version


    */


    if(batch){



        batch.createNewVersion();




        batch.bomNodes =

            tree;





        this.saveHistory(

            batch,

            rows.length

        );



    }








    return {



        batch:batch,


        tree:tree,


        rowCount:

            rows.length



    };



}









/*
----------------------------------------------

Save Import History


----------------------------------------------

*/


saveHistory(

    batch,

    count

){



    batch.importHistory.push({



        version:

            batch.version,



        date:

            new Date()

            .toISOString(),



        recordCount:

            count,



        status:

            "Imported"



    });



}









/*
----------------------------------------------

Compare Version


基礎版本比較


----------------------------------------------

*/


compareVersion(

    oldBatch,

    newTree

){



    let result = {



        added:[],


        removed:[],


        changed:[]



    };





    let oldNodes =

        this.flatten(

            oldBatch.bomNodes

        );





    let newNodes =

        this.flatten(

            newTree

        );





    let oldCodes =

        oldNodes.map(

            n=>n.code

        );





    let newCodes =

        newNodes.map(

            n=>n.code

        );








    newCodes.forEach(code=>{



        if(

            !oldCodes.includes(

                code

            )

        ){



            result.added.push(

                code

            );



        }



    });






    oldCodes.forEach(code=>{



        if(

            !newCodes.includes(

                code

            )

        ){



            result.removed.push(

                code

            );



        }



    });






    return result;



}









/*
----------------------------------------------

Flatten Tree


----------------------------------------------

*/


flatten(nodes){



    let result=[];





    const walk=(node)=>{



        result.push(

            node

        );





        node.children.forEach(

            child=>

            walk(child)

        );



    };





    nodes.forEach(

        node=>

        walk(node)

    );





    return result;



}









/*
----------------------------------------------

Rollback Version


基礎功能


----------------------------------------------

*/


rollback(

    batch,

    version

){



    batch.status =

        "Rollback:" +

        version;





    return batch;



}
```

}

window.BOMImportService = BOMImportService;
