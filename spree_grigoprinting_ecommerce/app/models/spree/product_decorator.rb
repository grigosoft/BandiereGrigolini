module Spree
  Product.class_eval do
    delegate :identifica_img, to: :find_or_build_master

    def personalizzabile?
      personalizzabile == 't' || personalizzabile == 1
    end
  end
end
