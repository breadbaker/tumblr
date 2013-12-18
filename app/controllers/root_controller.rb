class RootController < ApplicationController
  skip_before_filter :current_user
  def index
  end

  def background
    render json: Photo.all
  end
end
