Deface::Override.new(virtual_path: 'spree/admin/products/_form',
                     insert_after: "[data-hook='admin_product_form_description']",
                     text:
"<div data-hook='admin_product_form_personalizzabile'>
        <%= f.field_container :personalizzabile, class: ['form-group'] do %>
          <%= f.label :personalizzabile, 'Prodotto personalizzabile: File e/o Misure' %>
          <%= f.error_message_on :personalizzabile %>
          <%= f.check_box :personalizzabile, class: 'form-control' %>
        <% end %>
</div>
<div data-hook='admin_product_form_partial'>
        <%= f.field_container :partial, class: ['form-group'] do %>
          <%= f.label :partial, 'Partial' %>
          <%= f.text_field :partial, class: 'form-control title' %>
          <%= f.error_message_on :partial %>
        <% end %>
</div>",
                     name: 'back_add_personalizzabile_to_product')
