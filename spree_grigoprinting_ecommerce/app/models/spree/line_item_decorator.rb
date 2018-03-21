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
      desc
    end

    def add_storico_files(azione="", info="")
      new_row = {}
      new_row[:azione] = azione
      new_row[:info] = info
      new_row[:timestamp] = Time.now
      storico = stato_files_decoded
      if storico != nil
        storico.push(new_row)
      else
        storico = [new_row]
      end
      self.stato_files = storico.to_json
      save!
    end

    def stato_files_decoded
      unless stato_files.nil?
        return JSON.parse(stato_files, symbolize_names: true)
      end
      nil
    end

    def file_approvati?
      storico = stato_files_decoded
      if !storico.nil? && storico.last[:azione] == "approvato"
        return true
      end
      false
    end

  end
end
