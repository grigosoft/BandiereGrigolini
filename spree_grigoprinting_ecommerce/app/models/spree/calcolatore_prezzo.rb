module Spree
  class CalcolatorePrezzo

    def self.calcola_bandiera(params)
      return nil unless verifica_params_bandiera_personalizzata(params)
      # calcolo del prezzo
      dati = calcolo_formato_resa_consumo(params)
      if dati[:formato] == "grande"
        costo_stampa = 14.0/100; #ml
      else
        costo_stampa = 7.0/100; #ml
      end

      puts params[:more_options]
      prezzo = costo_stampa * (dati[:consumo].to_d) / (params[:quantity].to_d)
      #return Spree::Money.new(params[:base].to_i || 0, currency: @currency)
      { prezzo: prezzo, dati: dati, giorni: calcola_giorni_produzione(dati) }
    end

    def self.calcolo_formato_resa_consumo(params)
      base = params[:more_options][:base].to_i
      altezza = params[:more_options][:altezza].to_i
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
      consumo = params[:quantity].to_i * altezza / resa
      { resa: resa, formato: formato, consumo: consumo }
    end


    private

    def self.calcola_giorni_produzione (dati)
      1 + (dati[:consumo] / 50).to_i
    end

    def self.verifica_params_bandiera_personalizzata (params)
      if params[:quantity].nil? ||
         params[:more_options].nil? ||
         params[:more_options][:tessuto].nil? ||
         params[:more_options][:orientamento].nil? ||
         params[:more_options][:base].nil? ||
         params[:more_options][:altezza].nil? ||
         params[:more_options][:lato_asta].nil? ||
         params[:more_options][:finitura].nil? ||
         params[:more_options][:finitura][:tipo].nil? ||
         params[:more_options][:finitura][:sopra].nil? ||
         params[:more_options][:finitura][:sopra][:finitura].nil? ||
         params[:more_options][:finitura][:sotto].nil? ||
         params[:more_options][:finitura][:sotto][:finitura].nil? ||
         params[:more_options][:finitura][:sinistra].nil? ||
         params[:more_options][:finitura][:sinistra][:finitura].nil? ||
         params[:more_options][:finitura][:destra].nil? ||
         params[:more_options][:finitura][:destra][:finitura].nil?

        return false
      end
      true
    end
  end
end
