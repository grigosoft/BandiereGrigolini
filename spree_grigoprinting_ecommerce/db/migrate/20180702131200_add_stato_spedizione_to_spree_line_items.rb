class AddStatoSpedizioneToSpreeLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_line_items, :stato_spedizione, :string, default: nil
  end
end
