module Spree
  Order.class_eval do

    def upload_confermati
      line_items.each do |item|
        if item.personalizzabile && !item.approvato_upload.nil?
          return 'da_verificare'
        end
      end
      'verificato'
    end
  end
end
