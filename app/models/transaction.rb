# == Schema Information
#
# Table name: transactions
#
#  id          :integer          not null, primary key
#  type_id     :integer
#  category_id :integer
#  date        :date
#  concept     :string
#  amount      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Transaction < ApplicationRecord
  belongs_to :type
  belongs_to :category

  validates :date, :concept, :amount, presence: true 
end
