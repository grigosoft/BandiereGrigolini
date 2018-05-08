module Spree
  OrderContents.class_eval do

    def add_to_line_item(variant, quantity, options = {})

      if options[:more_options]
        #forzo la creazone di un nuovo line item perche si tratta di prodotto personalizzato
        line_item = nil
      else
        line_item = grab_line_item_by_variant(variant, false, options)
      end

      if line_item
        line_item.quantity += quantity.to_i
        line_item.currency = currency unless currency.nil?
      else
        options_params = options.is_a?(ActionController::Parameters) ? options : ActionController::Parameters.new(options.to_h)
        opts = options_params
               .permit(PermittedAttributes.line_item_attributes).to_h
               .merge(currency: order.currency)

        line_item = order.line_items.new(quantity: quantity,
                                         variant: variant,
                                         options: opts)

        # salvo le customizzazioni
        line_item.more_options = options[:more_options].to_json if options[:more_options]
      end
      line_item.target_shipment = options[:shipment] if options.key? :shipment
      line_item.save!

      # se presenti prodotti servizi_extra li aggiungo come line item figli
      if options[:more_options] && options[:more_options][:extra]
        options[:more_options][:extra].each do |k, _v|
          var = Spree::Variant.find(options[:more_options][:extra][k.to_sym])
          figlio = add_to_line_item(var, 1, more_options: {}) if var
          figlio.padre_id = line_item.id
          figlio.save!
        end
      end

      line_item
    end

  end
end
