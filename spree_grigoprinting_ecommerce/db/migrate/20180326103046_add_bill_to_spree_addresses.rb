class AddBillToSpreeAddresses < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_addresses, :is_bill, :bool, default: false
  end
end
