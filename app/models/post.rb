class Post < ApplicationRecord

  # assosiation
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true, update_only: true

  # validation
  validates :images, length: { minimum: 1, maximum: 5, message: "の数が不正です" }
  validates :text, presence: true
end
