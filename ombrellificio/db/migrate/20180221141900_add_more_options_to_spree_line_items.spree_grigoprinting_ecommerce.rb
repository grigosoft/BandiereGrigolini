# This migration comes from spree_grigoprinting_ecommerce (originally 20180215125449)
class AddMoreOptionsToSpreeLineItems < SpreeExtension::Migration[4.2]
  def change
    add_column :spree_line_items, :more_options, :string
  end
end
