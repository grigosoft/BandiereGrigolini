# This migration comes from spree_grigoprinting_ecommerce (originally 20180308191733)
class AddStatoUploadToSpreeLineItems < ActiveRecord::Migration[5.1]
  def change
    # add_column :spree_line_items, :storico_files, :string, default: nil
  end
end
