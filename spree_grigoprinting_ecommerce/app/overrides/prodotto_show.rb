Deface::Override.new(virtual_path: "spree/products/show",
                     replace_contents: "div#cart-form",
                     text:
"<% if spree.product_path(@product, taxon_id: @taxon.try(:id)).include? \"bandiera-personalizzata\"%>
  <%= render partial: 'cart_form_bandiere' %>
<% else %>
  <%= render partial: 'cart_form' %>
<% end %>",
                     name: "cart_bandiere")
