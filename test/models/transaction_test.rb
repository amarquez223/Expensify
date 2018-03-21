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

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  	test "should not save transaction without type" do
  		category = Category.first
  		transaction = Transaction.new
  		transaction.category_id = category.id
  		transaction.date = Date.today
  		transaction.concept =  "Concepto de Prueba"
  		transaction.amount = 150000

  		assert_not transaction.save, "Saved the transaction without a type"
  	end

  	test "should not save transaction without category" do
  		type = Type.first
  		transaction = Transaction.new
  		transaction.type_id = type.id
  		transaction.date = Date.today
  		transaction.concept =  "Concepto de Prueba"
  		transaction.amount = 150000

  		assert_not transaction.save, "Saved the transaction without a category"
  	end

  	test "should not save transaction without a valid concept (minimum 5 characters)" do
  		type = Type.first
  		category = Category.first
  		transaction = Transaction.new
  		transaction.type_id = type.id
  		transaction.category_id = category.id
  		transaction.date = Date.today
  		transaction.concept =  "Pru"
  		transaction.amount = 150000

  		assert_not transaction.save, "Saved the transaction without a valid concept"
  	end

  	test "should not save transaction without a date" do
  		type = Type.first
  		category = Category.first
  		transaction = Transaction.new
  		transaction.type_id = type.id
  		transaction.category_id = category.id
  		transaction.concept =  "Concepto de Prueba"
  		transaction.amount = 150000

  		assert_not transaction.save, "Saved the transaction without a date"
  	end

  	test "should not save transaction without an amount" do
  		type = Type.first
  		category = Category.first
  		transaction = Transaction.new
  		transaction.type_id = type.id
  		transaction.category_id = category.id
  		transaction.concept =  "Concepto de Prueba"
  		
  		assert_not transaction.save, "Saved the transaction without an amount"
  	end

  	test "sums for expenses in a month have to be correct" do
  		sum01 = Transaction.expenses_month(2018,3)
  		sum02 = Transaction.where("date between ? and ?", '2018-03-01', '2018-03-31').sum("amount")

  		assert_equal sum01, sum02, "Sums are different (method an query)"
  	end
end
