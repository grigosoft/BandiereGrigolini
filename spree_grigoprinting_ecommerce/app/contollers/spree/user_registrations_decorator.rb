module Spree
  UserRegistrationsController.class_eval do

    def spree_user_params
      params.require(:spree_user).permit(Spree::PermittedAttributes.user_attributes,
                                         :ragione_sociale,
                                         :piva,
                                         :cf)
    end
  end
end
