module Spree
  CheckoutController.class_eval do
    before_action :carica_su_params_gli_indirizzi, only: [:update]

    def carica_su_params_gli_indirizzi

    end

 end #CheckoutController
end
