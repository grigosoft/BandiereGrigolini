# This migration comes from spree_grigoprinting_ecommerce (originally 20180302105817)
class AddIdentificativoToSpreeAssets < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_assets, :identificativo, :string
  end
end
