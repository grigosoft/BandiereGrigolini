module Spree
  Variant.class_eval do

    delegate :personalizzabile, to: :product

    def identifica_img(str = '')
      images.each do |i|
        return i if i.identificativo == str
      end
      nil
    end
  end
end
