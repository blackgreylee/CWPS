# CWPS Enterprise
# Database Specification

Version : Sprint 2.9.0.2

Status : Draft

---

# 1. Project

Description

專案基本資料。

## Primary Key

ProjectID

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ProjectID | String(36) | Yes | UUID |
| ProjectCode | String(30) | Yes | 專案代號 |
| ProjectName | String(200) | Yes | 專案名稱 |
| Customer | String(200) | No | 業主 |
| Contractor | String(200) | No | 總包 |
| Designer | String(200) | No | 設計公司 |
| Status | Enum | Yes | Draft / Active / Closed |
| CreateDate | DateTime | Yes | 建立時間 |
| UpdateDate | DateTime | Yes | 更新時間 |

---

# 2. Batch

Description

出圖批次。

## Primary Key

BatchID

## Foreign Key

ProjectID

## Fields

| Field | Type |
|-------|------|
| BatchID | String(36) |
| ProjectID | String(36) |
| BatchCode | String(50) |
| BatchName | String(200) |
| DrawingDate | Date |
| Status | Enum |

---

# 3. BOMVersion

Description

每次匯入 BOM 建立一個 Version。

## Primary Key

VersionID

## Foreign Key

BatchID

## Fields

| Field | Type |
|-------|------|
| VersionID | String(36) |
| BatchID | String(36) |
| VersionNo | Integer |
| IsCurrent | Boolean |
| ImportTime | DateTime |
| ImportUser | String(100) |
| Remark | String(500) |

---

# 4. BOMNode

Description

BOM Tree 節點。

## Primary Key

NodeID

## Foreign Key

VersionID

ParentNodeID

## Fields

| Field | Type |
|-------|------|
| NodeID | String(36) |
| VersionID | String(36) |
| ParentNodeID | String(36) |
| NodeCode | String(100) |
| NodeName | String(200) |
| NodeType | Enum |
| Quantity | Decimal |
| Unit | String(20) |
| MaterialID | String(36) |

NodeType：

- Assembly
- SubAssembly
- Part
- Glass
- Hardware
- Processing

---

# 5. Material

Description

材料主檔。

## Primary Key

MaterialID

## Fields

| Field | Type |
|-------|------|
| MaterialID | String(36) |
| MaterialCode | String(100) |
| MaterialName | String(200) |
| Category | Enum |
| Specification | String(200) |
| Unit | String(20) |
| UnitWeight | Decimal |
| Status | Enum |

---

# 6. Supplier

## Primary Key

SupplierID

## Fields

| Field | Type |
|-------|------|
| SupplierID | String(36) |
| SupplierCode | String(50) |
| SupplierName | String(200) |
| Contact | String(100) |
| Phone | String(50) |
| Email | String(200) |
| Rating | Decimal |

---

# 7. Requirement

## Primary Key

RequirementID

## Foreign Key

MaterialID

## Fields

| Field | Type |
|-------|------|
| RequirementID | String(36) |
| MaterialID | String(36) |
| RequiredQty | Decimal |
| PurchaseQty | Decimal |
| Status | Enum |

---

# 8. Quotation

## Primary Key

QuotationID

## Foreign Key

RequirementID

SupplierID

## Fields

| Field | Type |
|-------|------|
| QuotationID | String(36) |
| RequirementID | String(36) |
| SupplierID | String(36) |
| UnitPrice | Decimal |
| Currency | String(10) |
| QuoteDate | Date |

---

# 9. Purchase

## Primary Key

PurchaseID

## Foreign Key

QuotationID

## Fields

| Field | Type |
|-------|------|
| PurchaseID | String(36) |
| QuotationID | String(36) |
| PurchaseNo | String(50) |
| OrderDate | Date |
| TotalAmount | Decimal |
| Status | Enum |

---

# 10. Shipment

## Primary Key

ShipmentID

## Foreign Key

PurchaseID

## Fields

| Field | Type |
|-------|------|
| ShipmentID | String(36) |
| PurchaseID | String(36) |
| ShipmentNo | String(50) |
| ShipmentDate | Date |
| Status | Enum |

---

# 11. Invoice

## Primary Key

InvoiceID

## Foreign Key

ShipmentID

## Fields

| Field | Type |
|-------|------|
| InvoiceID | String(36) |
| ShipmentID | String(36) |
| InvoiceNo | String(50) |
| InvoiceDate | Date |
| Amount | Decimal |
| Status | Enum |

---

# 12. Relationship

Project

1

↓

N

Batch

↓

1

↓

N

BOMVersion

↓

1

↓

N

BOMNode

↓

N

↓

1

Material

Requirement

↓

Quotation

↓

Purchase

↓

Shipment

↓

Invoice

Supplier

↓

Quotation

---

# 13. Index

ProjectCode

BatchCode

MaterialCode

SupplierCode

PurchaseNo

InvoiceNo

皆建立 Index。

---

# 14. Version Policy

所有 BOM

禁止覆蓋。

只能新增 Version。

Version：

Current

Archived

Void

---

# 15. Future Database

支援：

- LocalStorage
- IndexedDB
- SQLite
- SQL Server
- PostgreSQL
- MySQL

Storage API 不變。
