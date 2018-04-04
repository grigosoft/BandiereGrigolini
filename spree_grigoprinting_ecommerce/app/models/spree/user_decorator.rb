
Spree.user_class.class_eval do
  has_many :ship_addresses,-> { where(is_bill:false) }, class_name: 'Spree::Address'#, dependent: :destroy
  belongs_to :bill_addresses,-> { where(is_bill:true).first }, class_name: 'Spree::Address'#, dependent: :destroy
end
