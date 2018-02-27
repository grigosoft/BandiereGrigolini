module Spree
  class PriceController < Spree::StoreController

    def calcola_bandiera
      @price = Spree::CalcolatorePrezzo.calcola_bandiera(params).to_d
      #@price = Spree::Money.new(params[:base].to_i || 0, currency: @currency)

      respond_to do |format|
        format.js{}  #this will make rails look for a file named calculate_flag.js.erb in your views
      end
    end

  end
end
