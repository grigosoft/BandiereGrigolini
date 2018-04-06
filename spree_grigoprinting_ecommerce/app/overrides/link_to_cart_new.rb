#overrides/base_helper_decorator.rb
Spree::BaseHelper.module_eval do

  def link_to_cart(text = nil)
    text = text ? h(text) : Spree.t('cart')
      css_class = nil

      if simple_current_order.nil? || simple_current_order.item_count.zero?
        text = "<span class='glyphicon glyphicon-shopping-cart'></span> <span>#{text}</span>"
        css_class = 'empty'
      else
        text = "<span class='glyphicon glyphicon-shopping-cart'></span> <div class='cart_containter'>#{text}<span class='badge_cart'> #{simple_current_order.item_count}</span></div>"
        css_class = 'full'
      end

      link_to text.html_safe, spree.cart_path, class: "cart-info #{css_class}"
  end

end
