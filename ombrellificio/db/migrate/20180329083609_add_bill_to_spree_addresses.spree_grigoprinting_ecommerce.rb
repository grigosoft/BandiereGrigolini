# This migration comes from spree_grigoprinting_ecommerce (originally 20180326103046)
class AddBillToSpreeAddresses < ActiveRecord::Migration[5.1]
  def change
    #add_column :spree_addresses, :user_id, :integer
    add_column :spree_addresses, :is_bill, :bool, default: false
    #remove_column :spree_addresses, :editable
  end
end
