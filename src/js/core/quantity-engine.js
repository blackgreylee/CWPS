/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/quantity-engine.js


 Sprint:
 2.9.14


 Build:
 Enterprise Quantity Calculation Engine Layer


 Description:
 Quantity Processing Engine


==================================================
*/


(function(global){

"use strict";



class QuantityEngine {



    constructor(){


        this.bomStorage =

            new global.BOMStorage();


        this.materialStorage =

            new global.MaterialStorage();


    }





    /*
    ==============================================

    Unit Normalize

    ==============================================
    */


    normalizeUnit(

        unit

    ){


        const map = {


            "平方公尺":"㎡",

            "平方米":"㎡",

            "M2":"㎡",


            "公尺":"m",

            "米":"m",


            "支":"pcs",

            "件":"pcs",

            "個":"pcs",


            "組":"set",

            "套":"set"


        };





        return map[unit]

            ||

            unit;


    }





    /*
    ==============================================

    Get Leaf Quantity

    ==============================================
    */


    getLeafQuantity(

        versionId

    ){



        const nodes =

            this.bomStorage.getLeafNodes(

                versionId

            );





        return nodes.map(

            node => {



                const material =

                    this.materialStorage.getById(

                        node.materialId

                    );





                return {


                    nodeId:

                        node.nodeId,


                    materialId:

                        node.materialId,


                    materialCode:

                        material

                        ?

                        material.materialCode

                        :

                        "",



                    quantity:

                        Number(

                            node.quantity || 0

                        ),



                    unit:

                        this.normalizeUnit(

                            node.unit

                        )



                };



            }

        );


    }





    /*
    ==============================================

    Summary By Material

    ==============================================
    */


    summarizeByMaterial(

        versionId

    ){



        const items =

            this.getLeafQuantity(

                versionId

            );





        const result = {};





        items.forEach(

            item => {



                const key =

                    item.materialId;



                if(!result[key]){


                    result[key] = {


                        materialId:

                            item.materialId,


                        materialCode:

                            item.materialCode,


                        quantity:

                            0,


                        unit:

                            item.unit



                    };


                }





                result[key].quantity +=

                    item.quantity;



            }

        );





        return Object.values(

            result

        );


    }





    /*
    ==============================================

    Summary By Unit

    ==============================================
    */


    summarizeByUnit(

        versionId

    ){



        const items =

            this.getLeafQuantity(

                versionId

            );





        const result = {};





        items.forEach(

            item => {



                if(!result[item.unit]){


                    result[item.unit] = 0;


                }





                result[item.unit] +=

                    item.quantity;



            }

        );





        return result;



    }





    /*
    ==============================================

    Validate Quantity

    ==============================================
    */


    validate(

        versionId

    ){



        const items =

            this.getLeafQuantity(

                versionId

            );





        const errors = [];





        items.forEach(

            item => {



                if(

                    item.quantity <= 0

                ){



                    errors.push({

                        nodeId:

                            item.nodeId,


                        message:

                            "Invalid quantity"


                    });


                }



                if(

                    !item.unit

                ){



                    errors.push({

                        nodeId:

                            item.nodeId,


                        message:

                            "Unit missing"


                    });


                }



            }

        );





        return {


            valid:

                errors.length === 0,


            errors



        };



    }





    /*
    ==============================================

    Calculate Weight

    ==============================================
    */


    calculateWeight(

        versionId

    ){



        const items =

            this.getLeafQuantity(

                versionId

            );





        let total = 0;





        items.forEach(

            item => {



                const material =

                    this.materialStorage

                    .getById(

                        item.materialId

                    );





                if(material){



                    total +=


                        item.quantity *

                        Number(

                            material.unitWeight || 0

                        );


                }



            }

        );





        return total;



    }



}





global.QuantityEngine =

    QuantityEngine;



})(window);
