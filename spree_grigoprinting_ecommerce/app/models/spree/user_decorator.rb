Spree.user_class.class_eval do
  has_many :ship_addresses, -> { where(is_bill: false, deleted_at: nil) },
            class_name: 'Spree::Address'#, dependent: :destroy
  belongs_to :bill_address, -> { where(is_bill: true, deleted_at: nil).first },
              class_name: 'Spree::Address'#, dependent: :destroy
end
