module Spree
  OrdersController.class_eval do
    # override populate
    def populate


        order    = current_order(create_order_if_necessary: true)
        variant  = Spree::Variant.find(params[:variant_id])
        quantity = params[:quantity].to_i
        options  = params[:options] || {}
        #mie veriabili
        #params[:options][:altezza] = params[:altezza].to_i
        #params[:options][:base] = params[:base].to_i

        # smistamento prodotti particolari
        tipoProdotto = params[:prodotto_personalizzato]
        if tipoProdotto == "bandera_personalizzata"
          options[:product_customizzations] = estrai_specifiche_bandiera(params)

        end



        # 2,147,483,647 is crazy. See issue #2695.
        if quantity.between?(1, 2_147_483_647)
          begin
            order.contents.add(variant, quantity, options)
            order.update_line_item_prices!
            order.create_tax_charge!
            order.update_with_updater!
          rescue ActiveRecord::RecordInvalid => e
            error = e.record.errors.full_messages.join(', ')
          end
        else
          error = Spree.t(:please_enter_reasonable_quantity)
        end

        if error
          flash[:error] = error
          redirect_back_or_default(spree.root_path)
        else
          respond_with(order) do |format|
            format.html { redirect_to(cart_path(variant_id: variant.id)) }
          end
        end
    end

    def estrai_specifiche_bandiera (params = {})
      altezza = params[:altezza]
      base = params[:base]
      return {personalizzazone: "bandiera_personalizzata", altezza: altezza, base: base}
    end
  end
end