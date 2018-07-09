module Spree
  Address.class_eval do
    # belongs_to :user, class_name: 'Spree::User'
    # aggiunstamento per presenza di dati aziendali (ragione sociale sostituisce nome e cognome, ma solo se bill)
    with_options presence: true do
          # validates :firstname, if: :serve_nome?
          # validates :lastname, if: :serve_nome?
          # validates :ragione_sociale, if: :serve_dati_azienda?
          # validates :piva, if: :serve_dati_azienda?
          validates :address1, :city, :country
          validates :zipcode, if: :require_zipcode?
          validates :phone, if: :require_phone?
    end
    alias_attribute :referente, :lastname

    # serve solo se è
    # def serve_nome?
    #   !user.azienda?
    # end
    #
    # def serve_dati_azienda?
    #   user.azienda? && bill?
    # end

    def bill?
      is_bill == 't' || is_bill == 0
    end

    def full_name
      return firstname + ' ' + lastname unless user.azienda?
      return ragione_sociale if user.azienda? && bill?
      firstname # azienda e indirizzo spedizione
    end

    def type
      return 'billing' if bill?
      return 'shipping' unless bill?
    end
  end
end
