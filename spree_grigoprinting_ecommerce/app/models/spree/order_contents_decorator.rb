module Spree
  OrderContents.class_eval do

    def add_to_line_item(variant, quantity, options = {})

      if options[:product_customizzations]
        #forzo la creazone di un nuovo line item perche si tratta di prodotto personalizzato
        line_item = nil
        #Spree::PermittedAttributes.line_item_attributes << :product_customizzations
      else
        line_item = grab_line_item_by_variant(variant, false, options)
      end

      if line_item
        line_item.quantity += quantity.to_i
        line_item.currency = currency unless currency.nil?
      else
        options_params = options.is_a?(ActionController::Parameters) ? options : ActionController::Parameters.new(options.to_h)
        opts = options_params.
               permit(PermittedAttributes.line_item_attributes).to_h.
               merge(currency: order.currency)


        line_item = order.line_items.new(quantity: quantity,
                                         variant: variant,
                                         options: opts)

        if options[:product_customizzations]
          # salvo le customizzazioni
          line_item.more_options = options[:product_customizzations].to_json
        end
      end
      line_item.target_shipment = options[:shipment] if options.key? :shipment
      line_item.save!
      line_item
    end

  end
end
