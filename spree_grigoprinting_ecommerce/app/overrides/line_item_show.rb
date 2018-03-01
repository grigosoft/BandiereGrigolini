#Deface::Override.new(virtual_path: "spree/orders/_line_item",
#                     replace_contents: "[data-hook='line_item_description']",
#                     text:
#                     "<% more_options = line_item.more_options %>
#                     <% if more_options  %>
#                      <%= more_options %>
#                     <% else %>
#                      <%= line_item_description_text(line_item.description) %>
#                     <% end %>",
#                     name: "line_item_personalizzato")
#&& more_options[:personalizzazone] == \"bandiera_personalizzata\"
