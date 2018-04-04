class RemoveBillFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :spree_users, :bill_address_id
  end
end
