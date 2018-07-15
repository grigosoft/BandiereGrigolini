class AddDatiAziendaToSpreeUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :spree_users, :bill_adress_id
    #remove_column :spree_users, :ship_adress_id # lo uso per salvarmi un indirizzo di default
  end
end
