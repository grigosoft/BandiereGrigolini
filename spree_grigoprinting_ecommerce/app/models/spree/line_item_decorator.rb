module Spree
  LineItem.class_eval do
    has_many :upload, class_name: 'Spree::Upload'

    delegate :personalizzabile, to: :variant

    def update_price
      # lo cambio dentro VARIANT se personalizzato
      if more_options
        more_opt_h = JSON.parse(more_options, {:symbolize_names => true})
        # aggiungo nei parametri la quantita per il ricalcolo del prezzo
        more_opt_h[:quantity] = quantity
        if more_opt_h && more_opt_h[:prodotto_personalizzato] && more_opt_h[:prodotto_personalizzato] == "bandiera_personalizzata"
          variant.price = Spree::CalcolatorePrezzo.calcola_bandiera(more_opt_h).to_d
        end
      end

      self.price = variant.price_including_vat_for(tax_zone: tax_zone)
    end

    def description
      desc = variant.description
      if more_options
        more_opt_h = JSON.parse(more_options, {:symbolize_names => true})
        if more_opt_h && more_opt_h[:prodotto_personalizzato] && more_opt_h[:prodotto_personalizzato] == "bandiera_personalizzata"
          desc = "in nautico 110g cm "+more_opt_h[:base]+"x"+more_opt_h[:altezza]+
          "\nFiniture: varie"
        end
      end
      return desc
    end

  end
end
