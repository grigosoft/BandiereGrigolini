module Spree
  class Upload < ActiveRecord::Base
    belongs_to :line_item, class_name: 'Spree::LineItem'

  	has_attached_file :image,
                      :styles => { :medium => "300x300>",:thumb => "120x120>" },
                      url: '/spree/uploads/ord_:order_id/li_:line_item_id/:id/:style/:basename.:extension',
                      path: ':rails_root/public:url',
                      convert_options: { all: '-strip -colorspace sRGB' }

  	validates_attachment  :image,
    				              :presence => true,
                    			:content_type => { :content_type => /\Aimage\/.*\Z/ },
                    			:size => { :less_than => 50.megabyte }


    Paperclip.interpolates :line_item_id do |attachment, styles|
      attachment.instance.line_item_id
    end
    Paperclip.interpolates :order_id do |attachment, styles|
      attachment.instance.order_id
    end
  end
end
