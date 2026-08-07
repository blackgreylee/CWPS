# CWPS Enterprise
# BOM Specification

Version : Sprint 2.9.0.4

Status : Draft

---

# 1. Purpose

本文件定義 CWPS

(BOM Management Module)

的資料結構、

展開規則、

數量計算方式、

版本管理方式。


BOM 是 CWPS 所有採購需求的來源。

流程：

```

Engineering Drawing

        ↓

BOM Import

        ↓

BOM Version

        ↓

BOM Tree

        ↓

Material Quantity

        ↓

Requirement

        ↓

Procurement


```

---

# 2. BOM Structure Overview


CWPS BOM 採用 Tree Structure。


範例：


```

Batch Z05

│

├── AU001
│
│     (Assembly Drawing)
│
│
├── AC001
│
│      (Sub Assembly)
│
│
│      ├── AC001-1
│      │
│      │      (Processing Part)
│      │
│      ├── AC001-2
│      │
│      │      (Processing Part)
│      │
│      └── AC001-3
│
│
├── AC002
│
│      (Processing Part)
│
│
└── GL001

       (Glass)


```

---

# 3. BOM Node Definition


每一個 BOM 項目皆為 Node。


Entity:

BOMNode


Fields:


| Field | Description |
|-|-|
| NodeID | 唯一識別 |
| ParentNodeID | 父節點 |
| NodeCode | 編號 |
| NodeName | 名稱 |
| NodeType | 類型 |
| Quantity | 數量 |
| Unit | 單位 |
| MaterialID | 材料 |

---

# 4. Node Type Definition


## Assembly

組合圖。


例如：

AU001


特徵：

- 可包含 Child Node
- 不直接採購


---

## SubAssembly

小組合圖。


例如：

AC001


特徵：

- 可包含 Child Node
- 可作為數量展開中間節點


---

## ProcessingPart


加工件。


例如：

AC001-1


特徵：

- 通常為 Leaf Node
- 需要材料計算


---

## Glass


玻璃。


特徵：

- 面積計算
- 厚度管理


---

## Hardware


五金。


特徵：

- 件數計算


---

# 5. Node Hierarchy Rules


## Rule BOM-001


Parent Node

可包含：

0~N Child Node。


---

## Rule BOM-002


Leaf Node

不得包含 Child。


---

## Rule BOM-003


Assembly

不得直接產生採購需求。


---

## Rule BOM-004


只有 Material Node

或 Leaf Node

可以轉換 Requirement。


---

# 6. BOM Version


每次匯入 BOM：

建立新的 Version。


例如：


```

Z05

Version 001

Version 002

Version 003


```


---

# Version Status


| Status | Description |
|-|-|
| Draft | 新匯入 |
| Active | 使用中 |
| Archived | 歷史版本 |
| Void | 作廢 |


---

# Version Rules


## BOM-V001


不可覆蓋舊版本。


---

## BOM-V002


Active Version

同 Batch

只能有一個。


---

## BOM-V003


Void Version

不可刪除。


---

# 7. BOM Import Rules


匯入流程：


```

Excel BOM

↓

Parser

↓

Validation

↓

Compare

↓

Create Version

↓

Activate


```


---

# 8. BOM Validation Rules


匯入時檢查：


## BOM-I001


NodeCode

不可重複。


---

## BOM-I002


Parent Node

必須存在。


---

## BOM-I003


Material

必須存在。


---

## BOM-I004


Unit

必須符合 Material 定義。


---

# 9. BOM Difference Detection


不同 Version 比較：


比較項目：


| Item | Compare |
|-|-|
| NodeCode | Yes |
| NodeType | Yes |
| Quantity | Yes |
| Material | Yes |
| Dimension | Yes |
| Surface Treatment | Yes |


---

# 10. Quantity Expansion Rule


BOM Tree 展開：


```

Root

 ↓

Child

 ↓

Child

 ↓

Leaf


```


計算：

```

Final Quantity

=

Parent Quantity

×

Child Quantity

×

Accumulated Quantity


```


---

# 11. Material Aggregation


不同 BOM Node

相同 Material：

必須合併。


例如：


```

AC001-1

Aluminum A

10kg


AC002

Aluminum A

20kg


```


結果：

```

Aluminum A

30kg


```


---

# 12. Unit Conversion


支援：


| Unit | Type |
|-|-|
| pcs | 件 |
| m | 長度 |
| m² | 面積 |
| kg | 重量 |
| set | 組 |


---

# 13. Dimension Rules


Processing Part

需保存：


```

Length

Width

Height

Thickness

Surface Treatment


```


---

# 14. Processing Part Comparison


同 Project

同 Processing Code


比較：


```

Dimension

Material

Treatment

Remark


```


若不同：

產生 Warning。


---

# 15. BOM Output


BOM Engine

需提供：


## Tree View


完整階層。


---

## Flat List


展開後材料清單。


---

## Material Summary


材料統計。


---

## Procurement List


採購需求。


---

# 16. BOM Engine Responsibility


BOM Engine

負責：


- Tree 建立
- Node 查找
- Version Compare
- BOM Validation


不負責：


- 採購
- 報價
- 出貨


---

# 17. Quantity Engine Responsibility


Quantity Engine

負責：


- 數量展開
- 單位轉換
- 合計


不負責：


- BOM Tree 管理


---

# 18. Material Engine Responsibility


Material Engine

負責：


- 材料分類
- 重量分析
- 用量分析


---

# 19. Future Extension


支援：


- CAD BOM Import
- Excel Import
- API BOM Import
- AI BOM Analysis

