module ApplicationHelper

  def back_img
    back = Background.first(offset: rand(Background.count))
    puts "backgroundid #{back.id}"
    "http://i.imgur.com/#{back.url}.jpg"
  end

end
