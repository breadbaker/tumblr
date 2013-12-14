class PhotosController < ApplicationController

  def create
    @photo = Photo.create(params[:photo])
    render json: @photo
  end

end
