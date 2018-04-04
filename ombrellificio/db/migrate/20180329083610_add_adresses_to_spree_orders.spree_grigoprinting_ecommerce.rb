# This migration comes from spree_grigoprinting_ecommerce (originally 20180326103132)
class AddAdressesToSpreeOrders < ActiveRecord::Migration[5.1]
  def change
    # remove_column :spree_orders, :bill_adress_id
    # remove_column :spree_orders, :ship_adress_id
    #
    # add_column :spree_orders, :bill_adress, :string
    # add_column :spree_orders, :ship_adress, :string
    add_column :spree_orders, :richiesta_fattura, :bool, default: true
  end
end
