# README

## テーブル設計

### postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null:false|

#### Association
- has_many :images

### imagesテーブル

|Column|Type|Options|
|------|----|-------|
|src|text|null:false|
|post|references|foreign_key: true|

#### Association
- belongs_to :post