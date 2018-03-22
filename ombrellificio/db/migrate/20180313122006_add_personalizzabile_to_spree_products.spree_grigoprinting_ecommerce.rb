# This migration comes from spree_grigoprinting_ecommerce (originally 20180308170706)
class AddPersonalizzabileToSpreeProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_products, :personalizzabile, :bool, default: false
  end
end
