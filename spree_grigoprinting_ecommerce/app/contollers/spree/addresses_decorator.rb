module Spree
  AddressesController.class_eval do

  before_action :aggiusta_is_bill, only: [:update, :create]

  def new
    @address = Spree::Address.default
    @address.is_bill = params[:type] == 'fatt'
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

  def aggiusta_is_bill
    params[:address][:is_bill] = params[:address][:is_bill] == 'true'
  end

  end
end
