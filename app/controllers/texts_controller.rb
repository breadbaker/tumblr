class TextsController < ApplicationController

  def create
    begin
      transaction do
        @post = Post.create(params[:post])
        @post.type = 'text'
        @post.content = Text.create(params[:text])
      end
      head :ok
    rescue StandardError => e
      logger.info e.message
      head :bad_request
    end
  end
end
