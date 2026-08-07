# CWPS Enterprise
# Business Rules

Version : Sprint 2.9.0.3

Status : Draft

---

# 1. Purpose

本文件定義 CWPS (Curtain Wall Procurement System)
所有商業規則。

程式不得自行定義規則。

所有 Engine、
Service、
Controller

皆依照本文件執行。

---

# 2. Project Rules

## BR-001

ProjectCode

必須唯一。

不得重複。

---

## BR-002

Project

不得直接刪除。

只能：

Draft

Active

Closed

Archived

---

# 3. Batch Rules

## BR-100

Batch

屬於一個 Project。

不得跨 Project。

---

## BR-101

BatchCode

同 Project

不得重複。

---

## BR-102

Batch

允許重新匯入。

重新匯入

必須建立：

新 Version。

不得覆蓋。

---

# 4. BOM Version Rules

## BR-200

每次 Import

建立 Version。

---

## BR-201

Version

不得修改。

---

## BR-202

Version

只能：

Current

Archived

Void

---

## BR-203

Current

同一 Batch

只能存在一個。

---

# 5. BOM Tree Rules

## BR-300

BOM

採用 Tree Structure。

---

## BR-301

Node

允許遞迴。

---

## BR-302

Node

可包含：

Assembly

SubAssembly

Processing Part

Glass

Hardware

Material

---

## BR-303

Leaf Node

不得再包含 Child。

---

# 6. Material Rules

## BR-400

MaterialCode

唯一。

---

## BR-401

Material

分類固定。

允許：

新增分類。

不得修改系統分類。

---

## BR-402

同 MaterialCode

規格不得不同。

若：

尺寸

表面處理

材質

不同。

視為：

新 Material。

---

# 7. Processing Part Rules

## BR-500

Processing Part

同一 Project

尺寸應一致。

---

## BR-501

若：

尺寸不同。

系統提示：

差異警告。

---

## BR-502

若：

加工內容不同。

建立：

新版。

---

# 8. Supplier Rules

## BR-600

SupplierCode

唯一。

---

## BR-601

Supplier

可供應：

多個 Material。

---

## BR-602

Material

可由：

多個 Supplier。

---

# 9. Requirement Rules

## BR-700

Requirement

由 Material

自動產生。

---

## BR-701

Requirement

允許：

Merge。

---

## BR-702

Requirement

允許：

Split。

---

# 10. Quotation Rules

## BR-800

Requirement

可向：

多家 Supplier。

詢價。

---

## BR-801

Quotation

不得修改。

重新詢價：

建立新版本。

---

# 11. Purchase Rules

## BR-900

Purchase

由 Quotation

建立。

---

## BR-901

Purchase

允許：

部分採購。

---

## BR-902

Purchase

允許：

追加採購。

---

# 12. Shipment Rules

## BR-1000

Shipment

可：

分批。

---

## BR-1001

Shipment

不得超過：

Purchase。

---

# 13. Invoice Rules

## BR-1100

Invoice

可：

分次請款。

---

## BR-1101

Invoice

金額不得超過：

Shipment。

---

# 14. Analysis Rules

## BR-1200

Dashboard

不得自行計算。

---

## BR-1201

Dashboard

只整合：

Analysis。

---

## BR-1202

Analysis

不得修改資料。

---

# 15. Version Rules

所有：

Import

Export

Delete

Merge

Split

皆寫入：

Audit Log。

---

# 16. Security Rules

Storage

不得：

Business Logic。

---

Engine

不得：

UI。

---

View

不得：

Storage。

---

Controller

不得：

Database。

---

# 17. Future Rules

本文件

為：

CWPS

唯一商業規則來源。

新增規則

必須先修改本文件。

不得：

直接修改程式。
