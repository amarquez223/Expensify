class ExpensesController < ApplicationController
	def index
		@types = Type.all
		@categories = Category.all

		if params[:type].present?
			type = params[:type]
		else
			type = nil
		end
		
		if params[:cat].present?
			cat = params[:cat]
		else
			cat = nil
		end
		
		if params[:date].present?
			date = params[:date].to_date
		else
			date = Date.today
		end

		@transactions = Transaction.expenses_month(date.year,date.month,type,cat,1).order('date DESC')

		render locals: {active_type: type, active_cat: cat, active_date: date}
	end

	def create
		@transaction = Transaction.new(transaction_params)
		@transaction.save
		redirect_to expenses_path
	end

	protected
	def transaction_params
		params.permit(:type_id,:category_id,:date,:concept,:amount)
	end
end
