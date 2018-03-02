module Spree
  class CalcolatoreConsegna
    require 'business_time'

    def self.calcola_bandiera(params = {})
      dati = Spree::CalcolatorePrezzo.calcolo_formato_resa_consumo(params)
      ora = Time.current.hour #if ora <= 14 # ricezione ordine in giornata
      giorni = 1 + (dati[:consumo] / 50).to_i
      consegna_1 = giorni.business_day.from_now
      consegna_2 = 1.business_day.after(urgentissima)
      consegna_3 = 5.business_day.after(urgente)
      consegna_4 = 10.business_day.after(urgente)


      return {:consegna_1=>consegna_1, :consegna_2=>consegna_2, :consegna_3=>consegna_3, :consegna_4=>consegna_4}
    end
  end
end
