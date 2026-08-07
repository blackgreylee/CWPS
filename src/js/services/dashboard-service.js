/*
==================================================

 CWPS Enterprise

 File:
 src/js/services/dashboard-service.js

 Sprint:
 2.9.1

 Build:
 Enterprise Dashboard Service Layer

 Description:
 Dashboard Data Aggregation Service

==================================================
*/

(function (global) {

"use strict";

class DashboardService {

    constructor() {

        this.projectStorage =
            new ProjectStorage();

        this.requirementStorage =
            new RequirementStorage();

        this.purchaseStorage =
            new PurchaseStorage();

        this.shipmentStorage =
            new ShipmentStorage();

        this.invoiceStorage =
            new InvoiceStorage();

        this.supplierStorage =
            new SupplierStorage();

        this.materialStorage =
            new MaterialStorage();

    }

    /*
    ==============================================

    Dashboard Data

    ==============================================
    */

    async getDashboard() {

        const [

            projects,

            requirements,

            purchases,

            shipments,

            invoices,

            suppliers,

            materials

        ] = await Promise.all([

            this.projectStorage.getAll(),

            this.requirementStorage.getAll(),

            this.purchaseStorage.getAll(),

            this.shipmentStorage.getAll(),

            this.invoiceStorage.getAll(),

            this.supplierStorage.getAll(),

            this.materialStorage.getAll()

        ]);

        return {

            project: {

                count:
                    projects.length

            },

            material: {

                count:
                    materials.length

            },

            supplier: {

                count:
                    suppliers.length,

                ranking:
                    this.buildSupplierRanking(
                        suppliers
                    )

            },

            procurement: {

                amount:
                    this.calculatePurchaseAmount(
                        purchases
                    ),

                requirementProgress:
                    this.calculateProgress(
                        requirements
                    ),

                purchaseProgress:
                    this.calculateProgress(
                        purchases
                    ),

                shipmentProgress:
                    this.calculateProgress(
                        shipments
                    ),

                invoiceProgress:
                    this.calculateProgress(
                        invoices
                    )

            }

        };

    }

    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */

    buildSupplierRanking(list) {

        return [...list]

            .sort(

                (a, b) =>

                    (b.performanceScore || 0)

                    -

                    (a.performanceScore || 0)

            )

            .slice(0, 10);

    }

    /*
    ==============================================

    Purchase Amount

    ==============================================
    */

    calculatePurchaseAmount(list) {

        return list.reduce(

            (sum, item) =>

                sum +

                Number(item.totalAmount || 0),

            0

        );

    }

    /*
    ==============================================

    Progress

    ==============================================
    */

    calculateProgress(list) {

        if (list.length === 0) {

            return 0;

        }

        const finished = list.filter(

            item =>

                item.status === "Completed"

        ).length;

        return Math.round(

            finished /

            list.length *

            100

        );

    }

}

global.DashboardService =
    DashboardService;

})(window);
