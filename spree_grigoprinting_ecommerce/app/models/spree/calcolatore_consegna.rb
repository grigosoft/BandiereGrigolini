module Spree
  class CalcolatoreConsegna
    require 'business_time'

    def self.calcola_bandiera(params = {})
      dati = Spree::CalcolatorePrezzo.calcolo_formato_resa_consumo(params)
      ora = Time.current.hour #if ora <= 14 # ricezione ordine in giornata
      tempo = 1 # gestione iniziale
      tempo += 2 # ingresso coda di stampa
      tempo += (dati[:consumo] / 50).to_i
      puts tempo.business_hour.from_now.to_date



      return {:urgentissima=>"", :urgente=>"", :tranquilla=>""}
    end
  end
end
