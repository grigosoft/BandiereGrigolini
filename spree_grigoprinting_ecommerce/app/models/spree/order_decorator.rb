module Spree
  Order.class_eval do

    def stato_ordine
      stato = %w[Errore allert]
      stato = %w[Confermato warning] if completed?

      stato = ['File Caricato', 'warning'] if stato_files == 'da_approvare'
      stato = %w[Approvazione warning] if stato_files == 'approvato'
      stato = ['In lavorazione', 'warning'] if stato_files == 'approvato' && true # aggiungere 2 ore di wait
      stato = %w[Spedito success] if shipment_state == 'spedito'
      stato = %w[Consegnato success] if shipment_state == 'consegnato'
      stato = %w[Annullato allert] unless canceled?

      stato
    end

    def azione_richiesta
      azione = %w[nessuna success]
      azione = ['Carica file', 'warning'] if stato_ordine == 'Confermato'

      azione
    end

    # se tutti item confermati = confermato
    # se almeno uno da_confermare = da confermare (con priorita)
    # se almeno uno disapprovato = disapprovato
    def stato_files
      approvazione = 'approvato'
      line_items.each do |item|
        if item.personalizzabile
          if item.stato_files == 'da_approvare'
            return item.stato_files
          elsif item.stato_files == 'disapprovato'
            approvazione = item.stato_files
          end
        end
      end
      approvazione
    end
  end
end
