class AddPersonalizzabileToSpreeProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_products, :personalizzabile, :bool, default: false
  end
end
