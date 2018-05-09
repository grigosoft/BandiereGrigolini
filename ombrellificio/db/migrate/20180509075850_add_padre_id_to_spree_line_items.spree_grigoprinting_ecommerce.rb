# This migration comes from spree_grigoprinting_ecommerce (originally 20180507161633)
class AddPadreIdToSpreeLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_line_items, :padre_id, :integer, default: nil
  end
end
