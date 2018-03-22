module Spree
  module Admin
    OrdersController.class_eval do

      def approva_files
        load_order
      end

    end
  end
end
