module Spree
  class CalcolatorePrezzo

    def self.calcola_bandiera(parametri)
      return nil unless verifica_parametri_bandiera_personalizzata(parametri)
      # calcolo del prezzo
      dati = calcolo_formato_resa_consumo(parametri)
      if dati[:formato] == "grande"
        costo_stampa = 14.0/100; #ml
      else
        costo_stampa = 7.0/100; #ml
      end

      prezzo = costo_stampa * (dati[:consumo].to_d) / (parametri[:quantity].to_d)
      #return Spree::Money.new(parametri[:base].to_i || 0, currency: @currency)
      { prezzo: prezzo, dati: dati, giorni: calcola_giorni_produzione(dati) }
    end

    def self.calcolo_formato_resa_consumo(parametri)
      base = parametri[:more_options][:base].to_i
      altezza = parametri[:more_options][:altezza].to_i
      formato = nil
      if base <= 150
        formato = "normale"
      else
        if base <= 300
          formato = "grande"
        end
      end
      max = 150
      if formato == "grande"
        max = 300
      end
      resa = (max / base).to_i
      consumo = parametri[:quantity].to_i * altezza / resa
      { resa: resa, formato: formato, consumo: consumo }
    end


    # private

    def self.calcola_giorni_produzione(dati)
      1 + (dati[:consumo] / 5000).to_i
    end

    def self.verifica_parametri_bandiera_personalizzata(parametri)
      if parametri[:quantity].nil? ||
         parametri[:quantity].to_i <= 0 ||
         parametri[:more_options].nil? ||
         parametri[:more_options][:tessuto].nil? ||
         parametri[:more_options][:orientamento].nil? ||
         parametri[:more_options][:base].nil? ||
         parametri[:more_options][:base].to_d <= 0 ||
         parametri[:more_options][:altezza].nil? ||
         parametri[:more_options][:altezza].to_d <= 0 ||
         parametri[:more_options][:lato_asta].nil? ||
         parametri[:more_options][:finitura].nil? ||
         parametri[:more_options][:finitura][:tipo].nil? ||
         parametri[:more_options][:finitura][:sopra].nil? ||
         parametri[:more_options][:finitura][:sopra][:finitura].nil? ||
         parametri[:more_options][:finitura][:sotto].nil? ||
         parametri[:more_options][:finitura][:sotto][:finitura].nil? ||
         parametri[:more_options][:finitura][:sinistra].nil? ||
         parametri[:more_options][:finitura][:sinistra][:finitura].nil? ||
         parametri[:more_options][:finitura][:destra].nil? ||
         parametri[:more_options][:finitura][:destra][:finitura].nil?

        return false
      end
      true
    end
  end
end
