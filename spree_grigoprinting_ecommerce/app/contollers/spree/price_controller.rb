module Spree
  class PriceController < Spree::StoreController
    def calculate_flag
      # calcolo del prezzo
      @price = params[:base]

      respond_to do |format|
        format.js{}  #this will make rails look for a file named calculate_flag.js.erb in your views
      end
    end
  end
end
