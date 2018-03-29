module Spree
  Address.class_eval do
    belongs_to :user, class_name: 'Spree::User'
    # aggiunstamento per presenza di dati aziendali (ragione sociale sostituisce nome e cognome, ma solo se bill)
    with_options presence: true do
          validates :firstname, if: :serve_nome?
          validates :lastname, if: :serve_cognome?
          validates :address1, :city, :country
          validates :zipcode, if: :require_zipcode?
          validates :phone, if: :require_phone?
    end

    # serve solo se è
    def serve_nome?
      !bill || user.piva.nil?
    end

    def serve_cognome?
      user.piva.nil?
    end
    
    def type
      return 'billing' if bill
      return 'shipping' unless bill
    end
  end
end
