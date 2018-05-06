module Spree
  OrdersController.class_eval do
    before_action :add_more_options_to_options, only: [:populate]

    def add_more_options_to_options
      params[:options] = {} if params[:options].nil?
      params[:options][:more_options] = JSON.parse(params[:more_options], symbolize_names: true) if params[:more_options]
    end

  end
end
