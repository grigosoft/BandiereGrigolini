#overrides/base_helper_decorator.rb
Spree::BaseHelper.module_eval do

  def link_to_cart(text = nil)
    text = text ? h(text) : Spree.t('cart')
      css_class = nil

      if simple_current_order.nil? || simple_current_order.real_item_count.zero?
        text = "<span class='grigo-icons grigo-cart'></span> <span  class='nav_bar_text'>#{text}</span>"
        css_class = 'empty'
      else
        text = "<span class='grigo-icons grigo-cart cart_containter'><span class='badge_cart badges'> #{simple_current_order.real_item_count}</span></span> <span class='nav_bar_text'>#{text}</span>"
        css_class = 'full'
      end

      link_to text.html_safe, spree.cart_path, class: "cart-info #{css_class}"
  end

end
