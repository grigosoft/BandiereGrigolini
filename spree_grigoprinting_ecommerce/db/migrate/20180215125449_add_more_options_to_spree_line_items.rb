class AddMoreOptionsToSpreeLineItems < SpreeExtension::Migration[5.1]
  def change
    add_column :spree_line_items, :more_options, :string
  end
end
