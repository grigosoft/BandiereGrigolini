class AddIdentificativoToSpreeAssets < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_assets, :identificativo, :string unless column_exists?(:spree_assets, :identificativo)
  end
end
