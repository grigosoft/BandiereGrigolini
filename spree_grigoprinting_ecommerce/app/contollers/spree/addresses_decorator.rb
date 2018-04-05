module Spree
  AddressesController.class_eval do

  before_action :aggiusta_is_bill, only: [:update, :create]
  after_action :aggiorna_utente, only: [:update, :create]

  def new
    session['spree_user_return_to'] = request.env['HTTP_REFERER']
    @address = Spree::Address.default
    @address.is_bill = params[:type] == 'fatt'
  end

  def create
      @address = spree_current_user.addresses.build(address_params)
      if @address.save
        flash[:notice] = I18n.t(:successfully_created, scope: :address_book)
        redirect_back_or_default(account_path)
      else
        render :action => 'new'
      end
  end

  private

  def address_params
    params[:address].permit(:address,
                            :firstname,
                            :lastname,
                            :address1,
                            :address2,
                            :city,
                            :state_id,
                            :zipcode,
                            :country_id,
                            :phone,
                            :is_bill)
  end

  # def set_fatt
  #   @type = params[:type] == 'fatt'
  # end

  private

  def aggiusta_is_bill
    params[:address][:is_bill] = params[:address][:is_bill] == 'true' || params[:address][:is_bill] == 't'
  end

  def aggiorna_utente
    user = @address.user
    if !@address.is_bill && params[:default]
      user.update_attributes(ship_address_id: @address.id)
    end
  end

  end
end
