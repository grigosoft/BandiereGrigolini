class AddMoreOptionsToSpreeLineItems < SpreeExtension::Migration[4.2]
  def change
    add_column :spree_line_items, :more_options, :string
  end
end
