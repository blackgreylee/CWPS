# /*

CWPS Enterprise

Supplier Quotation Engine

Sprint:

1.5.2

Build:

0001

Description:

Supplier quotation comparison
and analysis engine

==================================================
*/

class QuotationEngine {

```
constructor(){



    this.quotations = [];



}









/*
----------------------------------------------

Create Quotation


----------------------------------------------

*/


createQuotation(data){



    return new QuotationModel(

        data

    );



}









/*
----------------------------------------------

Add Quotation


----------------------------------------------

*/


addQuotation(

    quotation

){



    this.quotations.push(

        quotation

    );





    return quotation;



}









/*
----------------------------------------------

Get Quotations


----------------------------------------------

*/


getQuotations(){



    return this.quotations;



}









/*
----------------------------------------------

Filter By Material


----------------------------------------------

*/


getByMaterial(

    materialCode

){



    return this.quotations.filter(



        item =>



        item.materialCode === materialCode



    );



}









/*
----------------------------------------------

Compare Supplier Quotes


----------------------------------------------

----------------------------------------------

*/


compareQuotes(

    materialCode

){



    let list =

        this.getByMaterial(

            materialCode

        );





    return list.sort(



        (a,b)=>



        a.unitPrice -

        b.unitPrice



    );



}









/*
----------------------------------------------

Get Lowest Price


----------------------------------------------

----------------------------------------------

*/


getLowestPrice(

    materialCode

){



    let list =

        this.compareQuotes(

            materialCode

        );





    if(

        list.length === 0

    ){



        return null;



    }





    return list[0];



}









/*
----------------------------------------------

Calculate Average Price


----------------------------------------------

----------------------------------------------

*/


getAveragePrice(

    materialCode

){



    let list =

        this.getByMaterial(

            materialCode

        );





    if(

        list.length === 0

    ){



        return 0;



    }





    let total = 0;





    list.forEach(item=>{



        total +=

            item.unitPrice;



    });





    return total /

        list.length;



}









/*
----------------------------------------------

Supplier Ranking


----------------------------------------------

----------------------------------------------

*/


rankSuppliers(

    materialCode

){



    let list =

        this.compareQuotes(

            materialCode

        );





    return list.map(



        (item,index)=>({



            rank:

                index + 1,



            supplier:

                item.supplierName,



            supplierId:

                item.supplierId,



            unitPrice:

                item.unitPrice,



            totalAmount:

                item.totalAmount



        })



    );



}









/*
----------------------------------------------

Recommend Supplier


----------------------------------------------

----------------------------------------------

*/


recommendSupplier(

    materialCode

){



    let lowest =

        this.getLowestPrice(

            materialCode

        );





    if(

        !lowest

    ){



        return null;



    }





    return {



        supplierId:

            lowest.supplierId,



        supplierName:

            lowest.supplierName,



        unitPrice:

            lowest.unitPrice,



        reason:

            "最低報價"



    };



}









/*
----------------------------------------------

Approve Quotation


----------------------------------------------

----------------------------------------------

*/


approveQuotation(

    quotationId

){



    let quotation =



        this.quotations.find(



            item =>



            item.id === quotationId



        );





    if(

        !quotation

    ){



        return null;



    }





    quotation.approve();





    return quotation;



}









/*
----------------------------------------------

Price Analysis


----------------------------------------------

----------------------------------------------

*/


priceAnalysis(

    materialCode

){



    let list =

        this.getByMaterial(

            materialCode

        );





    if(

        list.length === 0

    ){



        return null;



    }





    let prices =



        list.map(



            item =>

            item.unitPrice



        );





    return {



        count:

            prices.length,



        lowest:

            Math.min(

                ...prices

            ),



        highest:

            Math.max(

                ...prices

            ),



        average:

            this.getAveragePrice(

                materialCode

            )



    };



}
```

}

window.QuotationEngine = QuotationEngine;
