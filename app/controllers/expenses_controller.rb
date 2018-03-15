class ExpensesController < ApplicationController
	def index
		hoy = Date.today
		@types = Type.all
		@categories = Category.all
		@transactions = Transaction.expenses_month(hoy.year,hoy.month,nil,nil,1).order('date DESC')
	end
end
