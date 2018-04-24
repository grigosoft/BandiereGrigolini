module Spree
  class CalcolatoreConsegna
    require 'business_time'

    def self.default
      calcola_bandiera(nil)
    end

    def self.calcola_bandiera(prezzo)
      if prezzo.nil?
        prezzo = {prezzo: 0, giorni: 1}
      end
      mattina = Time.current.hour<10 #if ora <= 10 # ricezione ordine in mattinata
      consegna1 = crea_dato_giorno(prezzo[:prezzo]*2, prezzo[:giorni], mattina && prezzo[:prezzo]>0)
      prezzo[:giorni] = prezzo[:giorni].to_i+1 if Time.current.hour<14 #if ora <= 14 # ricezione ordine in giornata
      consegna2 = crea_dato_giorno(prezzo[:prezzo]*1.5, prezzo[:giorni]+1, prezzo[:prezzo]>0)
      consegna3 = crea_dato_giorno(prezzo[:prezzo]*1.2, prezzo[:giorni]+5, prezzo[:prezzo]>0)
      consegna4 = crea_dato_giorno(prezzo[:prezzo], prezzo[:giorni]+14, prezzo[:prezzo]>0)


      [consegna1, consegna2, consegna3, consegna4]
    end

    private

    def self.crea_dato_giorno(prezzo, giorni_prod, attivo = false)
      data_consegna = giorni_prod.business_day.from_now
      consegna = {}
      consegna[:prezzo] = Spree::Money.new(prezzo || 0, currency: @currency)
      consegna[:giorno] = data_consegna.strftime("%A")
      consegna[:numero] = data_consegna.day
      consegna[:mese] = data_consegna.strftime("%B")
      consegna[:attivo] = attivo ? 'true' : 'false'

      consegna
    end
  end
end
