class AddAttachmentImageToUploads < ActiveRecord::Migration[5.1]
  def self.up
    change_table :spree_uploads do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :spree_uploads, :image
  end
end
