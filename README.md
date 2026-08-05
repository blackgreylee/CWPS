# CWPS Enterprise

## Curtain Wall Procurement System

幕牆工程採購管理系統

---

# 1. Project Overview

## 專案名稱

CWPS Enterprise

## 全名

Curtain Wall Procurement System

## 專案目的

CWPS 是一套針對幕牆工程產業所設計的採購管理系統。

系統目標：

* 整合設計部門圖面資料
* 管理工程批次資料
* 建立 BOM 樹狀結構
* 自動統計材料需求
* 管理加工件資料
* 管理玻璃資料
* 整合廠商詢價
* 管理採購流程
* 追蹤出貨進度
* 管理請款與發票

---

# 2. Project Information

| 項目                 | 內容                              |
| ------------------ | ------------------------------- |
| Project Name       | CWPS Enterprise                 |
| System Name        | Curtain Wall Procurement System |
| Repository         | CWPS                            |
| Current Version    | Sprint 1.3.1                    |
| Build Number       | Build 0001                      |
| Development Type   | Web Application                 |
| Frontend           | HTML / CSS / JavaScript         |
| UI Framework       | Bootstrap 5                     |
| Data Format        | JSON / Excel                    |
| Development Status | Development                     |

---

# 3. System Scope

CWPS 系統包含以下主要模組：

## Project Management

工程專案管理。

功能：

* 工程基本資料
* 客戶資料
* 專案狀態

## Batch Management

批次管理。

功能：

* 設計批次
* 圖面批次
* BOM版本

## BOM Management

BOM 樹狀結構管理。

支援：

* 批次
* AU 組合圖
* AC 小組合圖
* 加工件
* 玻璃

## Material Management

材料管理。

包含：

* 材料分類
* 規格
* 單位
* 數量

## Procurement Management

採購管理。

包含：

* 詢價
* 報價
* 採購單
* 交貨

## Shipment Management

出貨管理。

包含：

* 出貨確認
* 到貨追蹤

## Invoice Management

請款管理。

包含：

* 發票
* 請款紀錄

---

# 4. BOM Structure

CWPS 採用樹狀 BOM 架構。

範例：

```
工程

└── 批次 Z05

    └── AU001 組合圖

        ├── AC001 小組合圖

        │   ├── AC001-1 加工件
        │   ├── AC001-2 加工件
        │   └── AC001-3 加工件

        ├── AC002 加工件

        └── GL001 玻璃
```

BOM 規則：

* 上層節點可為組合圖或加工件
* AU 不固定為最終層級
* AC 可包含子加工件
* 批次可包含不同版本 BOM

---

# 5. Development Environment

## Required

建議環境：

* Windows 10 / Windows 11
* Google Chrome / Edge
* Visual Studio Code
* Git

## Optional

後續版本：

* Node.js
* Database Server
* API Server

---

# 6. Project Structure

```
CWPS/

│
├── README.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
│
├── docs/
│   ├── Requirements.md
│   ├── Architecture.md
│   ├── DatabaseDesign.md
│   └── SprintPlan.md
│
├── src/
│
│   ├── index.html
│
│   ├── css/
│   │   ├── style.css
│   │   ├── layout.css
│   │   ├── menu.css
│   │   └── dashboard.css
│
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   ├── storage.js
│   │   ├── ui.js
│   │   └── utils.js
│
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── batch.html
│   │   ├── bom.html
│   │   ├── material.html
│   │   ├── supplier.html
│   │   ├── quotation.html
│   │   ├── purchase.html
│   │   ├── shipment.html
│   │   └── invoice.html
│
│   └── assets/
│
├── data/
│   ├── config.json
│   ├── sample_bom.json
│   └── materials.json
│
├── excel/
│
├── tests/
│
└── release/

```

---

# 7. Sprint Development Status

## Sprint 1.3.1

### Goal

建立 CWPS 基礎框架。

### Completed

* Project Structure
* Bootstrap 5 Layout
* Dashboard Framework
* Router Framework
* Local Storage Framework
* JSON Data Manager Framework

### Developing

* Main Page
* Navigation Menu
* Common UI Component

---

# 8. Sprint Roadmap

## Sprint 1.3

基礎系統

* Project Architecture
* Dashboard
* BOM Tree
* Excel Import
* Material Structure
* Version Framework

## Sprint 2.0

BOM與資料管理

* BOM Version Control
* Difference Comparison
* Quantity Calculation
* Material Analysis

## Sprint 3.x

採購流程

* Supplier Management
* Quotation Management
* Purchase Order
* Shipment Tracking
* Invoice Management

## Sprint 4.x

Enterprise Version

* User Permission
* Database
* API
* Dashboard Report
* System Optimization

---

# 9. Version Control

版本格式：

```
Sprint X.X.X

Build XXXX
```

範例：

```
Sprint 1.3.1

Build 0001
```

---

# 10. Development Rules

## Coding Rule

* 模組化設計
* 保持向下相容
* 不修改已完成模組
* 新功能新增模組
* 統一資料格式

## Data Rule

所有資料來源：

* JSON
* Excel
* Database

資料流：

```
Excel

↓

Import Module

↓

Data Manager

↓

Database

↓

Application
```

---

# 11. Git Workflow

開發流程：

```
Development

↓

Testing

↓

Commit

↓

Version Tag

↓

Release
```

版本標記：

```
v1.3.1-build0001
```

---

# 12. License

Internal Use Only

CWPS Enterprise

Curtain Wall Procurement System
