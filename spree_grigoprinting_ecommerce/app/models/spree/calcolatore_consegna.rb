module Spree
  class CalcolatoreConsegna
    require 'business_time'

    def self.calcola_bandiera(params = {})
      dati = Spree::CalcolatorePrezzo.calcolo_formato_resa_consumo(params)
      ora = Time.current.hour #if ora <= 14 # ricezione ordine in giornata
      giorni = 1 + (dati[:consumo] / 50).to_i
      consegna1 = giorni.business_day.from_now
      consegna2 = 1.business_day.after(consegna1)
      consegna3 = 5.business_day.after(consegna2)
      consegna4 = 10.business_day.after(consegna3)


      return {:consegna_1=>consegna1, :consegna_2=>consegna2, :consegna_3=>consegna3, :consegna_4=>consegna4}
    end
  end
end
