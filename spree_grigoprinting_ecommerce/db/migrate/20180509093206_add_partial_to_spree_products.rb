class AddPartialToSpreeProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_products, :partial, :string, default: nil
  end
end
