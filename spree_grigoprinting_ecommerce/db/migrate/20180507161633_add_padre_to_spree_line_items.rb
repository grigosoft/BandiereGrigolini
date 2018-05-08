class AddStatoUploadToSpreeLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_line_items, :padre_id, :integer, default: nil
  end
end
