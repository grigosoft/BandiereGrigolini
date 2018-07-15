class MigrateAziendaToSpreeAddresses < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_addresses, :ragione_sociale, :string, defult: nil
    add_column :spree_addresses, :piva, :string, defautl: nil
    add_column :spree_addresses, :cf, :string, default: nil

    add_column :spree_users, :is_azienda, :bool, defult: false
  end
end
