# CWPS Enterprise
## Database Design Document

Version: Sprint 2.9.0
Status: Draft

---

# 1. System Overview

CWPS (Curtain Wall Procurement System)

本系統主要提供：

- 專案管理
- BOM管理
- 材料分析
- 採購管理
- 出貨管理
- 發票管理
- 成本分析
- 供應商管理

---

# 2. Database Architecture

```
Project
    │
    ├── Batch
    │
    ├── BOM Version
    │
    ├── BOM Node
    │
    ├── Material
    │
    ├── Requirement
    │
    ├── Quotation
    │
    ├── Purchase
    │
    ├── Shipment
    │
    ├── Invoice
    │
    └── Analysis
```

---

# 3. Entity List

目前系統共有下列主要 Entity：

| Entity | Description |
|---------|-------------|
| Project | 專案 |
| Batch | 出圖批次 |
| BOMVersion | BOM版本 |
| BOMNode | BOM節點 |
| Material | 材料 |
| Supplier | 供應商 |
| Requirement | 採購需求 |
| Quotation | 詢價 |
| Purchase | 採購單 |
| Shipment | 出貨 |
| Invoice | 發票 |
| User | 使用者 |
| Setting | 系統設定 |
| Log | 系統紀錄 |

---

# 4. Entity Relationship

## Project

Project

↓

Batch

↓

BOMVersion

↓

BOMNode

↓

Material

---

## Procurement

Requirement

↓

Quotation

↓

Purchase

↓

Shipment

↓

Invoice

---

## Supplier

Supplier

↓

Quotation

↓

Purchase

---

# 5. Primary Keys

Project

ProjectID

Batch

BatchID

BOMVersion

VersionID

BOMNode

NodeID

Material

MaterialID

Supplier

SupplierID

Requirement

RequirementID

Quotation

QuotationID

Purchase

PurchaseID

Shipment

ShipmentID

Invoice

InvoiceID

---

# 6. Foreign Keys

Batch

ProjectID

BOMVersion

BatchID

BOMNode

VersionID

Material

MaterialID

Requirement

MaterialID

Quotation

RequirementID

Purchase

QuotationID

Shipment

PurchaseID

Invoice

ShipmentID

---

# 7. Version Rules

所有 BOM 都採用 Version 管理。

不可覆蓋。

只能新增 Version。

Version 可以：

Active

Archived

Void

---

# 8. Batch Rules

Batch 屬於 Project。

Batch 可以有多個 Version。

同一 Batch 可重新匯入。

---

# 9. BOM Rules

BOM 為 Tree Structure。

Node 可包含：

Assembly

SubAssembly

Part

Glass

Hardware

Processing

Node 可遞迴。

---

# 10. Material Rules

Material 可被多個 BOMNode 使用。

Material 分類：

Aluminum

Glass

Steel

Hardware

Sealant

Accessory

Other

---

# 11. Supplier Rules

Supplier 可供應：

多個 Material。

同一 Material：

可由多個 Supplier 提供。

屬於：

Many-to-Many。

---

# 12. Requirement Rules

Requirement

由 Material 產生。

可合併。

可拆分。

---

# 13. Quotation Rules

一個 Requirement

可有：

多家 Supplier 詢價。

---

# 14. Purchase Rules

Purchase

由 Quotation 建立。

一張 Purchase

可包含：

多個 Requirement。

---

# 15. Shipment Rules

Shipment

屬於 Purchase。

可分批出貨。

Partial Shipment：

允許。

---

# 16. Invoice Rules

Invoice

可包含：

多個 Shipment。

允許：

Partial Invoice。

---

# 17. Analysis

分析模組：

Material Analysis

Supplier Analysis

Cost Analysis

Procurement Analysis

Dashboard

---

# 18. Audit Log

所有重要操作：

建立

修改

刪除

Version

Import

Export

皆寫入 Log。

---

# 19. Future Support

Database Interface：

LocalStorage

IndexedDB

SQLite

SQL Server

PostgreSQL

MySQL

皆可支援。

---

# 20. Development Principles

Storage：

只負責 CRUD。

Engine：

只負責商業邏輯。

Service：

只負責流程整合。

Controller：

只負責 View 溝通。

View：

不得直接操作 Storage。

Database：

不得包含 Business Logic。
