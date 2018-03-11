class DashboardController < ApplicationController
	def index
    	@transactions = Transaction.all
  	end
end
