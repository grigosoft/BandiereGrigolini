class CreateUploads < ActiveRecord::Migration[5.1]
  def change
    create_table :spree_uploads do |t|

      t.integer :line_item_id
      t.integer :order_id
      t.timestamps
    end
  end
end
