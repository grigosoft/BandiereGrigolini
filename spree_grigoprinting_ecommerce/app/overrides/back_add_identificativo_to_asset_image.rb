Deface::Override.new(virtual_path: "spree/admin/images/_form",
                     insert_after: "[data-hook='variant']",
                     text:
"<div data-hook=\"variant\" class=\"form-group\">
      <%= f.label :identificativo, \"Identificativo\" %>
      <%= f.text_field :identificativo, class: 'form-control' %>
</div>",
                     name: "cart_bandiere")
