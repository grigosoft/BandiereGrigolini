class AddStatoUploadToSpreeLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_line_items, :approvatore_upload_id, :integer, default: nil
    add_column :spree_line_items, :approvato_upload, :time, default: nil
  end
end
