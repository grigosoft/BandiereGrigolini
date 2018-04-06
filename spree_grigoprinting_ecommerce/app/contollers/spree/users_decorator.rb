module Spree
  UsersController.class_eval do
    before_action :ceck_old_password, only: :update

    def modifica_password
      load_user
    end

    def modifica_email
      load_user
    end

    def modifica_dati_azienda
      load_user
    end

    private
    def user_params
      params.require(:user).permit(Spree::PermittedAttributes.user_attributes,
                                  :piva, :cf, :ragione_sociale)
    end

    def load_user
      @user ||= spree_current_user
    end

    def ceck_old_password
      if params[:user][:password_old]
        password = params[:user][:password_old]
        # puts 'ceck passsssss'
        load_user
        # puts @user.email
        # puts @user.valid_password?(password)
        if password.nil? || !@user.valid_password?(password)
          if params[:user][:password_confirmation]
            flash[:error] = 'pass errata'
            redirect_to '/user/modifica_password' and return
          else
            flash[:error] = 'pass errata'
            redirect_to '/user/modifica_email' and return
          end
        end
      end
    end
  end
end
