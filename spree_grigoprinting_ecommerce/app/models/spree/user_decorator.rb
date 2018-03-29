
Spree.user_class.class_eval do
  has_many :ship_addresses,-> { where(bill:false) }, class_name: 'Spree::Address', dependent: :destroy
  belongs_to :bill_addresses,-> { where(bill:true).first }, class_name: 'Spree::Address', dependent: :destroy
end
