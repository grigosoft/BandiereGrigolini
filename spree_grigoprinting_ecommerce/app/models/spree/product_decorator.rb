module Spree
  Product.class_eval do
    delegate :identifica_img, to: :find_or_build_master
  end
end
