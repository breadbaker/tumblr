class PhotosController < ApplicationController
  skip_before_filter :current_user

  def create
    @photo = Photo.create(params[:photo])
    #photo = { url: @photo.image.url(:big)}
    photo = { url: @photo.image.url(:big) }
    render json: photo
  end

  def show
    @photo = Photo.find(params[:id])

    render json: photo
    #render json: { @photo.image }
  end

end
