module Spree
  class CalcolatorePrezzo

    def self.calcola_bandiera(params = {})
      # calcolo del prezzo
      costo_stampa = 7.0/100; #ml
      dati = calcolo_formato_resa_consumo(params)

      return costo_stampa * (dati[:consumo].to_d) / (params[:quantity].to_d)
      #return Spree::Money.new(params[:base].to_i || 0, currency: @currency)
    end

    def self.calcolo_formato_resa_consumo(params = {})
      base = params[:base].to_d
      altezza = params[:altezza].to_d
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
      return {resa: resa, formato: formato, consumo: consumo}
    end

  end
end
