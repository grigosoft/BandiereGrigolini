class AddAdressesToSpreeOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_orders, :richiesta_fattura, :bool, default: true
  end
end
