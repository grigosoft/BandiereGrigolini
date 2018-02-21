module Spree
  LineItem.class_eval do
    # inutile. solo per prova
    def get_more_options
      return self.get_more_options
    end
  end
end
