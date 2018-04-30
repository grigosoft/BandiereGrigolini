module Spree
  UsersController.class_eval do
    before_action :ceck_old_password, only: :update
    prepend_before_action :load_user, only: [:profilo_utente, :profilo_indirizzi, :profilo_ordini_completi]

    def profilo_utente
    end

    def profilo_indirizzi
    end

    def profilo_ordini_completi
      @orders = @user.orders
    end

    private
    def user_params
      params.require(:user).permit(Spree::PermittedAttributes.user_attributes,
                                  :piva, :cf, :ragione_sociale)
    end
    def load_user
      redirect_to login_path if spree_current_user.nil?
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
