class Api::V1::ExpensesController < ApplicationController
	protect_from_forgery with: :null_session

	# get
	def index
		if params[:category_id].present?
			cat = params[:category_id]
		else
			cat =  '%'
		end
		
		if params[:type_id].present?
			type = params[:type_id]
		else
			type =  '%'
		end

		@transactions =  Transaction.where('category_id like ? AND type_id like ?',cat,type)

		render json: @transactions,  status: :ok
	end

	# post
	def create
		@transaction = Transaction.create(transaction_params)

		if @transaction.save
			render json: @transaction, status: :created
		else
			render json: @transaction.errors, status: :unprocessable_entity
		end
	end

	#patch
	def update
		@transaction = Transaction.find(params[:id])
		if @transaction.update(transaction_params)
			render json: @transaction, status: :ok
		else
			render json: @transaction.errors, status: :unprocessable_entity
		end
	end

	#delete
	def destroy
		transaction = Transaction.find(params[:id])
		transaction.destroy

		head :no_content
	end

	private
    def transaction_params
      params.permit(:type_id, :category_id, :date, :concept, :amount)
    end

end