module Spree
  class CalcolatoreConsegna
    require 'business_time'

    def self.calcola_bandiera(params = {})
      dati = Spree::CalcolatorePrezzo.calcolo_formato_resa_consumo(params)
      ora = Time.current.hour #if ora <= 14 # ricezione ordine in giornata
      giorni = 1 + (dati[:consumo] / 50).to_i
      urgentissima = giorni.business_day.from_now
      urgente = 1.business_day.after(urgentissima)
      tranquilla = 5.business_day.after(urgente)


      return {:urgentissima=>urgentissima, :urgente=>urgente, :tranquilla=>tranquilla}
    end
  end
end
