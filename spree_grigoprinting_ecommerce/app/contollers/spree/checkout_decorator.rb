module Spree
  CheckoutController.class_eval do

    def normalize_addresses
      return unless params[:state] == "address" && @order.bill_address_id && @order.ship_address_id

      # ensure that there is no validation errors and addresses were saved
      return unless @order.bill_address && @order.ship_address

      bill_address = @order.bill_address
      ship_address = @order.ship_address
      if @order.bill_address_id != @order.ship_address_id && bill_address.same_as?(ship_address)
        @order.update_column(:ship_address_id, bill_address.id)
        ship_address.destroy
      else
        ship_address.update_attribute(:user_id, spree_current_user.try(:id))
      end
      bill_address.update_attribute(:user_id, spree_current_user.try(:id))
      bill_address.update_attribute(:is_bill, true)
    end
  end # CheckoutController
end
