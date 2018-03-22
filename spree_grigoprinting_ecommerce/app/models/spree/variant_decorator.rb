module Spree
  Variant.class_eval do

    delegate :personalizzabile, to: :product

    def identifica_img(str = "")
      images.each do |i|
        if(i.identificativo == str)
          return i
        end
      end
      return nil
    end
  end
end
