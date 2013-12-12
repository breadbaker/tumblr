class TextsController < ApplicationController

  def create
    begin
      current_user.posts.new(params[:text], :text)
      head :ok
    rescue StandardError => e
      logger.info e.message
      head :bad_request
    end
  end
end
