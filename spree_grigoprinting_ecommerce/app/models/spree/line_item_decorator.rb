module Spree
  LineItem.class_eval do

    def update_price
      # lo cambio se personalizzato
      if more_options
        more_opt_h = JSON.parse(more_options, {:symbolize_names => true})
        more_opt_h[:quantity] = quantity
        if more_opt_h #&& more_opt_h[:personalizzazione] && more_opt_h[:personalizzazione] == "bandiera_personalizzata"
          variant.price = Spree::PriceCalculator.calculate_flag(more_opt_h).to_d
        end
      end

      self.price = variant.price_including_vat_for(tax_zone: tax_zone)
    end
  end
end
