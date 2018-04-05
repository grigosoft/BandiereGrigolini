Spree::User.class_eval do
  has_many :ship_addresses, -> { where(is_bill: false, deleted_at: nil).order('updated_at DESC') },
            class_name: Spree::Address #, dependent: :destroy
  has_one :fatturazione, -> { where(is_bill: true, deleted_at: nil) },
              class_name: 'Spree::Address'#, dependent: :destroy
  belongs_to :ship_defaults, class_name: 'Spree::Address', foreign_key: 'ship_address_id' #, dependent: :destroy

end
