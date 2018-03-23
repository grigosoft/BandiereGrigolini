module Spree
  Order.class_eval do

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
