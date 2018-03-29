# This migration comes from spree_grigoprinting_ecommerce (originally 20180326095020)
class AddDatiAziendaToSpreeUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :spree_users, :bill_adress_id
    remove_column :spree_users, :ship_adress_id

    add_column :spree_users, :ragione_sociale, :string
    add_column :spree_users, :piva, :string
    add_column :spree_users, :cf, :string
  end
end
