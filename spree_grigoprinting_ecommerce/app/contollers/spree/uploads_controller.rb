module Spree
  class UploadsController < ApplicationController

    def create
      puts upload_params
    	upload = Upload.create(upload_params)
      #upload.line_item_id = params[:line_item_id]
    	if upload.save
        cancella_approvazione(upload.line_item_id)
    	  render json: { message: "success", fileID: upload.id }, :status => 200
    	else
    	  #  you need to send an error header, otherwise Dropzone
            #  will not interpret the response as an error:
    	  render json: { error: upload.errors.full_messages.join(',')}, :status => 400
    	end
    end

    def destroy
        upload = Upload.find(params[:id])
        if upload.destroy
          cancella_approvazione(upload.line_item_id)
          render json: { message: "File deleted from server" }
        else
          render json: { message: upload.errors.full_messages.join(',') }
        end
    end

    private
    def upload_params
    	params.require(:upload).permit(:image, :line_item_id, :order_id)
    end

    def cancella_approvazione (line_item_id = 0)
      item = Spree::LineItem.find(line_item_id)
      item.approvatore_upload_id = nil
      item.approvato_upload = nil
      item.save!
    end
  end
end
