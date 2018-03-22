module Spree
  module Admin
    class LineItemsController < Spree::StoreController

      # chimata ajax dal pannello admin_new_order
      def approvazione
        line_item = Spree::LineItem.find(params[:id])
        line_item.add_storico_files(params[:approvazione], params[:info])
        if line_item.save!
          render json: { message: "Approvazione eseguita" }
        else
          render json: { message: line_item.errors.full_messages.join(',') }
        end
      end

      def storico
        @item = Spree::LineItem.find(params[:id])
        render :partial => "spree/admin/orders/body_storico"
      end
    end
  end
end
