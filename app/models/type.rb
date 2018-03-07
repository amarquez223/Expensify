# == Schema Information
#
# Table name: types
#
#  id         :integer          not null, primary key
#  typename   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Type < ApplicationRecord
	has_many :transactions

	validates :typename, presence: true
end
