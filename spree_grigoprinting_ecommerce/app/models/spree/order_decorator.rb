module Spree
  Order.class_eval do

    def stato
      return 0 if canceled?

      min = 1000000
      line_items.each do |item|
        min = item.stato if item.stato < min
      end
      min
    end

    def stato_diplay
      case stato
      when 1
        %w[Confermato warning]
      when 2
        ['File Caricato', 'warning']
      when 3
        %w[Approvazione warning]
      when 4
        ['In lavorazione', 'warning']
      when 5
        %w[Spedito success]
      when 6
        %w[Consegnato success]
      when 0
        %w[Annullato allert]
      else
        %w[Errore allert]
      end
    end

    def azione_richiesta
      case stato
      when 1
        ['Carica file', 'warning']
      when 5
        ['Traccia pacco', 'success']
      else
        %w[nessuna success]
      end
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
