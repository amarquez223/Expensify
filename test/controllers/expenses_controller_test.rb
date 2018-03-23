require 'test_helper'

class ExpensesControllerTest < ActionDispatch::IntegrationTest
  
  setup do
  	@transaction = transactions(:one)
  end

  test "Should get index" do
  	get expenses_path
  	assert_response :success
  	assert_not_nil assigns(:types)
  	assert_not_nil assigns(:categories)
  	assert_not_nil assigns(:transactions) 
  end

  test "Should create an expense" do
  	assert_difference "Transaction.count" do
  		post expenses_path, params: { transaction: {type_id: @transaction.type_id,  category_id: @transaction.category_id, date: @transaction.date, concept: @transaction.concept, amount: @transaction.amount }}
  	end

  	#assert_redirected_to expenses_path
  end
end