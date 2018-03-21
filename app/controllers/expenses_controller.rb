class ExpensesController < ApplicationController

	def index
		data = initial
		render locals: {active_type: data[0], active_cat: data[1], active_date: data[2], message: nil}
	end

	def create
		@transaction = Transaction.new(transaction_params)
		message = "Gasto <strong>" + @transaction.concept + "</strong> por <strong>" + 
			@transaction.amount.to_s.gsub(/(\d)(?=(\d{3})+(?!\d))/, "\\1,")  + 
			"</strong> en <strong>" + @transaction.date.strftime("%b") + "-" + @transaction.date.strftime("%Y") + 
			"</strong> fue adicionado exitosamente"
		if @transaction.save
			data = initial
			render :index, locals: {active_type: data[0], active_cat: data[1], active_date: data[2], 
				message: message.html_safe}
		end
	end

	def edit
		@types = Type.all
		@categories = Category.all
		@transaction = Transaction.find(params[:id])
	end

	def destroy
		transaction = Transaction.find(params[:id])
		message = "Gasto <strong>" + transaction.concept + "</strong> por <strong>" + 
			transaction.amount.to_s.gsub(/(\d)(?=(\d{3})+(?!\d))/, "\\1,")  + 
			"</strong> en <strong>" + transaction.date.strftime("%b") + "-" + transaction.date.strftime("%Y") + 
			"</strong> fue borrado exitosamente"
		if transaction.destroy
			data = initial
			render :index, locals: {active_type: data[0], active_cat: data[1], active_date: data[2], 
				message: message.html_safe}
		end
	end

	protected
	def transaction_params
		params.permit(:type_id,:category_id,:date,:concept,:amount)
	end

	private
	def initial
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
		data = Array.new()
		data.push type,cat,date
		data
	end
end
