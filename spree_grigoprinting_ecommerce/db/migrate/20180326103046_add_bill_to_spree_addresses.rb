class AddBillToSpreeAddresses < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_addresses, :is_bill, :bool, default: false
    #remove_column :spree_addresses, :editable
  end
end
